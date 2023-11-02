import { email, object, string } from "valibot";

export const feedbackSchema = object({
  name: string(),
  email: string([email()]),
  content: string(),
});
