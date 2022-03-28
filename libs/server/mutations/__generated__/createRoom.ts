/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateRoomInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createRoom
// ====================================================

export interface createRoom_createRoom {
  __typename: "CreateRoomOutput";
  ok: boolean;
  error: string | null;
  roomId: number | null;
}

export interface createRoom {
  createRoom: createRoom_createRoom;
}

export interface createRoomVariables {
  input: CreateRoomInput;
}
