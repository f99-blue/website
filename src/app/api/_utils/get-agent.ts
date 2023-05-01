import { BskyAgent } from "@atproto/api";
import { getSession } from "./get-session";

export async function getAgent() {
  const session = getSession();

  if (!session) return null;

  const agent = new BskyAgent({
    service: "https://bsky.social",
  });
  const resumedRes = await agent.resumeSession(session);

  if (!resumedRes.success) return null;
  if (!agent.session) return null;

  return agent;
}
