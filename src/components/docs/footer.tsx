export const Footer = () => {
  return (
    <div className="h-14">
      <div className="rounded-full w-full h-[2px] bg-gradient-to-r dark:from-transparent dark:via-zinc-600 dark:to-transparent"></div>
      <div className="absolute z-10 bottom-0 left-0 right-0 h-[55px]">
        <div className="size-full px-4 md:px-6 flex items-center justify-end prose prose-sm text-sm text-muted-foreground">
          <p className="text-start truncate">
            Built by{" "}
            <a
              href="https://x.com/satyawani_aman"
              rel="noopener noreferrer"
              target="_blank"
            >
              Aman Satyawani
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/satyawaniaman/soldevkit"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
