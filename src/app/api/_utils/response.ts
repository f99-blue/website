import { NextResponse } from "next/server";

export const COMMON_RESPONSE = {
  noValidSession: NextResponse.json(
    {
      error: "No valid session",
    },
    { status: 401 }
  ),
} as const;

export function getInvalidBodyPropertyResponse(
  key: string,
  expectedType: string
) {
  return NextResponse.json(
    {
      error: `Expected body property "${key}" to be of type ${expectedType}`,
    },
    { status: 400 }
  );
}
