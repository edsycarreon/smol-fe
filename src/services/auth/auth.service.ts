import { RequestType } from "../../enums";
import fetchRequest from "../../utils/fetch.utils";

export async function signIn(
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

export async function signUp(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<Response> {
  const response = await fetchRequest("/auth/signup", {
    method: RequestType.POST,
    data: { firstName, lastName, email, password, confirmPassword },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.code);
  }
  return response;
}
