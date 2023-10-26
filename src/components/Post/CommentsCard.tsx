import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import Comment from "./Comment";

type Props = {
  comments: TComment[];
};

export default function CommentsCard({ comments }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{comments.length} Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {comments.length
            ? comments.map(({ attributes, id }) => (
                <Comment
                  key={id}
                  content={attributes.content}
                  name={attributes.name}
                  publishedAt={attributes.publishedAt}
                />
              ))
            : "No Comments yet"}
        </div>
      </CardContent>
    </Card>
  );
}
