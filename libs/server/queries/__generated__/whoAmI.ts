/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: whoAmI
// ====================================================

export interface whoAmI_whoAmI {
  __typename: "UserEntity";
  id: number;
  name: string;
  avatar: string | null;
  statusMessage: string | null;
  bgImg: string | null;
}

export interface whoAmI {
  whoAmI: whoAmI_whoAmI;
}
