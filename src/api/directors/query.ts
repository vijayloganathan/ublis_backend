export const queryStaffDetails = `SELECT DISTINCT ON (u."refSCustId") * 
FROM public.users u
JOIN public."refUserCommunication" uc
  ON CAST(u."refStId" AS INTEGER) = uc."refStId"
JOIN public."refUserAddress" ad
  ON CAST(u."refStId" AS INTEGER) = ad."refStId"
WHERE u."refUtId" IN (4,8) 
ORDER BY u."refSCustId", u."refStId";`;

export const getUserStatusLabel = `SELECT * FROM public."refUserType"`;
