import type { NextApiRequest, NextApiResponse } from "next";
import { IResponse } from "../../../libs/server/types";
import { withHandler } from "../../../libs/server/withHandler";

function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  try {
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
}

export default withHandler({ methods: ["POST"], handler, isAuthPage: true });
