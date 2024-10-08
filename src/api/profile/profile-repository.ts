import { executeQuery } from "../../helper/db";
import { insertProfileAddressQuery, insertProfileGeneralHealth } from "./query";

// const JWT_SECRET = process.env.ACCESS_TOKEN || "ERROR";

export class ProfileRepository {
  //   STORING ADDRESS IN DB
  public async userAddressV1(userData: any): Promise<any> {
    let refAdAdd1Type: number = 3;
    let refAdAdd2Type: number = 0;

    if (userData.address.addresstype == false) {
      refAdAdd1Type = 1;
      refAdAdd2Type = 2;
    }

    const params = [
      userData.refCustId,
      refAdAdd1Type, //refAdAdd1Type
      userData.address.refAdAdd1, // refAdAdd1
      userData.address.refAdArea1, //refAdArea1
      userData.address.refAdCity1, //refAdCity1
      userData.address.refAdState1, //refAdState1
      userData.address.refAdPincode1, //refAdPincode1
      refAdAdd2Type, //refAdAdd2Type
      userData.address.refAdAdd2, //refAdAdd2
      userData.address.refAdArea2, //refAdArea2
      userData.address.refAdCity2, //refAdCity2
      userData.address.refAdState2, //refAdState2
      userData.address.refAdPincode2, //refAdPincode
    ];

    const userResult = await executeQuery(insertProfileAddressQuery, params);
    // const newUser = userResult[0];

    // Return Response
    return {
      success: true,
      message: "Registered Successfully",
    };
  }

  public async userGeneralHealthV1(userData: any): Promise<any> {
    const params = [
      userData.refCustId,
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
      // here we want to add past or present health issue
    ];

    const userResult = await executeQuery(insertProfileGeneralHealth, params);
    // const newUser = userResult[0];

    // Return Response
    return {
      success: true,
      message: "Registered Successfully",
    };
  }
}
