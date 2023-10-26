import { getDate } from "@/lib/utils/getDate";

type Props = {
  name: string;
  publishedAt: string;
  content: string;
};

export default function Comment({ content, name, publishedAt }: Props) {
  const date = getDate(publishedAt);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-semibold">{name}</span>
        <span className="text-sm text-muted-foreground">{date}</span>
      </div>
      <p className="leading-7 text-sm text-muted-foreground">{content}</p>
    </div>
  );
}
