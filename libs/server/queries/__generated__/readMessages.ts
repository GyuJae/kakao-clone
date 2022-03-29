/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { takeMessage_takeMessage } from "@libs/server/subscriptions/__generated__/takeMessage";
import { ReadMessagesInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: readMessages
// ====================================================

export interface readMessages_readMessages_messages_user {
  __typename: "MessageUser";
  id: number;
  avatar: string | null;
  name: string;
}

export interface readMessages_readMessages_messages {
  __typename: "MessageWithUser";
  id: number;
  payload: string;
  createdAt: any;
  user: readMessages_readMessages_messages_user;
}

export interface readMessages_readMessages {
  __typename: "ReadMessagesOutput";
  messages: readMessages_readMessages_messages[] | null;
}

export interface readMessages {
  takeMessage: takeMessage_takeMessage;
  readMessages: readMessages_readMessages;
}

export interface readMessagesVariables {
  input: ReadMessagesInput;
}
