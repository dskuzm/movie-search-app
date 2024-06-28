import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Movie search app",
  description: "A movie search application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
