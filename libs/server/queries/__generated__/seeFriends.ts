/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFriends
// ====================================================

export interface seeFriends_seeFriends_friends {
  __typename: "UserEntity";
  id: number;
  name: string;
  avatar: string | null;
  statusMessage: string | null;
  bgImg: string | null;
  isMe: boolean;
  isMyFriend: boolean;
  email: string;
}

export interface seeFriends_seeFriends {
  __typename: "SeeFriendsOutput";
  friends: seeFriends_seeFriends_friends[] | null;
}

export interface seeFriends {
  seeFriends: seeFriends_seeFriends;
}
