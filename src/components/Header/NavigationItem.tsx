import { cn } from "@/lib/utils/cn";
import Link from "next/link";

type Props = {
  link: string;
  active: boolean;
  label: string;
};

export default function NavigationItem({ active, label, link }: Props) {
  return (
    <Link href={link}>
      <li
        className={cn(
          "hover:text-foreground transition-all px-3 py-2 cursor-pointer text-sm",
          active && "text-foreground bg-secondary rounded-sm"
        )}
      >
        {label}
      </li>
    </Link>
  );
}
