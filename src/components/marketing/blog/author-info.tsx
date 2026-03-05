import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

type AuthorInfoProps = {
  author: string;
  image?: string;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

export function AuthorInfo({ author, image }: AuthorInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar size="sm">
        {image && <AvatarImage src={image} alt={author} />}
        <AvatarFallback>{getInitials(author)}</AvatarFallback>
      </Avatar>
      <span className="text-sm text-foreground">{author}</span>
    </div>
  );
}
