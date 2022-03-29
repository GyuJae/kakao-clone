/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SendMessageInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: sendMessage
// ====================================================

export interface sendMessage_sendMessage {
  __typename: "SendMessageOutput";
  ok: boolean;
  error: string | null;
}

export interface sendMessage {
  sendMessage: sendMessage_sendMessage;
}

export interface sendMessageVariables {
  input: SendMessageInput;
}
