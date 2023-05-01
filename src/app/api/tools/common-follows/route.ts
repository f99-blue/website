import { ProfileView } from "@atproto/api/src/client/types/app/bsky/actor/defs";
import { NextResponse } from "next/server";
import { getAgent } from "../../_utils/get-agent";

export interface CommonFollowsResponse {
  data: {
    commonFollows: {
      count: number;
      profile: ProfileView;
    }[];
  };
}

// @todo make this more clever
export async function GET(_request: Request) {
  const agent = await getAgent();

  if (!agent)
    return NextResponse.json({ error: "No valid session" }, { status: 401 });

  const myFollowsFull = await (async () => {
    const result: ProfileView[] = [];

    let cursor: string | undefined = undefined;
    while (true) {
      const { data } = await agent.getFollows({
        limit: 100,
        actor: agent.session!.did,
        cursor,
      });

      if (!data.follows.length) break;

      cursor = data.cursor;
      result.push(...data.follows);
    }

    return result;
  })();
  const myFollowsDids = new Set(myFollowsFull.map((myFollow) => myFollow.did));
  const myFollowsStartIndex = Math.round(
    Math.random() * myFollowsFull.length - 1
  );
  const myFollowsEndIndex = myFollowsStartIndex + 50;
  const myFollows = myFollowsFull.slice(myFollowsStartIndex, myFollowsEndIndex);

  const profilesByFollowAmount = new Map<
    string,
    { count: number; profile: ProfileView }
  >();
  for (const myFollow of myFollows) {
    const theirFollows = (
      await agent.getFollows({ actor: myFollow.did, limit: 10 })
    ).data.follows;

    for (const theirFollow of theirFollows) {
      if (myFollowsDids.has(theirFollow.did)) {
        continue;
      }

      if (!profilesByFollowAmount.has(theirFollow.did)) {
        profilesByFollowAmount.set(theirFollow.did, {
          profile: theirFollow,
          count: 1,
        });
      } else {
        profilesByFollowAmount.set(theirFollow.did, {
          profile: theirFollow,
          count: profilesByFollowAmount.get(theirFollow.did)!.count + 1,
        });
      }
    }
  }

  return NextResponse.json({
    data: {
      myFollowsStartIndex,
      myFollowsEndIndex,
      commonFollows: Array.from(profilesByFollowAmount.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 25),
    },
  });
}
