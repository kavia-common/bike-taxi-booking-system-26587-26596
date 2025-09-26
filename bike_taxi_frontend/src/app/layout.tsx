import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { AuthProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "Bike Taxi – Fast, Simple Bike Rides",
  description:
    "Book bike taxis, manage rides, and handle payments with a modern, responsive interface.",
  applicationName: "Bike Taxi",
  authors: [{ name: "Bike Taxi" }],
  generator: "Next.js",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
