import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import Comment from "./Comment";

type Props = {
  comments: TComment[];
  title: string;
  noCommentsMessage: string;
};

export default function CommentsCard({
  comments,
  title,
  noCommentsMessage,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {comments.length} {title}
        </CardTitle>
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
            : noCommentsMessage}
        </div>
      </CardContent>
    </Card>
  );
}
