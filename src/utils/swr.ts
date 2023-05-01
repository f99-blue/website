import useSWR from "swr";

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const useSwr = <Data>(key: string) =>
  useSWR<{
    data: Data;
  }>(key, fetcher);
