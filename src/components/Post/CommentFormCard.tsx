import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import CommentForm from "./CommentFrom";

type Props = {
  postId: string;
};

export default function CommentFormCard({ postId }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a comment</CardTitle>
      </CardHeader>
      <CardContent>
        <CommentForm postId={postId} />
      </CardContent>
    </Card>
  );
}
