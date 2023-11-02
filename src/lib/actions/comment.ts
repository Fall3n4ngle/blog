import { safeParse } from "valibot";
import { postComment } from "../api/postComment";
import { feedbackSchema } from "../validations/feedback";
import { formatIssues } from "../utils/formatIssues";

export const comment = async (formData: FormData, post: string) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const content = formData.get("content");

  const result = safeParse(feedbackSchema, { name, email, content });

  if (result.success) {
    try {
      const { output } = result;

      const data = await postComment({ ...output, post });
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
