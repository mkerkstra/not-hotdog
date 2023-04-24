"use client";

import React, { useTransition } from "react";

import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

import { Button } from "@kerk/ui";

async function sendReq(url: string, { arg }: { arg: { name: string } }) {
  return await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
}

export default function UserUi() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = React.useState("");
  const [err, setErr] = React.useState<unknown>();
  const req = useSWRMutation("/api/user", sendReq);

  const isMutating = isPending || req.isMutating;

  async function updateUser() {
    if (!name) {
      setErr("no name");
      return;
    }
    try {
      await req.trigger({ name });
    } catch (e) {
      setErr(e);
    }
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <>
      <input
        placeholder="name"
        onChange={(e) => {
          setName(e.target.value), setErr("");
        }}
        className="bg-slate-500"
      />
      <Button onClick={updateUser} disabled={isMutating}>
        {isMutating ? "..." : "Submit"}
      </Button>
      {err && <text style={{ color: "red" }}>{JSON.stringify(err)}</text>}
    </>
  );
}
