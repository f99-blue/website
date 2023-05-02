"use client";

import { Area, AreaProps } from "@/components/area";
import { Button } from "@/components/button";
import { LoadingBlock } from "@/components/loading-block";
import { useSwr } from "@/utils/swr";
import { toast } from "react-hot-toast";
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
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  async function follow(did: string) {
    const loadingToastId = toast.loading("Following...");

    const res = await fetch("/api/me/actions/follow", {
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ did }),
    });

    toast.dismiss(loadingToastId);

    if (!res.ok) {
      toast.error("Failed to follow :(");
      throw new Error("Not ok");
    }

    toast.success("Followed!");
  }

  return (
    <Area {...props.area}>
      <div className="md:flex justify-between items-start">
        <div>
          <h2 className="text-xl">Common follow suggestions</h2>
          <p className="text-gray-300">
            The accounts your follows&apos;¹ follow the most.
          </p>
        </div>

        <Button
          onClick={() => {
            cache.delete("/api/tools/common-follows");
            mutate("/api/tools/common-follows");
          }}
          className="mt-2 md:mt-0 w-full md:w-auto"
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
                className="w-full bg-gray-700 p-4 rounded flex flex-col-reverse md:flex-row justify-between"
                key={x.profile.did}
              >
                <div className="mt-4 md:mt-0 md:w-1/3">
                  <p className="inline-block rounded text-gray-200">
                    Followed by <span className="text-white">{x.count}</span> of
                    your follows
                  </p>

                  <Button
                    onClick={async (e) => {
                      const button = e.currentTarget;

                      button.disabled = true;
                      try {
                        await follow(x.profile.did);
                      } catch {
                        button.disabled = false;
                      }
                    }}
                    className="md:w-auto w-full mt-2 disabled:bg-opacity-25"
                  >
                    Follow
                  </Button>
                </div>

                <div className="md:w-2/3 md:ml-4 bg-gray-900 p-4 rounded overflow-hidden">
                  <a
                    href={`https://staging.bsky.app/profile/${x.profile.handle}`}
                    rel="noreferrer"
                    target="_blank"
                    className="inline-block"
                  >
                    <img
                      className="h-20 rounded border border-gray-700 bg-gray-500"
                      src={x.profile.avatar}
                      alt={x.profile.handle + "'s avatar"}
                    />

                    <h3 className="text-xl font-bold mt-2">
                      {x.profile.displayName ?? x.profile.handle}
                    </h3>
                    <p className="text-gray-100 text-sm">@{x.profile.handle}</p>
                  </a>
                  {x.profile.description ? (
                    <p className="text-gray-200 mt-1">
                      {x.profile.description}
                    </p>
                  ) : null}
                </div>
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
