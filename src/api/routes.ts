import * as Hapi from "@hapi/hapi";

import IRoute from "../helper/routes";
import validate from "./validate";
import {
  UserController,
  UserProfileController,
  FrontDesk,
  Director,
} from "./controller";
import { Logger } from "winston";
import { decodeToken, validateToken } from "../helper/token";

export class UserRouters implements IRoute {
  public async register(server: any): Promise<any> {
    return new Promise((resolve) => {
      const controller = new UserController();
      server.route([
        {
          method: "POST",
          path: "/api/v1/users/login",
          config: {
            handler: controller.userLogin,
            description: "Login Checking",
            tags: ["api", "Users"],
            auth: false,
          },
        },
        {
          method: "POST",
          path: "/api/v1/users/signup",
          config: {
            handler: controller.userSignUp,
            description: "Signup Checking",
            tags: ["api", "Users", "SignUp"],
            auth: false,
          },
        },
        {
          method: "POST",
          path: "/api/v1/users/validateUserName",
          config: {
            handler: controller.validateUserName,
            description: "Signup Checking",
            tags: ["api", "Users", "SignUp"],
            auth: false,
          },
        },
        {
          method: "GET",
          path: "/api/v1/validatetoken",
          config: {
            pre: [{ method: validateToken, assign: "token" }],
            handler: controller.validateUserV1,
            // validate: validate.userSignUp,
            description: "Signup Checking",
            tags: ["api", "Users", "SignUp"],
            auth: false,
          },
        },
      ]);
      resolve(true);
    });
  }
}

export class UserProfile implements IRoute {
  public async register(server: any): Promise<any> {
    return new Promise((resolve) => {
      const controller = new UserProfileController();
      server.route([
        {
          method: "POST",
          path: "/api/v1/profile/address",
          config: {
            handler: controller.userAddress,
            description: "Store Address Data",
            tags: ["api", "Users"],
            auth: false,
          },
        },
        {
          method: "POST",
          path: "/api/v1/profile/personalData",
          config: {
            handler: controller.personalData,
            description: "Store Personal Data",
            tags: ["api", "Users"],
            auth: false,
          },
        },
        {
          method: "POST",
          path: "/api/v1/profile/generalHealth",
          config: {
            handler: controller.userGeneralHealth,
            description: "Store General Health",
            tags: ["api", "Users"],
            auth: false,
          },
        },
        {
          method: "POST",
          path: "/api/v1/profile/RegisterData",
          config: {
            pre: [{ method: validateToken, assign: "token" }], // Use the validateToken function here
            handler: controller.userRegisterData,
            description: "Store Register Form Data",
            tags: ["api", "Users"],
            auth: false,
          },
        },

        {
          method: "GET",
          path: "/api/v1/profile/passRegisterData",
          config: {
            pre: [{ method: validateToken, assign: "token" }], // Use the validateToken function here
            handler: controller.userRegisterPageData,
            description: "Passing the register Data to the Register Page",
            tags: ["api", "Users"],
            auth: false,
          },
        },
      ]);
      resolve(true);
    });
  }
}

export class StaffRoutes implements IRoute {
  public async register(server: any): Promise<any> {
    return new Promise((resolve) => {
      const controller = new FrontDesk();
      server.route([
        {
          method: "GET",
          path: "/api/v1/staff/dashBoard",
          config: {
            pre: [{ method: validateToken, assign: "token" }],
            handler: controller.staffDashBoard,
            description: "Front Office Dashboard",
            auth: false,
          },
        },
        {
          method: "GET",
          path: "/api/v1/staff/studentApproval",
          config: {
            // pre: [{ method: validateToken, assign: "token" }],
            handler: controller.staffStudentApproval,
            description: "Staff Student Approval Request",
            auth: false,
          },
        },
        {
          method: "POST",
          path: "/api/v1/staff/Approvalbtn",
          config: {
            // pre: [{ method: validateToken, assign: "token" }],
            handler: controller.staffApprovalBtn,
            description: "Staff Student Approval Request",
            auth: false,
          },
        },
        {
          method: "POST",
          path: "/api/v1/staff/rejectionbtn",
          config: {
            // pre: [{ method: validateToken, assign: "token" }],
            handler: controller.staffRejectionBtn,
            description: "Staff Student Rejection Request",
            auth: false,
          },
        },
        {
          method: "GET",
          path: "/api/v1/staff/userSignedUp",
          config: {
            // pre: [{ method: validateToken, assign: "token" }],
            handler: controller.userSignedUp,
            description: "Staff Student Approval Request",
            auth: false,
          },
        },
        {
          method: "GET",
          path: "/api/v1/staff/userFollowUp",
          config: {
            // pre: [{ method: validateToken, assign: "token" }],
            handler: controller.userFollowUp,
            description: "Signup User FollowUp Details",
            auth: false,
          },
        },
        {
          method: "GET",
          path: "/api/v1/staff/userManagementPage",
          config: {
            // pre: [{ method: validateToken, assign: "token" }],
            handler: controller.userManagementPage,
            description: "Signup User FollowUp Details",
            auth: false,
          },
        },
      ]);
      resolve(true);
    });
  }
}
export class DirectorRoutes implements IRoute {
  public async register(server: any): Promise<any> {
    return new Promise((resolve) => {
      const controller = new Director();
      server.route([
        {
          method: "GET",
          path: "/api/v1/director/staff",
          config: {
            // pre: [{ method: validateToken, assign: "token" }],
            handler: controller.directorStaffPg,
            description: "director Page Staff Module",
            auth: false,
          },
        },
        {
          method: "POST",
          path: "/api/v1/director/addEmployee",
          config: {
            // pre: [{ method: validateToken, assign: "token" }],
            handler: controller.addEmployee,
            description: "Add New Staff Or Employee",
            tags: ["api", "Users"],
            auth: false,
          },
        },
      ]);
      resolve(true);
    });
  }
}

// export class SignUp implements IRoute{

// }
