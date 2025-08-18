import { docs, meta } from "../../.source";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";

export const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
});
// import { docs } from "../../.source";
// import { loader } from "fumadocs-core/source";
// import { createElement } from "react";
// import { icons } from "lucide-react";
// import { attachFile } from "@/components/hooks/attach-file";

// export const source = loader({
//   baseUrl: "/docs",
//   source: docs.toFumadocsSource(),
//   pageTree: {
//     attachFile,
//   },
//   icon(icon) {
//     if (!icon) {
//       return;
//     }

//     if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
//   },
// });
