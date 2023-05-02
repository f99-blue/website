"use client";

import { Area, AreaProps } from "@/components/area";
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

interface ProfileAreaProps {
  profile: ProfileViewDetailed;
  area?: AreaProps;
}

export function ProfileArea(props: ProfileAreaProps) {
  return (
    <Area {...props.area}>
      <div className="">
        <h1 className="text-2xl">
          {props.profile.displayName ?? props.profile.handle}
        </h1>
        <p className="text-gray-100 text-sm">@{props.profile.handle}</p>

        <div className="mt-1 space-x-4 text-sm">
          <span>
            {props.profile.followersCount ?? "0"}{" "}
            <span className="text-gray-300">followers</span>
          </span>

          <span>
            {props.profile.followsCount ?? "0"}{" "}
            <span className="text-gray-300">follows</span>
          </span>
        </div>

        <p className="mt-1 whitespace-pre-wrap text-gray-200">
          {props.profile.description}
        </p>
      </div>
    </Area>
  );
}
