import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import CookieConsent from "@/components/CookieConsent";
import {Suspense} from "react";
import {CookiesProvider} from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to AIESEC",
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
      <body className={`flex ${inter.className} h-full w-full min-h-screen min-w-screen flex-col`}>
          <CookiesProvider>
              <MantineProvider>
                  <CookieConsent/>
                  <Suspense>
                      {children}
                  </Suspense>
              </MantineProvider>
          </CookiesProvider>
      </body>
    </html>
  );
}
