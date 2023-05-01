import { NextResponse } from "next/server";
import { getAgent } from "../../_utils/get-agent";

export async function getProfile() {
  const agent = await getAgent();

  if (!agent) return null;

  return (await agent.getProfile({ actor: agent.session!.did })).data;
}

export async function GET(_request: Request) {
  const profile = await getProfile();

  if (!profile)
    return NextResponse.json({ error: "No valid session" }, { status: 401 });

  return NextResponse.json({
    data: {
      profile,
    },
  });
}
