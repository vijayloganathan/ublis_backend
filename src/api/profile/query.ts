export const insertProfileAddressQuery = `
  INSERT INTO public."refUserAddress" (
    "refStId", 
    "refAdAdd1Type", 
    "refAdAdd1", 
    "refAdArea1", 
    "refAdCity1",
     "refAdState1", 
     "refAdPincode1",
     "refAdAdd2Type",
     "refAdAdd2",
     "refAdArea2",
     "refAdCity2",
     "refAdState2",
     "refAdPincode2"
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  RETURNING *;
`;

export const insertProfileGeneralHealth = `
  INSERT INTO public."refGeneralHealth" (
    "refStId", "refHeight", "refWeight", "refBlood", 
    "refBMI", "refBP", "refRecentInjuries","refRecentInjuriesReason","refRecentFractures","refRecentFracturesReason",
    "refOthers","refElse","refOtherActivities","refPerHealthId","refMedicalDetails","refUnderPhysCare","refDrName"
    ,"refHospital","refBackpain","refProblem","refPastHistory","refFamilyHistory"
    ,"refAnythingelse"
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 ,$13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
  RETURNING *;
`;

export const insertProfilePersonalData = `
    UPDATE public."users"
  SET 
    "refStSex" = $1,
    "refQualification" = $2,
    "refOccupation" = $3,
    "refguardian" = $4,
    "refTimingId" = $5,
    "refUtId" = $6,
    "refBranchId"= $7,
    "refStFName"=$8,
    "refStLName"=$9,
    "refStDOB"=$10,
    "refStAge"=$11
  WHERE "refStId" = $12
  RETURNING *;

`;

export const insertCommunicationData = `
  UPDATE public."refUserCommunication"
SET 
  "refCtWhatsapp" = $2,
  "refCtMobile"=$3,
  "refCtEmail"=$4
WHERE "refStId" = $1
RETURNING *;
`;

export const fetchProfileData = `
SELECT u."refStFName", u."refStLName", rud."refUserName", ruc."refCtMobile",ruc."refCtEmail", u."refStDOB", u."refStAge"
FROM users u
JOIN "refUserCommunication" ruc
ON u."refStId" = CAST(ruc."refStId" AS INTEGER)
JOIN "refUsersDomain" rud
ON u."refStId" = CAST(rud."refStId" AS INTEGER)
WHERE u."refStId" = $1;
`;

export const fetchPreferableTiming = `
  SELECT "refTimeId", "refTime","refTimeMembers","refTimeMode","refTimeDays"
  FROM public."refTiming"; 
`;

export const fetchPresentHealthProblem = `
  SELECT "refHealthId", "refHealth"
  FROM public."refHealthIssues";
`;

export const updateHistoryQuery = `
  INSERT INTO public."refUserTxnHistory" (
    "transTypeId","transData","refStId", "transTime", "refUpdatedBy"
  ) VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

export const fetchBranchList = `SELECT * FROM public.branch;`;
