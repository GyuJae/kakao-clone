import { gql } from "@apollo/client";

export const READ_ROOMS_QUERY = gql`
  query readRooms {
    readRooms {
      rooms {
        id
        users {
          id
          name
          avatar
        }
      }
    }
  }
`;
