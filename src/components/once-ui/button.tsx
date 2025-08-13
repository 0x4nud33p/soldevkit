// "use client";

// import React, { forwardRef } from "react";
// import { OnceUIProvider } from "./once-ui-provider";
// import { Button } from "@once-ui-system/core";
// import "@/app/solana-ui.css";

// // Simple interface that accepts all Button props
// interface SimpleButtonProps {
//   children: React.ReactNode;
//   [key: string]: any; // Allow any additional props
// }

// const SimpleButton = forwardRef<HTMLButtonElement, SimpleButtonProps>(
//   ({ children, ...props }, ref) => {
//     return (
//       <OnceUIProvider>
//         <Button ref={ref} {...props}>
//           {children}
//         </Button>
//       </OnceUIProvider>
//     );
//   },
// );

// SimpleButton.displayName = "SimpleButton";
// export { SimpleButton };
