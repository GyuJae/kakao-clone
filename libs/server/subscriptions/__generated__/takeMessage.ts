/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TakeMessageInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: takeMessage
// ====================================================

export interface takeMessage_takeMessage_user {
  __typename: "UserEntity";
  id: number;
  name: string;
  avatar: string | null;
}

export interface takeMessage_takeMessage {
  __typename: "TakeMessageOutput";
  id: number;
  createdAt: any;
  payload: string;
  user: takeMessage_takeMessage_user;
}

export interface takeMessage {
  takeMessage: takeMessage_takeMessage;
}

export interface takeMessageVariables {
  input: TakeMessageInput;
}
