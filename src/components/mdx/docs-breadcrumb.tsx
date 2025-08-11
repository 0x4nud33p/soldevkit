import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export const DocsBreadcrumb = ({ slug }: { slug?: string[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>

        {slug &&
          slug.length > 0 &&
          slug.map((item, index) => (
            <React.Fragment key={item}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className={cn(
                    "capitalize",
                    index === slug.length - 1 && "text-foreground",
                  )}
                  href={
                    index === slug.length - 1 ? `/docs/${slug.join("/")}` : `#`
                  }
                >
                  {item.replace(/-/g, " ")}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
