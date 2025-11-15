export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

async function request(
  method: HttpMethod,
  route: string,
  body: any = null,
  extraHeaders: Record<string, string> = {}
) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(`${API_BASE}${route}`, options);
    return await res.json();
  } catch (err) {
    console.error(`API ${method} ${route} error:`, err);
    return { success: false, message: "Network error" };
  }
}

export const apiGet = (route: string, headers: Record<string, string> = {}) =>
  request("GET", route, null, headers);

export const apiPost = (
  route: string,
  body: any,
  headers: Record<string, string> = {}
) => request("POST", route, body, headers);

export const apiPatch = (
  route: string,
  body: any,
  headers: Record<string, string> = {}
) => request("PATCH", route, body, headers);
