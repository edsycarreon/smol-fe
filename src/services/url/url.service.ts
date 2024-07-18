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
  const response = await fetchRequest(`/links/${shortUrl}`, {
    method: RequestType.DELETE,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.code);
  }

  return response;
}

export async function getAllUserUrls(): Promise<Response> {
  const response = await fetchRequest("/links/get", {
    method: RequestType.GET,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.code);
  }

  return response;
}

export async function getProtectedUrl({
  password,
  shortUrl,
}: {
  password: string;
  shortUrl: string;
}): Promise<Response> {
  const response = await fetchRequest("/protected", {
    method: RequestType.POST,
    data: { password, shortUrl },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.code);
  }

  return response;
}
