"use client";

import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

function Prediction({ url }: { url?: string }) {
  const [err, setErr] = React.useState<Error | unknown>();
  const predictionReq = useSWRMutation<{ prediction: unknown }>(
    "localhost:4000/prediction",
    async (_, { arg }: { arg: { url: string } }) => {
      return await fetch('localhost:4000/prediction', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });
    }
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!url) {
      setErr("no file selected");
      return;
    }
    try {
      await predictionReq.trigger({ url });
    } catch (e) {
      setErr(e);
    }
  };

  const prediction = predictionReq.data?.prediction;

  return (
    <>
      <button disabled={!url} type="submit" onClick={handleSubmit}>
        Predict
      </button>
      {prediction && <div>Prediction: {prediction}</div>}
      {err && <span style={{ color: "red" }}>{JSON.stringify(err)}</span>}
    </>
  );
}

export default function HotdogNotHotdog() {
  const router = useRouter();
  const [, startTransition] = React.useTransition();
  const [selectedFile, setSelectedFile] = React.useState<File>();
  const [err, setErr] = React.useState<Error | unknown>();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setErr("no file found");
    }
  }

  const uploadReq = useSWRMutation(
    "/api/upload-s3",
    async (_, { arg }: { arg: { file: File } }) => {
      const data = new FormData();
      data.append("file", arg.file);
      return await fetch("/api/upload-s3", {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      });
    }
  );

  // const isMutating = isPending || req.isMutating;
  const previewUrl = uploadReq.data?.url;

  async function uploadFile() {
    if (!selectedFile) {
      setErr("no file selected");
      return;
    }
    try {
      await uploadReq.trigger({ file: selectedFile });
    } catch (e) {
      setErr(e);
    }
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Possible Hotdog Identifier
          </h1>
          <form onSubmit={uploadFile}>
            <div className="flex flex-col mb-4">
              <label htmlFor="file" className="font-medium text-gray-700 mb-2">
                Choose File
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center"
                >
                  {selectedFile ? selectedFile.name : "Select a file"}
                </label>
              </div>
            </div>
            {previewUrl && (
              <div className="mb-4">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full h-auto"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
              disabled={!selectedFile}
            >
              Upload image
            </button>
            <Prediction url={previewUrl} />
          </form>
        </div>
      </div>
      {err && <span style={{ color: "red" }}>{JSON.stringify(err)}</span>}
    </>
  );
}
