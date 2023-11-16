import type { NextApiRequest, NextApiResponse } from "next";
import { makeTrainTimesTypeNotSuck } from "../../../../util/types/remap-arrivals-response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { stopID } = req.query;
  try {
    const CTA_API_KEY = process.env.CTA_API_KEY;
    console.log(CTA_API_KEY);
    const url = `https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${CTA_API_KEY}&mapid=${stopID}&outputType=JSON`;
    const ctaCall = await fetch(url);

    const convertedType = makeTrainTimesTypeNotSuck(
      (await ctaCall.json()).ctatt
    );
    console.log(JSON.stringify(convertedType));

    // return c.json(convertedType);
    res.status(200).json(convertedType);
    return;
  } catch (e: unknown) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}
