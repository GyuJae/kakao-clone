/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: readRooms
// ====================================================

export interface readRooms_readRooms_rooms_users {
  __typename: "UserEntity";
  id: number;
  name: string;
  avatar: string | null;
}

export interface readRooms_readRooms_rooms {
  __typename: "RoomWithUsers";
  id: number;
  users: readRooms_readRooms_rooms_users[];
}

export interface readRooms_readRooms {
  __typename: "ReadRoomsOutput";
  rooms: readRooms_readRooms_rooms[] | null;
}

export interface readRooms {
  readRooms: readRooms_readRooms;
}
