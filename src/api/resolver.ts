import { UserRepository } from "./users/user-repository";
import { ProfileRepository } from "./profile/profile-repository";

export class Resolver {
  public userRepository: any;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async userLoginV1(user_data: any, domain_code: any): Promise<any> {
    return await this.userRepository.userLoginV1(user_data, domain_code);
  }

  public async userSignUpV1(user_data: any, domain_code: any): Promise<any> {
    console.log("user_data", user_data);
    return await this.userRepository.userSignUpV1(user_data, domain_code);
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

  public async userGeneralHealthV1(user_data: any,domain_code: any): Promise<any> {
    return await this.profileRepository.userGeneralHealthV1(user_data,domain_code);
  }
}
