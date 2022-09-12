import { useEffect } from "react";

export type Jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | Jsonable[]
  | { [key: string]: Jsonable }
  | { toJSON(): Jsonable };

async function request(url: string, options: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Server responded with ${response.status} code`);
  }
  const json = await response.json();
  return json;
}

export function get(url: string, options: Partial<RequestInit> = {}) {
  return request(url, { ...options, method: "GET" });
}

export function post(
  url: string,
  data: Jsonable,
  options: Partial<RequestInit> = {}
) {
  return request(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
}
