import * as Hapi from "@hapi/hapi";
import * as Boom from "@hapi/boom";
import { Resolver, ProfileResolver, FrontDeskResolver } from "./resolver";
import logger from "../helper/logger";
import { decodeToken } from "../helper/token";

export class UserController {
  public resolver: any;

  constructor() {
    this.resolver = new Resolver();
  }

  public userLogin = async (
    request: Hapi.Request,
    response: Hapi.ResponseToolkit
  ): Promise<any> => {
    logger.info("Router----- line 17");
    try {
      logger.info(`GET URL REQ => ${request.url.href}`);
      const domainCode = request.headers.domain_code || "";
      let entity;

      // if (domainCode.includes("ubl")) {
      entity = await this.resolver.userLoginV1(request.payload);
      // } else {
      //   entity = await this.resolver.userLoginV2(request.payload);
      // }

      // Check entity response for success/failure
      if (entity.success) {
        return response.response(entity).code(200);
      }
      return response.response(entity).code(200); // Unauthorized if failed
    } catch (error) {
      logger.error("Error in userLogin:", error);
      return response
        .response({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        })
        .code(500);
    }
  };

  public userSignUp = async (
    request: Hapi.Request,
    response: Hapi.ResponseToolkit
  ): Promise<any> => {
    console.log("testing");
    logger.info("Router - sign up page");
    try {
      const domainCode = request.headers.domain_code || "";
      let entity;
      // if (domainCode.includes("ubl")) {
      entity = await this.resolver.userSignUpV1(request.payload);
      // } else {
      // entity = await this.resolver.userSignUpV2(request.payload);
      // }

      // Check entity response for success/failure
      if (entity.success) {
        return response.response(entity).code(201); // Created
      }
      return response.response(entity).code(200); // Bad Request if failed
    } catch (error) {
      logger.error("Error in userSignUp:", error);
      return response
        .response({
          success: false,
          message: "An unknown error occurred",
        })
        .code(500);
    }
  };
}

export class UserProfileController {
  public resolver: any;

  constructor() {
    this.resolver = new ProfileResolver();
  }

  public userAddress = async (
    request: Hapi.Request,
    response: Hapi.ResponseToolkit
  ): Promise<any> => {
    logger.info("Router-----store Address");
    try {
      logger.info(`GET URL REQ => ${request.url.href}`);
      const domainCode = request.headers.domain_code || "";
      let entity;

      entity = await this.resolver.userAddressV1(request.payload);

      // Check entity response for success/failure
      if (entity.success) {
        return response.response(entity).code(200);
      }
      return response.response(entity).code(200); // Unauthorized if failed
    } catch (error) {
      logger.error("Error in userLogin:", error);
      return response
        .response({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        })
        .code(500);
    }
  };

  public personalData = async (
    request: Hapi.Request,
    response: Hapi.ResponseToolkit
  ): Promise<any> => {
    logger.info("Router-----store Personal Data");
    try {
      logger.info(`GET URL REQ => ${request.url.href}`);
      const domainCode = request.headers.domain_code || "";
      let entity;

      entity = await this.resolver.userPersonalDataV1(request.payload);

      // Check entity response for success/failure
      if (entity.success) {
        return response.response(entity).code(200);
      }
      return response.response(entity).code(200); // Unauthorized if failed
    } catch (error) {
      logger.error("Error in userLogin:", error);
      return response
        .response({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        })
        .code(500);
    }
  };

  public userGeneralHealth = async (
    request: Hapi.Request,
    response: Hapi.ResponseToolkit
  ): Promise<any> => {
    logger.info("Router-----store General Health");
    try {
      logger.info(`GET URL REQ => ${request.url.href}`);
      const domainCode = request.headers.domain_code || "";
      let entity;

      entity = await this.resolver.userGeneralHealthV1(request.payload);

      // Check entity response for success/failure
      if (entity.success) {
        return response.response(entity).code(200);
      }
      return response.response(entity).code(200); // Unauthorized if failed
    } catch (error) {
      logger.error("Error in userLogin:", error);
      return response
        .response({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        })
        .code(500);
    }
  };

  public userRegisterData = async (
    request: any,
    response: Hapi.ResponseToolkit
  ): Promise<any> => {
    const decodedToken = request.plugins.token.id;
    logger.info("Router-----store Register Form Data");
    try {
      logger.info(`GET URL REQ => ${request.url.href}`);
      const domainCode = request.headers.domain_code || "";
      let entity;

      entity = await this.resolver.userRegisterDataV1(request.payload,decodedToken);

      // Check entity response for success/failure
      if (entity.success) {
        return response.response(entity).code(200);
      }
      return response.response(entity).code(200); // Unauthorized if failed
    } catch (error) {
      logger.error("Error in userLogin:", error);
      return response
        .response({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        })
        .code(500);
    }
  };

  public userRegisterPageData = async (
    request: any,
    response: Hapi.ResponseToolkit
  ): Promise<any> => {
    const decodedToken = request.plugins.token;
    console.log("Decoded Token in Controller:", decodedToken.id);

    try {
      logger.info(`GET URL REQ => ${request.url.href}`);

      const refStId = decodedToken.id;
      console.log("refStId line------223", refStId);

      const domainCode = request.headers.domain_code || "";
      console.log('domainCode line------227', domainCode)

      if (isNaN(refStId)) {
        return response
          .response({
            success: false,
            message: "Invalid refStId. Must be a number.",
          })
          .code(400);
      }

      // Pass refStId and userId to the repository function
      const entity = await this.resolver.userRegisterPageDataV1(
        { refStId }, // Add userId here
        domainCode
      );

      if (entity.success) {
        return response.response(entity).code(200);
      }
      return response.response(entity).code(200);
    } catch (error) {
      logger.error("Error in userLogin:", error);
      return response
        .response({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        })
        .code(500);
    }
  };
}

export class FrontDesk {
  public resolver: any;

  constructor() {
    this.resolver = new FrontDeskResolver();
  }

  public staffStudentApproval = async (
    request: Hapi.Request,
    response: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      logger.info(`GET URL REQ => ${request.url.href}`);
      // const refStId = parseInt(request.query.refStId, 10); // Convert refStId to integer
      const domainCode = request.headers.domain_code || "";

      // if (isNaN(refStId)) {
      //   return response
      //     .response({
      //       success: false,
      //       message: "Invalid refStId. Must be a number.",
      //     })
      //     .code(400);
      // }

      // Pass refStId as an integer
      const entity = await this.resolver.staffStudentApprovalV1(
        request.payload
      );

      if (entity.success) {
        return response.response(entity).code(200);
      }
      return response.response(entity).code(200);
    } catch (error) {
      logger.error("Error in userLogin:", error);
      return response
        .response({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        })
        .code(500);
    }
  };
}
