import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@kerk/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    const name = req.body?.name;
    if (!name) {
      return res.status(422).send("No name provided :(");
    }
    try {
      const user = await prisma.user.create({
        data: {
          name: name,
          email: `${name}@fakemail.com`,
        },
      });
      return res.status(200).json(user);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  return res.status(404);
}
