import { gql } from "@apollo/client";
import { USER_FIELDS } from "../fragments";

export const WHOAMI_QUERY = gql`
  ${USER_FIELDS}
  query whoAmI {
    whoAmI {
      ...UserFields
    }
  }
`;
