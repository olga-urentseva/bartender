import { useState } from "react";

enum Status {
  IDLE = "IDLE",
  IN_PROGRESS = "IN_PROGRESS",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}

type AsyncFunction<T> = () => Promise<T>;

export function useAsync<T = unknown>(asyncFunction: AsyncFunction<T>) {
  const [data, setData] = useState<T>();
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [error, setError] = useState<Error>();

  async function run() {
    setStatus(Status.IN_PROGRESS);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus(Status.SUCCESS);
    } catch (error) {
      setStatus(Status.FAILURE);
      setError(error instanceof Error ? error : new Error("Unknown error"));
    }
  }
  return [run, { data, error, status }];
}
