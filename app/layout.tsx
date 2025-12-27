import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import StructuredData from "@/components/StructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-portfolio-domain.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mark Louie Alvarez - Full-Stack Developer & Software Engineer",
    template: "%s | Mark Louie Alvarez",
  },
  description: "Full-Stack Developer based in the Philippines. Specialized in React, Next.js, and modern web development. Building responsive web applications and full-stack solutions.",
  keywords: [
    "Mark Louie Alvarez",
    "Full-Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Portfolio",
    "Philippines Developer",
  ],
  authors: [{ name: "Mark Louie Alvarez" }],
  creator: "Mark Louie Alvarez",
  publisher: "Mark Louie Alvarez",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Mark Louie Alvarez - Full-Stack Developer & Software Engineer",
    description: "Full-Stack Developer based in the Philippines. Specialized in React, Next.js, and modern web development.",
    siteName: "Mark Louie Alvarez Portfolio",
    images: [
      {
        url: "/me.png",
        width: 1200,
        height: 630,
        alt: "Mark Louie Alvarez - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Louie Alvarez - Full-Stack Developer & Software Engineer",
    description: "Full-Stack Developer based in the Philippines. Specialized in React, Next.js, and modern web development.",
    creator: "@marrrkkk__",
    images: ["/me.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-center items-center font-regular">
        <StructuredData />
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
