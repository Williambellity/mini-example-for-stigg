// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Stigg, { FullSubscription } from "@stigg/node-server-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  activeSubscription: Partial<FullSubscription>;
  quantity: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const stiggClient = Stigg.initialize({
    apiKey: process.env.STIGG_API_KEY || "",
  });

  const activeSubscriptions = await stiggClient.getActiveSubscriptions({
    customerId: req.body.customerId,
  });

  const entitlement = await stiggClient.getNumericEntitlement({
    customerId: req.body.customerId,
    featureId: "feature-members",
  });

  const { id, startDate, status } = activeSubscriptions[0];
  let quantity = entitlement.value || 1;

  res
    .status(200)
    .json({ activeSubscription: { id, startDate, status }, quantity });
}
