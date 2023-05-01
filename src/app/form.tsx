"use client";

import { Button } from "@/components/button";
import Input from "@/components/input";
import { getInputByFormElement } from "@/utils/get-input";
import { toast } from "react-hot-toast";

export function Form() {
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
      document.location.href = "/home";
    } catch (e) {
      console.error(e);
      toast.error("Failed to log in");
    }
  }

  return (
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
          placeholder="aoc.bsky.social"
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

      <p className="text-gray-400 mt-1 text-sm">
        * Service currently hardcoded to https://bsky.social
      </p>
    </form>
  );
}
