import { ImageOff } from "lucide-react";

export default function ImageNotFound() {
  return (
    <div className="absolute bg-secondary rounded-md top-0 left-0 w-full h-full flex flex-col gap-3 items-center justify-center">
      <ImageOff size={45} />
      <p>Image not found</p>
    </div>
  );
}
