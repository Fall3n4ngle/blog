import FeedbackForm from "./FeedbackForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

type Props = {
  action: (data: FormData) => Promise<ServerActionReturnType>;
  dictionary: {
    title: string;
    form: {
      comment: {
        label: string;
        placeholder: string;
      };
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      successMessage: string;
      errorMessage: string;
      buttonLabel: string;
    };
  };
};

export default function FeedbackFormCard({
  dictionary: { title, form },
  action,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <FeedbackForm action={action} dictionary={form} />
      </CardContent>
    </Card>
  );
}
