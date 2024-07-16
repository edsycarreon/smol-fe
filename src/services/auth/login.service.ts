import { RequestType } from "../../enums";
import fetchRequest from "../../utils/fetch.utils";

export async function login(
  email: string,
  password: string
): Promise<Response> {
  const response = await fetchRequest("/auth/signin", {
    method: RequestType.POST,
    data: { email, password },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.code);
  }
  return response;
}
