import { getAgent } from "@/app/api/_utils/get-agent";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { did } = await request.json();

  if (typeof did !== "string") {
    return NextResponse.json(
      {
        error: "Expected `did`",
      },
      { status: 400 }
    );
  }

  const agent = await getAgent();

  if (!agent)
    return NextResponse.json({ error: "No valid session" }, { status: 401 });

  await agent.follow(did);

  return NextResponse.json({ data: {} });
}
