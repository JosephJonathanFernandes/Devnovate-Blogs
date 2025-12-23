import { Card } from "../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";

interface BlogAuthorCardProps {
  author: { name: string; avatar?: string; bio?: string };
}

export function BlogAuthorCard({ author }: BlogAuthorCardProps) {
  return (
    <Card className="p-6 flex items-center gap-4 mb-8">
      <Avatar className="h-16 w-16">
        <AvatarImage src={author.avatar} />
        <AvatarFallback>
          {author.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-semibold text-lg">{author.name}</h3>
        <p className="text-muted-foreground text-sm">{author.bio}</p>
      </div>
    </Card>
  );
}
