import { NextResponse } from "next/server";
import { COMMON_RESPONSE } from "../../_utils/response";
import { getProfile } from "./get-profile";

export async function GET(_request: Request) {
  const profile = await getProfile();
  if (!profile) return COMMON_RESPONSE.noValidSession;

  return NextResponse.json({
    data: {
      profile,
    },
  });
}
