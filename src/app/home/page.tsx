"use client";

import { Area, AreaProps } from "@/components/area";
import { Button } from "@/components/button";
import { LoadingBlock } from "@/components/loading-block";
import { LoadingText } from "@/components/loading-text";
import { useSwr } from "@/utils/swr";
import { ProfileViewDetailed } from "@atproto/api/src/client/types/app/bsky/actor/defs";
import { useSWRConfig } from "swr";
import { CommonFollowsResponse } from "../api/tools/common-follows/route";

function ProfileArea(props: AreaProps) {
  const profileSwr = useSwr<{ profile: ProfileViewDetailed }>(
    "/api/me/profile"
  );

  return (
    <Area className="h-full">
      <div className="ml-4">
        <h1 className="font-bold text-2xl">
          @
          <LoadingText isLoading={profileSwr.isLoading}>
            {profileSwr.data?.data.profile.handle}
          </LoadingText>
        </h1>

        <div className="mt-1 space-x-4 text-sm">
          <span>
            <LoadingText isLoading={profileSwr.isLoading}>
              {profileSwr.data?.data.profile.followersCount ?? "0"}
            </LoadingText>{" "}
            <span className="text-gray-300">followers</span>
          </span>

          <span>
            <LoadingText isLoading={profileSwr.isLoading}>
              {profileSwr.data?.data.profile.followsCount ?? "0"}
            </LoadingText>{" "}
            <span className="text-gray-300">follows</span>
          </span>
        </div>

        <p className="mt-1 whitespace-pre-wrap">
          <LoadingText isLoading={profileSwr.isLoading}>
            {profileSwr.data?.data.profile.description}
          </LoadingText>
        </p>
      </div>
    </Area>
  );
}

function CommonFollowsArea(props: AreaProps) {
  const { cache, mutate } = useSWRConfig();
  const commonFollowsSwr = useSwr<CommonFollowsResponse["data"]>(
    "/api/tools/common-follows",
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <Area {...props}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl">Common follow suggestions</h2>
          <p className="text-gray-300">
            The accounts your follows follow the most.
          </p>
        </div>

        <Button
          onClick={() => {
            cache.delete("/api/tools/common-follows");
            mutate("/api/tools/common-follows");
          }}
          className="w-auto bg-gray-200 text-black"
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
                className="w-full bg-gray-700 p-4 rounded flex justify-between"
                key={x.profile.did}
              >
                <div className="w-1/2">
                  <a
                    href={`https://staging.bsky.app/profile/${x.profile.handle}`}
                    rel="noreferrer"
                    target="_blank"
                    className="inline-block"
                  >
                    <img
                      className="h-20 rounded border border-gray-600"
                      src={x.profile.avatar}
                      alt={x.profile.handle + "'s avatar"}
                    />

                    <h3 className="text-lg font-bold mt-2">
                      {x.profile.handle}
                    </h3>
                  </a>
                  <p className="text-gray-200">{x.profile.description}</p>
                </div>
                <p className="text-gray-200">
                  Followed by <span className="text-white">{x.count}</span> of
                  your follows
                </p>
              </div>
            );
          })
        )}
      </div>
    </Area>
  );
}

export default function Home() {
  return (
    <main className="p-4 md:p-8">
      <div className="md:-mx-4 flex flex-wrap items-stretch">
        <div className="md:px-2 w-full md:w-1/3">
          <ProfileArea className="h-full" />
        </div>

        <div className="md:px-2 mt-4 md:mt-0 w-full md:w-2/3">
          <CommonFollowsArea className="h-full" />
        </div>

        <div className="mt-4 w-full">
          <div className="px-2 w-full">
            <Area>More to come :)</Area>
          </div>
        </div>
      </div>
    </main>
  );
}
