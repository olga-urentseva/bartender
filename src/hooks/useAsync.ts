import { useState } from "react";

export enum Status {
  IDLE = "IDLE",
  IN_PROGRESS = "IN_PROGRESS",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}

type AsyncFunction<T> = () => Promise<T>;

export default function useAsync<T = never>(asyncFunction: AsyncFunction<T>) {
  const [data, setData] = useState<T>();
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [error, setError] = useState<Error>();

  async function run() {
    setStatus(Status.IN_PROGRESS);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus(Status.SUCCESS);
      setError(undefined);
    } catch (error) {
      setStatus(Status.FAILURE);
      setData(undefined);
      setError(error instanceof Error ? error : new Error("Unknown error"));
    }
  }
  return [run, { data, error, status }] as const;
}
