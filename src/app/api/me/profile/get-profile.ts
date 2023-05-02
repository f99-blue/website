import { getAgent } from "../../_utils/get-agent";

export async function getProfile() {
  const agent = await getAgent();
  if (!agent) return null;

  return (await agent.getProfile({ actor: agent.session!.did })).data;
}
