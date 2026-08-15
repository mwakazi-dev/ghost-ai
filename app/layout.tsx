import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghost AI",
  description: "Real-time collaborative system design, powered by AI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          appearance={{
            theme: dark,
            variables: {
              colorBackground: "var(--bg-surface)",
              colorForeground: "var(--text-primary)",
              colorMutedForeground: "var(--text-secondary)",
              colorInput: "var(--bg-elevated)",
              colorInputForeground: "var(--text-primary)",
              colorPrimary: "var(--accent-primary)",
              colorDanger: "var(--state-error)",
              colorSuccess: "var(--state-success)",
              borderRadius: "var(--radius)",
              fontFamily: "Geist, system-ui, sans-serif",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
