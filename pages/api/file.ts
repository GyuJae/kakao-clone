import { NextApiRequest, NextApiResponse } from "next";

interface IFilesResponse {
  ok: boolean;
  error?: string;
  url?: string;
}

interface SystemError {
  code: string;
  message: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IFilesResponse>
) {
  try {
    if (req.method !== "POST") {
      throw new Error("Method Error");
    }
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err.message);
      });
    console.log(response);
    return {
      ok: true,
    };
  } catch (error) {
    const err = error as SystemError;
    return {
      ok: false,
      error: err.message,
    };
  }
}

export default handler;
