"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialState: IPrompt = {
  prompt: "",
  tag: "",
};

const CreatePrompt = () => {
  const [post, setPost] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          ...post,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting((prev) => !prev);
    }
  };
  return (
    <div>
      <Form
        submitting={submitting}
        post={post}
        setPost={setPost}
        handleSubmit={createPost}
        type="Create"
      />
    </div>
  );
};

export default CreatePrompt;
