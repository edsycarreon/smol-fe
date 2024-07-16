import { RequestType } from "../../enums";
import { CreateURLParams } from "../../types";
import fetchRequest from "../../utils/fetch.utils";

export async function createShortUrl(
  urlParams: CreateURLParams
): Promise<Response> {
  const response = await fetchRequest("/", {
    method: RequestType.POST,
    data: urlParams,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.code);
  }

  return response;
}

export async function deleteShortUrl(shortUrl: string): Promise<Response> {
  const response = await fetchRequest(`/${shortUrl}`, {
    method: RequestType.DELETE,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.code);
  }

  return response;
}
