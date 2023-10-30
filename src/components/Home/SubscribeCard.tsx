import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import SubscribeForm from "./SubscribeForm";

type Props = {
  dictionary: {
    title: string;
    description: string;
    subscribeForm: {
      label: string;
      buttonLabel: string;
      successMessage: string;
    };
  };
};

export default function SubscribeCard({
  dictionary: { description, subscribeForm, title },
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-title">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <SubscribeForm dictionary={subscribeForm} />
      </CardContent>
    </Card>
  );
}
