import { env } from "../../../env/client.mjs";

/**
 * Hack for getting the base URL because I'm
 * messing up that in vercel. Done primarily to hit cloud
 * functions from the client.
 * @returns {string} The base URL for the train API
 */
export default function useGetBaseUrl(): string {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : env.NEXT_PUBLIC_TRAIN_API_BASE_URL;

  return baseUrl;
}
