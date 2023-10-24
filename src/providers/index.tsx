import { PropsWithChildren } from "react";
import { ThemeProvider } from "./Theme";
import { Toaster } from "./Toaster";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster/>
    </ThemeProvider>
  );
}
