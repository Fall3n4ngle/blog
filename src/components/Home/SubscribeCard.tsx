import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import SubscribeForm from "./SubscribeForm";

export default function SubscribeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-title">Subscribe</CardTitle>
        <CardDescription>
          Receive an email notification whenever a new post is published
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SubscribeForm />
      </CardContent>
    </Card>
  );
}
