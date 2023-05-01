import useSWR, { SWRConfiguration } from "swr";

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const useSwr = <Data>(
  key: Parameters<typeof useSWR>[0],
  options?: SWRConfiguration
) => {
  console.log(key);

  return useSWR<{
    data: Data;
  }>(Array.isArray(key) ? key[0] : key, fetcher, options);
};
