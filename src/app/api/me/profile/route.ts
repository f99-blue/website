import { NextResponse } from "next/server";
import { getAgent } from "../../_utils/get-agent";

export async function GET(_request: Request) {
  const agent = await getAgent();

  if (!agent)
    return NextResponse.json({ error: "No valid session" }, { status: 401 });

  return NextResponse.json({
    data: {
      profile: (await agent.getProfile({ actor: agent.session!.did })).data,
    },
  });
}
