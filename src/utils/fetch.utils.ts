/**
 * Performs an HTTP request using the Fetch API.
 *
 * @param url The URL for the request.
 * @param options Configuration options for the request.
 * @returns A promise that resolves with the response.
 */
async function fetchRequest(
  url: string,
  options: {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    data?: Record<string, any>;
    headers?: Record<string, string>;
  }
): Promise<Response> {
  const { method, data, headers } = options;
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

  url = `${baseURL}${url}`;
  const config: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  const token = localStorage.getItem("token");

  if (token) {
    (config.headers as Record<string, string>)[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  if (method === "GET" && data) {
    const params = new URLSearchParams();
    Object.keys(data).forEach((key) => params.append(key, data[key]));
    url += `?${params}`;
  } else if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    return response;
  } catch (error) {
    throw error;
  }
}

export default fetchRequest;
