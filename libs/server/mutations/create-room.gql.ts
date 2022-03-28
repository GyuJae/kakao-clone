import { gql } from "@apollo/client";

export const CREATE_ROOM_MUTATION = gql`
  mutation createRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      ok
      error
      roomId
    }
  }
`;
