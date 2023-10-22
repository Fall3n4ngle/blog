import { Badge } from "@/components/ui";

type Props = {
  categories: Category[];
};

export default function Filter({ categories }: Props) {
  return (
    <div className="flex items-center gap-3">
      {categories.map((category) => (
        <Badge key={category.id} variant="secondary">
          {category.attributes.name}
        </Badge>
      ))}
    </div>
  );
}
