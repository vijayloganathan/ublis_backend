import { executeQuery, getClient } from "../../helper/db";
import {
  insertProfileAddressQuery,
  insertProfileGeneralHealth,
  insertProfilePersonalData,
  fetchProfileData,
  fetchPreferableTiming,
  fetchPresentHealthProblem,
} from "./query";
import { encrypt } from "../../helper/encrypt";
import { generateToken } from "../../helper/token";
import { PoolClient } from "pg"; // Assuming you're using pg library for PostgreSQL

export class ProfileRepository {
  // STORING ADDRESS IN DB
  public async userAddressV1(userData: any): Promise<any> {
    let refAdAdd1Type: number = 3;
    let refAdAdd2Type: number = 0;

    if (userData.address.addresstype == false) {
      refAdAdd1Type = 1;
      refAdAdd2Type = 2;
    }

    const params = [
      userData.refStId,
      refAdAdd1Type,
      userData.address.refAdAdd1,
      userData.address.refAdArea1,
      userData.address.refAdCity1,
      userData.address.refAdState1,
      userData.address.refAdPincode1,
      refAdAdd2Type,
      userData.address.refAdAdd2,
      userData.address.refAdArea2,
      userData.address.refAdCity2,
      userData.address.refAdState2,
      userData.address.refAdPincode2,
    ];

    const userResult = await executeQuery(insertProfileAddressQuery, params);
    const results = {
      success: true,
      message: "Address Stored Successfully",
    };
    return encrypt(results, true);
  }

  public async userPersonalDataV1(userData: any): Promise<any> {
    console.log("userData line-------50");
    const params = [
      userData.personalData.ref_su_gender,
      userData.personalData.ref_su_qulify,
      userData.personalData.ref_su_occu,
      userData.personalData.ref_su_guardian,
      userData.refStId,
    ];
    const userResult = await executeQuery(insertProfilePersonalData, params);

    const results = {
      message: "Personal Data Stored Successfully",
      updatedData: userResult,
    };
    return encrypt(results, true);
  }

  public async userGeneralHealthV1(userData: any): Promise<any> {
    const refPresentHealthJson = JSON.stringify(
      userData.generalhealth.refPresentHealth
    );

    const params = [
      userData.refStId,
      userData.generalhealth.refHeight,
      userData.generalhealth.refWeight,
      userData.generalhealth.refBlood,
      userData.generalhealth.refBMI,
      userData.generalhealth.refBP,
      userData.generalhealth.refRecentInjuries,
      userData.generalhealth.refRecentInjuriesReason,
      userData.generalhealth.refRecentFractures,
      userData.generalhealth.refRecentFracturesReason,
      userData.generalhealth.refOthers,
      userData.generalhealth.refElse,
      userData.generalhealth.refOtherActivities,
      refPresentHealthJson,
      userData.generalhealth.refMedicalDetails,
      userData.generalhealth.refUnderPhysicalCare,
      userData.generalhealth.refDoctor,
      userData.generalhealth.refHospital,
      userData.generalhealth.refBackPain,
      userData.generalhealth.refProblem,
      userData.generalhealth.refPastHistory,
      userData.generalhealth.refFamilyHistory,
      userData.generalhealth.refAnythingelse,
    ];

    const userResult = await executeQuery(insertProfileGeneralHealth, params);
    const results = {
      success: true,
      message: "Health Data Stored Successfully",
    };
    return encrypt(results, true);
  }

  public async userRegisterDataV1(
    userData: any,
    decodedToken: number
  ): Promise<any> {
    const client: PoolClient = await getClient(); // Get the database client
    try {
      // Start the transaction
      await client.query("BEGIN");

      userData.refStId = decodedToken;

      // Step 1: Update personal data in users table
      const paramsProfile = [
        userData.personalData.ref_su_gender,
        userData.personalData.ref_su_qulify,
        userData.personalData.ref_su_occu,
        userData.personalData.ref_su_guardian,
        userData.personalData.ref_su_timing,
        userData.refStId,
      ];
      const userResult1 = await client.query(
        insertProfilePersonalData,
        paramsProfile
      );
      if (!userResult1.rowCount) {
        throw new Error("Failed to update personal data in the users table.");
      }

      // Step 2: Insert address data into the refUserAddress table
      let refAdAdd1Type: number = 3;
      let refAdAdd2Type: number = 0;
      if (userData.address.addresstype === false) {
        refAdAdd1Type = 1;
        refAdAdd2Type = 2;
      }

      const paramsAddress = [
        userData.refStId,
        refAdAdd1Type,
        userData.address.refAdAdd1,
        userData.address.refAdArea1,
        userData.address.refAdCity1,
        userData.address.refAdState1,
        userData.address.refAdPincode1,
        refAdAdd2Type,
        userData.address.refAdAdd2,
        userData.address.refAdArea2,
        userData.address.refAdCity2,
        userData.address.refAdState2,
        userData.address.refAdPincode2,
      ];
      const userResult2 = await client.query(
        insertProfileAddressQuery,
        paramsAddress
      );
      if (!userResult2.rowCount) {
        throw new Error(
          "Failed to insert address data into the refUserAddress table."
        );
      }

      // Step 3: Insert health-related data into the refGeneralHealth table
      const refPresentHealthJson = JSON.stringify(
        userData.generalhealth.refPresentHealth
      );
      const paramsHealth = [
        userData.refStId,
        userData.generalhealth.refHeight,
        userData.generalhealth.refWeight,
        userData.generalhealth.refBlood,
        userData.generalhealth.refBMI,
        userData.generalhealth.refBP,
        userData.generalhealth.refRecentInjuries,
        userData.generalhealth.refRecentInjuriesReason,
        userData.generalhealth.refRecentFractures,
        userData.generalhealth.refRecentFracturesReason,
        userData.generalhealth.refOthers,
        userData.generalhealth.refElse,
        userData.generalhealth.refOtherActivities,
        refPresentHealthJson,
        userData.generalhealth.refMedicalDetails,
        userData.generalhealth.refUnderPhysicalCare,
        userData.generalhealth.refDoctor,
        userData.generalhealth.refHospital,
        userData.generalhealth.refBackPain,
        userData.generalhealth.refProblem,
        userData.generalhealth.refPastHistory,
        userData.generalhealth.refFamilyHistory,
        userData.generalhealth.refAnythingelse,
      ];
      const userResult3 = await client.query(
        insertProfileGeneralHealth,
        paramsHealth
      );
      if (!userResult3.rowCount) {
        throw new Error(
          "Failed to insert health data into the refGeneralHealth table."
        );
      }

      // Commit the transaction if all queries succeeded
      await client.query("COMMIT");

      const token = { id: userData.refStId };
      const results = {
        success: true,
        message: "All data stored successfully",
        token: generateToken(token, true),
      };
      return encrypt(results, true);
    } catch (error) {
      console.log("Error occurred:", error);

      // Rollback the transaction in case of any error
      await client.query("ROLLBACK");

      const results = {
        success: false,
        message: error || "Error occurred while processing.",
      };
      return encrypt(results, false);
    } finally {
      client.release(); // Release the client back to the pool
    }
  }

  public async userRegisterPageDataV1(userData: any): Promise<any> {
    try {
      const refStId = parseInt(userData.refStId, 10);
      if (isNaN(refStId)) {
        throw new Error("Invalid refStId. Must be a number.");
      }

      const params = [refStId];
      const profileResult = await executeQuery(fetchProfileData, params);

      if (!profileResult.length) {
        throw new Error("Profile data not found for refStId: " + refStId);
      }

      function formatDate(isoDate: any) {
        const date = new Date(isoDate); // Create a new Date object
        const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with zero if needed
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-based) and pad with zero
        const year = date.getFullYear(); // Get the full year

        return `${year}-${month}-${day}`; // Return formatted date
      }

      const profileData = {
        fname: profileResult[0].refStFName,
        lname: profileResult[0].refStLName,
        dob: formatDate(profileResult[0].refStDOB),
        username: profileResult[0].refUserName,
        email: profileResult[0].refCtEmail,
        phone: profileResult[0].refCtMobile,
        age: profileResult[0].refStAge,
      };

      const timingResult = await executeQuery(fetchPreferableTiming, []);
      const preferableTiming = timingResult.reduce((acc: any, row: any) => {
        acc[row.refTimeId] = row.refTime;
        return acc;
      }, {});

      const healthResult = await executeQuery(fetchPresentHealthProblem, []);
      const presentHealthProblem = healthResult.reduce((acc: any, row: any) => {
        acc[row.refHealthId] = row.refHealth;
        return acc;
      }, {});

      const registerData = {
        ProfileData: profileData,
        PreferableTiming: preferableTiming,
        presentHealthProblem: presentHealthProblem,
      };

      const tokenData = {
        id: refStId,
      };

      const token = generateToken(tokenData, true);

      return encrypt(
        {
          success: true,
          message: "userRegisterPageData",
          data: registerData,
          token: token,
        },
        true
      );
    } catch (error) {
      console.error("Error in userRegisterPageDataV1:", error);
      throw error;
    }
  }
}
