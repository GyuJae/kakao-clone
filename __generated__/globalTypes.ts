/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateAccountInput {
  email: string;
  name: string;
  password: string;
}

export interface CreateFriendsInput {
  friendIds: number[];
}

export interface CreateRoomInput {
  userIds: number[];
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ReadMessagesInput {
  roomId: number;
}

export interface SearchFriendsInput {
  keyword: string;
}

export interface SendMessageInput {
  roomId: number;
  payload: string;
}

export interface TakeMessageInput {
  roomId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
