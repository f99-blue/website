"use client";

import { Area, AreaProps } from "@/components/area";
import { Button } from "@/components/button";
import { LoadingBlock } from "@/components/loading-block";
import { useSwr } from "@/utils/swr";
import { useSWRConfig } from "swr";
import { CommonFollowsResponse } from "../api/tools/common-follows/route";

interface CommonFollowsAreaProps {
  area?: AreaProps;
}

export function CommonFollowsArea(props: CommonFollowsAreaProps) {
  const { cache, mutate } = useSWRConfig();
  const commonFollowsSwr = useSwr<CommonFollowsResponse["data"]>(
    "/api/tools/common-follows",
    {
      swr: {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
      },
    }
  );

  return (
    <Area {...props.area}>
      <div className="md:flex justify-between items-start">
        <div>
          <h2 className="text-xl">Common follow suggestions</h2>
          <p className="text-gray-300">
            The accounts your follows'¹ follow the most.
          </p>
        </div>

        <Button
          onClick={() => {
            cache.delete("/api/tools/common-follows");
            mutate("/api/tools/common-follows");
          }}
          className="mt-2 md:mt-0 w-full md:w-auto bg-gray-200 text-black"
        >
          Shuffle
        </Button>
      </div>

      <div className="mt-2 space-y-2 max-h-96 overflow-auto">
        {commonFollowsSwr.isLoading ? (
          <LoadingBlock />
        ) : (
          (commonFollowsSwr.data?.data.commonFollows ?? []).map((x) => {
            return (
              <div
                className="w-full bg-gray-700 p-4 rounded"
                key={x.profile.did}
              >
                <div className="overflow-hidden">
                  <a
                    href={`https://staging.bsky.app/profile/${x.profile.handle}`}
                    rel="noreferrer"
                    target="_blank"
                    className="inline-block"
                  >
                    <img
                      className="h-20 rounded border border-gray-600 bg-gray-500"
                      src={x.profile.avatar}
                      alt={x.profile.handle + "'s avatar"}
                    />

                    <h3 className="text-lg font-bold mt-2">
                      {x.profile.handle}
                    </h3>
                  </a>
                  <p className="text-gray-200">{x.profile.description}</p>
                </div>

                <p className="mt-2 bg-gray-900 inline-block text-sm p-2 rounded text-gray-200">
                  Followed by <span className="text-white">{x.count}</span> of
                  your follows
                </p>
              </div>
            );
          })
        )}
      </div>

      <p className="text-right mt-2 text-sm text-gray-300">
        ¹: A maximum of 50 random accounts you follow are choosen at a time
      </p>
    </Area>
  );
}
