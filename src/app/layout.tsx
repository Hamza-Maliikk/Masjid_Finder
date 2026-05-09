import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
// import "./background.css"
import  Navbar  from "@/components/navbar";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: "Masjid Finder",
  description: "Find the nearest masjid with our easy-to-use website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${roboto.className} min-h-full flex flex-col`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
