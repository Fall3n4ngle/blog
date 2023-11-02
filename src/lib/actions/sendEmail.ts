import { safeParse } from "valibot";
import { feedbackSchema } from "../validations/feedback";
import { Resend } from "resend";
import ContactFormEmail from "@/emails/ContactFormEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const content = formData.get("content");

  const result = safeParse(feedbackSchema, { name, email, content });

  if (result.success) {
    const { content, email, name } = result.output;

    try {
      const data = await resend.emails.send({
        from: process.env.EMAIL_DOMAIN!,
        to: process.env.AUTHOR_EMAIL!,
        subject: "Contact form submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${content}`,
        react: ContactFormEmail({ name, email, content })
      });

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  } else {
    const formattedIssues = result.issues
      .map((issue) => issue.message)
      .join(", ");

    return { success: false, error: formattedIssues };
  }
};
