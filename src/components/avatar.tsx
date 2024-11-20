import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export function AvatarStub({ name, image }: { name: string; image: string }) {
  return (
    <Avatar className="h-8 w-8 rounded-lg">
      <AvatarImage src={image} alt={name} />
      <AvatarFallback className="rounded-lg">
        {name
          .split(" ")
          .flatMap((e) => e[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}
