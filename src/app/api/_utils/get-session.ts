import { AtpSessionData } from "@atproto/api";
import { cookies } from "next/headers";

export function getSession() {
  try {
    return cookies().get("session")?.value
      ? (JSON.parse(cookies().get("session")!.value) as AtpSessionData)
      : null;
  } catch {
    return null;
  }
}
