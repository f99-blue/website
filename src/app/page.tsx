"use client";

import { Area } from "@/components/area";
import { Button } from "@/components/button";
import Input from "@/components/input";
import { getInputByFormElement } from "@/utils/get-input";
import { toast } from "react-hot-toast";

export default function Home() {
  async function login(username: string, password: string) {
    try {
      const loadingToastId = toast.loading("Trying credentials");

      const res = await fetch("/api/login", {
        method: "post",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) throw new Error("");

      toast.dismiss(loadingToastId);
      toast.success("Logged in, redirecting...");
    } catch (e) {
      console.error(e);
      toast.error("Failed to log in");
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-1/2">
        <div>
          <h1 className="font-bold text-5xl">f99</h1>
          <p className="text-lg text-zinc-600">A collection of Bluesky tools</p>
        </div>

        <Area className="mt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              login(
                getInputByFormElement(e.currentTarget, "handle"),
                getInputByFormElement(e.currentTarget, "password")
              );
            }}
          >
            <label className="block">
              <span className="block mb-1">Handle</span>
              <Input
                name="handle"
                type="text"
                required
                placeholder="today.bsky.social"
              />
            </label>

            <label className="mt-4 block">
              <span className="block mb-1">App password</span>
              <Input
                name="password"
                type="password"
                required
                placeholder="bsky>twitt3r"
              />
            </label>

            <Button type="submit" className="mt-4">
              Log in
            </Button>

            <p className="text-zinc-500 mt-1 text-sm">
              * Service currently hardcoded to https://bsky.social
            </p>
          </form>
        </Area>
      </div>
    </main>
  );
}
