import { gql } from "@apollo/client";

export const USER_FIELDS = gql`
  fragment UserFields on UserEntity {
    id
    name
    avatar
    statusMessage
    bgImg
    isMe
    isMyFriend
  }
`;
