import { useQuery } from "@apollo/client";
import { WHOAMI_QUERY } from "../../server/queries/whoAmI.gql";
import { whoAmI } from "../../server/queries/__generated__/whoAmI";

const useUser = () => useQuery<whoAmI>(WHOAMI_QUERY);

export default useUser;
