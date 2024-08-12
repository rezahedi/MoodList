import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mood List Application",
  description: "Generate a Spotify's playlist based on your mood and your genre selection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="shortcut icon" href="/2257464_circle_colored_gradient_media_social_icon.png" />
      </head>
      <body className={`${inter.className} h-full`}>{children}</body>
    </html>
  );
}
