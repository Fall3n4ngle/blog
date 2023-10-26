"use server";

import { email, object, parse, string } from "valibot";
import { postComment } from "../api/postComment";

const commentSchema = object({
  name: string(),
  email: string([email()]),
  content: string(),
});

export const comment = async (formData: FormData, post: string) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const content = formData.get("content");

  const validatedData = parse(commentSchema, { name, email, content });

  const response = await postComment({ ...validatedData, post });
  return response;
};
