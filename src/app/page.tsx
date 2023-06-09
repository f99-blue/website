import { Area } from "@/components/area";
import { redirect } from "next/navigation";
import { getProfile } from "./api/me/profile/get-profile";
import { Form } from "./form";

export default async function Home() {
  const profile = await getProfile();

  if (profile && process.env.NODE_ENV !== "development") {
    redirect("/home");
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <div className="w-[40rem] max-w-full">
        <div>
          <h1 className="text-3xl sm:text-5xl">f99</h1>
          <p className="text-lg text-gray-300">Your new Bluesky dashboard.</p>
        </div>

        <Area className="mt-4">
          <Form />
        </Area>
      </div>
    </main>
  );
}
