"use server";

import { string, email, parse } from "valibot";
import { postSubscribe } from "../api/postSubscribe";

const emailSchema = string([email()]);

export const subscribe = async (formData: FormData) => {
  const email = formData.get("email");
  const validatedEmail = parse(emailSchema, email);
  await postSubscribe({ email: validatedEmail });
};
