import { executeQuery } from "../../helper/db";
import {
  checkQuery,
  getCustomerCount,
  insertUserQuery,
  insertUserDomainQuery,
  selectUserByUsername,
  selectUserByEmailQuery,
  insertUserCommunicationQuery,
  updateHistoryQuery,
} from "./query";
import { encrypt } from "../../helper/encrypt";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../../helper/token";

const JWT_SECRET = process.env.ACCESS_TOKEN || "ERROR";

export class UserRepository {
  // SIGN IN FUNCTION
  public async userLoginV1(user_data: any, domain_code?: any): Promise<any> {
    console.log("user_data line-------23", user_data);

    const params = [user_data.username];
    const users = await executeQuery(selectUserByUsername, params); // Execute select query

    if (users.length > 0) {
      const user = users[0];

      // Verify the password
      const validPassword = await bcrypt.compare(
        user_data.password,
        user.refCustHashedPassword
      );
      if (validPassword) {
        const history = [
          2,
          new Date().toLocaleString(), // Using local date and time
          user.refStId,
          "User",
        ];

        const updateHistory = await executeQuery(updateHistoryQuery, history);

        if (updateHistory && updateHistory.length > 0) {
          const tokenData = {
            id: user.refStId,
            custId: user.refSCustId,
            status: user.refSUserStatus,
          };

          return encrypt(
            {
              success: true,
              message: "Login successful",
              token: generateToken(tokenData, true),
            },
            true
          );
        }
      }
    }

    // Return error if user not found or invalid password
    // return { success: false, message: "Invalid email or password" };
    return encrypt(
      {
        success: false,
        message: "Invalid email or password",
      },
      true
    );
  }

  // SIGN UP FUNCTION
  public async userSignUpV1(userData: any, domain_code?: any): Promise<any> {
    const hashedPassword = await bcrypt.hash(userData.temp_su_password, 10);
    const userId = uuidv4();

    const check = [userData.temp_su_username];

    const userCheck = await executeQuery(checkQuery, check);
    const userFind = userCheck[0];

    if (userFind) {
      return encrypt(
        {
          success: false,
          message: "Username Already Exist",
        },
        true
      );
      // return { success: false, message: "Username Already Exist" };
    } else {
      const userCountResult = await executeQuery(getCustomerCount);
      const userCount = parseInt(userCountResult[0].count, 10); // Extract and convert count to a number

      let newCustomerId;
      if (userCount >= 0) {
        newCustomerId = `UBY${(10000 + userCount + 1).toString()}`; // Generate the ID
      }

      const params = [
        userData.temp_su_fname, // refStFName
        userData.temp_su_lname, // refStLName
        userData.temp_su_dob, // refStDOB
        userData.temp_su_age, // refStAge
        newCustomerId,
      ];

      const userResult = await executeQuery(insertUserQuery, params);
      const newUser = userResult[0];

      const domainParams = [
        newUser.refStId, // refStId from users table
        newUser.refSCustId, // refCustId from users table
        userData.temp_su_username, // refcust Username
        userData.temp_su_password, // refCustPassword
        hashedPassword, // refCustHashedPassword
      ];

      const domainResult = await executeQuery(
        insertUserDomainQuery,
        domainParams
      );

      const communicationParams = [
        newUser.refStId, // refStId from users table
        userData.temp_su_phone,
        userData.temp_su_email,
      ];

      const communicationResult = await executeQuery(
        insertUserCommunicationQuery,
        communicationParams
      );

      if (
        userResult.length > 0 &&
        domainResult.length > 0 &&
        communicationResult.length > 0
      ) {
        const history = [
          1,
          new Date().toLocaleString(), // Using local date and time
          newUser.refStId,
          "user",
        ];

        const updateHistory = await executeQuery(updateHistoryQuery, history);

        // Check if the history update was successful
        if (updateHistory && updateHistory.length > 0) {
          const tokenData = {
            id: newUser.refStId, // refStId from users table
            email: userData.temp_su_email,
            custId: newUser.refSCustId,
            status: newUser.refSUserStatus,
          };
          return encrypt(
            {
              success: true,
              message: "User signup successful",
              user: newUser,
              token: generateToken(tokenData, true),
            },
            true
          );
        } else {
          return encrypt(
            {
              success: false,
              message: "Failed to update history",
            },
            true
          );
          // return { success: false, message: "Failed to update history" };
        }
      } else {
        return encrypt(
          {
            success: false,
            message: "Signup failed",
          },
          true
        );
        // return { success: false, message: "Signup failed" };
      }
    }
  }

  // Helper function to generate JWT token
  // private generateToken(user: any): string {
  //   const payload = {
  //     id: user.refStId, // refStId from users table
  //     email: user.refCustPrimEmail,
  //     custId: user.refSCustId,
  //     status: user.refSUserStatus,
  //   };
  //   return jwt.sign(payload, JWT_SECRET, { expiresIn: "20m" });
  // }
}
