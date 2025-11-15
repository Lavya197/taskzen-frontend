export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

async function request(method, route, body = null, extraHeaders = {}) {
  const options = {
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

export const apiGet = (route, headers = {}) => request("GET", route, null, headers);
export const apiPost = (route, body, headers = {}) =>
  request("POST", route, body, headers);
export const apiPatch = (route, body, headers = {}) =>
  request("PATCH", route, body, headers);
