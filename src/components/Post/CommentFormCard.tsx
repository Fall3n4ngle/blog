import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import CommentForm from "./CommentFrom";

type Props = {
  postId: string;
  dictionary: {
    title: string;
    commentForm: {
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
      successMessage: {
        title: string;
        description: string;
      };
      errorMessage: {
        title: string;
      };
      buttonLabel: string;
    };
  };
};

export default function CommentFormCard({
  postId,
  dictionary: { commentForm, title },
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CommentForm postId={postId} dictionary={commentForm} />
      </CardContent>
    </Card>
  );
}
