"use client";

import { Area } from "@/components/area";
import { LoadingText } from "@/components/loading-text";
import { useSwr } from "@/utils/swr";
import { ProfileViewDetailed } from "@atproto/api/src/client/types/app/bsky/actor/defs";

export default function Home() {
  const { data, isLoading } = useSwr<{ profile: ProfileViewDetailed }>(
    "/api/me/profile"
  );

  return (
    <main className="p-8">
      <Area>
        <h1 className="font-bold text-2xl">
          @
          <LoadingText isLoading={isLoading}>
            {data?.data.profile.handle}
          </LoadingText>
        </h1>

        {data?.data.profile.followersCount}
      </Area>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <Area className="">
          <h2>Suggestions</h2>
        </Area>

        <Area className="">
          <h2>Suggestions</h2>
        </Area>
      </div>
    </main>
  );
}
