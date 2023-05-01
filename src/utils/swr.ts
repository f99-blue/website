import useSWR, { SWRConfiguration } from "swr";

async function fetcher(...args: Parameters<typeof fetch>) {
  const res = await fetch(...args);

  if (res.status === 401) {
    document.location.href = "/";
    return;
  }

  if (!res.ok) throw new Error("Not ok");

  return await res.json();
}

export const useSwr = <Data>(
  key: Parameters<typeof useSWR>[0],
  options?: SWRConfiguration
) => {
  return useSWR<{
    data: Data;
  }>(Array.isArray(key) ? key[0] : key, fetcher, options);
};
