import { gql } from "@apollo/client";

export const EDIT_PROFIEL_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;
