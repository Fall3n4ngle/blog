"use server";

import { string, email, safeParse } from "valibot";
import { postSubscribe } from "../api/postSubscribe";
import { formatIssues } from "../utils/formatIssues";

const emailSchema = string([email()]);

export const subscribe = async (
  formData: FormData
): Promise<ServerActionReturnType> => {
  const email = formData.get("email");
  const result = safeParse(emailSchema, email);

  if (result.success) {
    const validatedEmail = result.output;

    try {
      const data = await postSubscribe({ email: validatedEmail });
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  } else {
    return { success: false, error: formatIssues(result.issues) };
  }
};
