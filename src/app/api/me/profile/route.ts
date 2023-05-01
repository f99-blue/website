import { BskyAgent } from "@atproto/api";
import { NextResponse } from "next/server";
import { getSession } from "../../_utils/get-session";

export async function GET(_request: Request) {
  const session = getSession();

  if (!session)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const agent = new BskyAgent({
    service: "https://bsky.social",
  });
  await agent.resumeSession(session);

  return NextResponse.json({
    data: {
      profile: (await agent.getProfile({ actor: session.did })).data,
    },
  });
}
