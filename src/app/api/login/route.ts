import { BskyAgent } from "@atproto/api";
import { NextResponse } from "next/server";
import { getSession } from "../_utils/get-session";

export async function GET(_request: Request) {
  return new Response(getSession()?.handle);
}

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json(
      { error: "Expected `username` and `password`" },
      { status: 400 }
    );
  }

  const agent = new BskyAgent({
    service: "https://bsky.social",
  });

  await agent.login({
    identifier: username,
    password,
  });

  if (!agent.hasSession) {
    return NextResponse.json(
      { error: "Wrong credentials" },
      {
        status: 401,
      }
    );
  }

  return NextResponse.json(
    {
      data: {},
    },
    {
      headers: new Headers({
        "Set-Cookie": `session=${JSON.stringify(agent.session)}; Path=/`,
      }),
    }
  );
}
