import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIESEC Super Sign Up",
  description: "Find the perfect opportunity for you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`flex ${inter.className} h-full w-full min-h-screen min-w-screen`}>
          <MantineProvider>
              {children}
          </MantineProvider>
      </body>
    </html>
  );
}
