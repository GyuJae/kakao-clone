/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateFriendsInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createFriends
// ====================================================

export interface createFriends_createFriends {
  __typename: "CreateFriendsOutput";
  ok: boolean;
  error: string | null;
}

export interface createFriends {
  createFriends: createFriends_createFriends;
}

export interface createFriendsVariables {
  input: CreateFriendsInput;
}
