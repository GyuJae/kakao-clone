/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchFriendsInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchFriends
// ====================================================

export interface searchFriends_searchFriends_users {
  __typename: "UserEntity";
  id: number;
  name: string;
  avatar: string | null;
  statusMessage: string | null;
  bgImg: string | null;
  isMe: boolean;
  isMyFriend: boolean;
}

export interface searchFriends_searchFriends {
  __typename: "SearchFriendsOutput";
  users: searchFriends_searchFriends_users[] | null;
}

export interface searchFriends {
  searchFriends: searchFriends_searchFriends;
}

export interface searchFriendsVariables {
  input: SearchFriendsInput;
}
