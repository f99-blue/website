import { Area } from "@/components/area";
import { redirect } from "next/navigation";
import { getProfile } from "../api/me/profile/get-profile";
import { CommonFollowsArea } from "./common-follows-area";
import { ProfileArea } from "./profile-area";

export default async function Home() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/");
  }

  return (
    <main className="p-4 md:p-8">
      <div className="md:-mx-4 flex flex-wrap items-stretch">
        <div className="md:px-2 w-full md:w-1/3">
          <ProfileArea profile={profile} area={{ className: "h-full" }} />
        </div>

        <div className="md:px-2 mt-4 md:mt-0 w-full md:w-2/3">
          <CommonFollowsArea area={{ className: "h-full" }} />
        </div>

        <div className="md:px-2 mt-4 w-full">
          <Area>More to come :)</Area>
        </div>
      </div>
    </main>
  );
}
