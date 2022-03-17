import { gql } from "@apollo/client";

export const WHOAMI_QUERY = gql`
  query whoAmI {
    whoAmI {
      id
      name
      avatar
      statusMessage
      bgImg
    }
  }
`;
