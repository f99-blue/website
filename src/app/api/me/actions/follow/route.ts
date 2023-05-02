import { getAgent } from "@/app/api/_utils/get-agent";
import {
  COMMON_RESPONSE,
  getInvalidBodyPropertyResponse as getWrongBodyPropertyResponse,
} from "@/app/api/_utils/response";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { did } = await request.json();
  if (typeof did !== "string")
    return getWrongBodyPropertyResponse("did", "string");

  const agent = await getAgent();
  if (!agent) return COMMON_RESPONSE.noValidSession;

  await agent.follow(did);

  return NextResponse.json({ data: {} });
}
