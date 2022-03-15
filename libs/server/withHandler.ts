import { NextApiRequest, NextApiResponse } from "next";

type method = "GET" | "POST" | "DELETE";

interface IWithHandler {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isAuthPage?: boolean;
}

export function withHandler({
  methods,
  handler,
  isAuthPage = false,
}: IWithHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (!req.method && methods.includes(req.method as any)) {
      return res.status(405).end();
    }

    if (!isAuthPage && !req.session.user) {
      return res.status(401).json({
        ok: false,
        error: "No Authorization",
      });
    }
    try {
      await handler(req, res);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
}
