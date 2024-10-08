export const insertProfileAddressQuery = `
  INSERT INTO public."refUserAddress" (
    "refStId", "refAdAdd1Type", "refAdAdd1", "refAdArea1", 
    "refAdCity1", "refAdState1", "refAdPincode1","refAdAdd2Type","refAdAdd2","refAdArea2","refAdCity2","refAdState2","refAdPincode2"
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  RETURNING *;
`;

export const insertProfileGeneralHealth = `
  INSERT INTO public."refGeneralHealth" (
    "refStId", "refHeight", "refWeight", "refBlood", 
    "refBMI", "refBP", "refRecentInjuries","refRecentInjuriesReason","refRecentFractures","refRecentFracturesReason","refOthers","refElse"
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  RETURNING *;
`;
