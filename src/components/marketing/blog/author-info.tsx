import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AuthorInfo({ author, image }: { author: string; image?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Avatar className="size-7">
        <AvatarImage src={image} alt={author} />
        <AvatarFallback className="bg-transparent border text-xs">
          {author
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="font-mono text-xs">{author}</span>
    </div>
  );
}
