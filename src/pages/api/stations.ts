import type { NextApiRequest, NextApiResponse } from "next";
import { makeTrainTimesTypeNotSuck } from "../../util/types/remap-arrivals-response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { stopId } = req.query;
  try {
    const CTA_API_KEY = process.env.CTA_API_KEY;
    const url = `https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${CTA_API_KEY}&mapid=${stopId}&outputType=JSON`;
    const ctaCall = await fetch(url);

    const convertedType = makeTrainTimesTypeNotSuck(
      (await ctaCall.json()).ctatt
    );

    // return c.json(convertedType);
    res.end(convertedType);
    return;
  } catch (e: unknown) {
    console.error(e);
  }
}
