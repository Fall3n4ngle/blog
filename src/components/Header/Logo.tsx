import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <h1 className="text-2xl sm:text-3xl font-bold font-title">DevBlog</h1>
    </Link>
  );
}
