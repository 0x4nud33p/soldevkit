import { cn } from "@/lib/utils";

interface DocsAuthorProps {
  name: string;
  url?: string;
}

const nameClassName =
  "text-foreground underline underline-offset-2 decoration-blue-500 font-medium";

export const DocsAuthor = ({ name, url }: DocsAuthorProps) => {
  return (
    <span className={"text-sm text-fd-muted-foreground "}>
      Made by{" "}
      {url ? (
        <a
          className={cn(
            nameClassName,
            "cursor-pointer hover:decoration-foreground",
          )}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </a>
      ) : (
        <span className={nameClassName}>{name}</span>
      )}
    </span>
  );
};
