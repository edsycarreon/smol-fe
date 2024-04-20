/**
 * Performs an HTTP request using the Fetch API.
 *
 * @param url The URL for the request.
 * @param method The HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param data The data to be sent as body (for POST, PUT) or query parameters (for GET).
 * @param headers Additional HTTP headers to be sent with the request.
 * @returns A promise that resolves with the response.
 */
async function fetchRequest(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  data?: Record<string, any>,
  headers?: Record<string, string>
): Promise<Response> {
  const baseURL = "http://localhost:3001";

  url = `${baseURL}${url}`;
  const config: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6ImV1cmlrYW5hdmFycm8xQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEtQbEptUkIwQ1FMSE8wdW9xa2JPVmUxLlRBSjdybE1ueVcuSGhqcmpUcFh6d0tmUnlKRVkyIn0sImlhdCI6MTcxMzU4ODAzNywiZXhwIjoxNzEzNTkxNjM3fQ.sQy7Ha8OFg8HZ_N6ycWRkw8PXmQWDlakvE90eIQxOUo";

  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
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
    console.error("Fetch error:", error);
    throw error;
  }
}

export default fetchRequest;
