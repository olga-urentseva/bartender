export type Jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | Jsonable[]
  | { [key: string]: Jsonable }
  | { toJSON(): Jsonable };

async function request<T = unknown>(url: string, options: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Server responded with ${response.status} code`);
  }
  const responseBody = await response.text();
  if (responseBody) {
    return JSON.parse(responseBody) as T;
  }
  return null;
}

export function get<T = unknown>(
  url: string,
  options: Partial<RequestInit> = {}
) {
  return request<T>(url, { ...options, method: "GET" });
}

export function post<T = unknown>(
  url: string,
  data: Jsonable,
  options: Partial<RequestInit> = {}
) {
  return request<T>(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
}
