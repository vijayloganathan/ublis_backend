import * as Hapi from "@hapi/hapi";

import IRoute from "../helper/routes";
import validate from "./validate";
import { UserController, UserProfileController, FrontDesk } from "./controller";
import { Logger } from "winston";

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
            // validate: validate.userLogin,
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
            handler: controller.userRegisterData,
            description: "Store General Health",
            tags: ["api", "Users"],
            auth: false,
          },
        },
        {
          method: "GET",
          path: "/api/v1/profile/passRegisterData",
          config: {
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
        // {
        //   method: "POST",
        //   path: "/api/v1/users/login",
        //   config: {
        //     handler: controller.userLogin,
        //     validate: validate.userLogin,
        //     description: "Login Checking",
        //     tags: ["api", "Users"],
        //     auth: false,
        //   },
        // },
        // {
        //   method: "POST",
        //   path: "/api/v1/users/signup",
        //   config: {
        //     handler: controller.userSignUp,
        //     validate: validate.userSignUp,
        //     description: "Signup Checking",
        //     tags: ["api", "Users", "SignUp"],
        //     auth: false,
        //   },
        // },
        {
          method: "POST",
          path: "/api/v1/staff/studentApproval",
          config: {
            handler: controller.staffStudentApproval,
            // validate: validate.userSignUp,
            description: "Staff Student Approval Request",
            // tags: ["api", "Users", "SignUp"],
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
