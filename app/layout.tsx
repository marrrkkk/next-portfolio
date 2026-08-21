import type { Metadata } from "next";
import { Inter } from "next/font/google";
import siteData from "@/data.json";
import "./globals.css";

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mark.requo.app",
);

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteData.site.title,
    template: `%s | ${siteData.site.name}`,
  },
  description: siteData.site.description,
  keywords: [
    "Mark Louie Alvarez",
    "software engineer",
    "fullstack developer",
    "web developer Philippines",
    "Next.js developer",
    "React developer",
    "TypeScript developer",
  ],
  authors: [{ name: siteData.site.name, url: siteUrl.toString() }],
  creator: siteData.site.name,
  publisher: siteData.site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "/",
    siteName: siteData.site.name,
    title: siteData.site.title,
    description: siteData.site.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteData.site.name} - Software Engineer portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteData.site.title,
    description: siteData.site.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { email: false, telephone: false, address: false },
  icons: {
    icon: "/favicon-avatar.png",
    apple: "/favicon-avatar.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteData.site.name,
    url: siteUrl.toString(),
    image: new URL(siteData.site.avatar, siteUrl).toString(),
    jobTitle: "Software Engineer",
    description: siteData.site.description,
    email: "marklouie.dev@gmail.com",
    address: { "@type": "PostalAddress", addressCountry: "PH" },
    sameAs: [
      "https://github.com/marrrkkk",
      "https://www.linkedin.com/in/marrrkkk",
    ],
    knowsAbout: [
      "Software engineering",
      "Full-stack development",
      "Next.js",
      "React",
      "TypeScript",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteData.site.name,
    url: siteUrl.toString(),
    description: siteData.site.description,
    author: { "@type": "Person", name: siteData.site.name },
  };

  return (
    <html
      lang={siteData.site.lang}
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, websiteSchema]),
          }}
        />
      </body>
    </html>
  );
}
