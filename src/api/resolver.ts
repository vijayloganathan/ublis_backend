import { UserRepository } from "./users/user-repository";
import { ProfileRepository } from "./profile/profile-repository";
import { StaffRepository } from "./staff/staff-repository";
import { DirectorRepository } from "./directors/director-repository";

export class Resolver {
  public userRepository: any;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async userLoginV1(user_data: any, domain_code: any): Promise<any> {
    return await this.userRepository.userLoginV1(user_data, domain_code);
  }
  public async validateUsers(user_data: any, domain_code: any): Promise<any> {
    return await this.userRepository.validateUsers(user_data, domain_code);
  }

  public async userSignUpV1(user_data: any, domain_code: any): Promise<any> {
    return await this.userRepository.userSignUpV1(user_data, domain_code);
  }
  public async validateUserNameV1(
    user_data: any,
    domain_code: any
  ): Promise<any> {
    return await this.userRepository.validateUserNameV1(user_data, domain_code);
  }
}

export class ProfileResolver {
  public profileRepository: any;
  constructor() {
    this.profileRepository = new ProfileRepository();
  }

  public async userAddressV1(user_data: any, domain_code: any): Promise<any> {
    return await this.profileRepository.userAddressV1(user_data, domain_code);
  }

  public async userPersonalDataV1(
    user_data: any,
    domain_code: any
  ): Promise<any> {
    return await this.profileRepository.userPersonalDataV1(
      user_data,
      domain_code
    );
  }

  public async userGeneralHealthV1(
    user_data: any,
    domain_code: any
  ): Promise<any> {
    return await this.profileRepository.userGeneralHealthV1(
      user_data,
      domain_code
    );
  }

  public async userRegisterDataV1(
    user_data: any,
    domain_code: any
  ): Promise<any> {
    return await this.profileRepository.userRegisterDataV1(
      user_data,
      domain_code
    );
  }
  public async userRegisterPageDataV1(
    userData: any,
    domainCode: any,
    decodedToken: any
  ): Promise<any> {
    // const userId = decodedToken.userId;
    // console.log("\n\n\nuserId====", userId);
    return await this.profileRepository.userRegisterPageDataV1(
      userData,
      domainCode
    );
  }
}

export class FrontDeskResolver {
  public StaffRepository: any;
  constructor() {
    this.StaffRepository = new StaffRepository();
  }
  public async staffDashBoardV1(
    user_data: any,
    domain_code: any
  ): Promise<any> {
    return await this.StaffRepository.staffDashBoardV1(user_data, domain_code);
  }
  public async staffStudentApprovalV1(
    user_data: any,
    domain_code: any
  ): Promise<any> {
    return await this.StaffRepository.staffStudentApprovalV1(
      user_data,
      domain_code
    );
  }

  public async staffApprovalBtnV1(
    user_data: any,
    domain_code: any
  ): Promise<any> {
    return await this.StaffRepository.staffApprovalBtnV1(
      user_data,
      domain_code
    );
  }
  public async staffRejectionBtnV1(
    user_data: any,
    domain_code: any
  ): Promise<any> {
    return await this.StaffRepository.staffRejectionBtnV1(
      user_data,
      domain_code
    );
  }
  public async userSignedUpV1(user_data: any, domain_code: any): Promise<any> {
    return await this.StaffRepository.userSignedUpV1(user_data, domain_code);
  }
  public async userFollowUpV1(user_data: any, domain_code: any): Promise<any> {
    return await this.StaffRepository.userFollowUpV1(user_data, domain_code);
  }
  public async userManagementPageV1(
    user_data: any,
    domain_code: any
  ): Promise<any> {
    return await this.StaffRepository.userManagementPageV1(
      user_data,
      domain_code
    );
  }
}

export class DirectorResolver {
  public DirectorRepository: any;
  constructor() {
    this.DirectorRepository = new DirectorRepository();
  }
  public async directorStaffPgV1(
    user_data: any,
    domain_code: any
  ): Promise<any> {
    return await this.DirectorRepository.directorStaffPgV1(
      user_data,
      domain_code
    );
  }
  public async addEmployeeV1(user_data: any, domain_code: any): Promise<any> {
    return await this.DirectorRepository.addEmployeeV1(user_data, domain_code);
  }
}
