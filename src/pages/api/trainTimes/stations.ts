import type { Client, Row } from "@libsql/client";
import { createClient } from "@libsql/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db: Client | undefined = undefined;

  try {
    const dbUrl = process.env.DB_URL;
    const dbAuthToken = process.env.DB_TOKEN;
    if (dbUrl === undefined || dbAuthToken === undefined) {
      throw new Error(
        "DB_URL and DB_AUTH_TOKEN must be set in the environment"
      );
    }

    // TODO: See if we can keep this open for a bit until the calls stop
    db = createClient({
      url: dbUrl,
      authToken: dbAuthToken,
    });

    const dbResponse: {
      columns: string[];
      columnTypes: string[];
      rows: Row[];
    } = await db.execute("SELECT * FROM train_stations");

    const stationsJson = dbResponse.rows.map((row) => {
      const station_name = row[1] as string;
      const id = row[0] as string;

      return {
        station_name,
        id,
      };
    });

    res.status(200).json(stationsJson);
  } catch (e: unknown) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong" });
  } finally {
    if (db !== undefined) {
      db?.close();
    }
  }
}
