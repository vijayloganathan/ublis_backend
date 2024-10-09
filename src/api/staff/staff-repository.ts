import { executeQuery } from "../../helper/db";
// import {} from "./query";
import { encrypt } from "../../helper/encrypt";

export class StaffRepository {
  public async staffStudentApprovalV1(userData: any): Promise<any> {
    console.log("userData", userData);

    return encrypt({
      success: true,
      message: "Address Stored Successfully",
    });
  }
}
