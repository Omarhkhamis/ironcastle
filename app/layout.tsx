import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import prisma from "../lib/prisma";

const SITE_URL = "https://www.ironcastleuae.com";
const DEFAULT_META_TITLE = "Iron Castle UAE | Industrial Steel & Aluminum Fabrication";
const DEFAULT_META_DESCRIPTION =
  "Iron Castle UAE delivers precision steel and aluminum fabrication, installation, and industrial metal works for ambitious projects across the Emirates.";
const DEFAULT_KEYWORDS = [
  "Iron Castle UAE",
  "Iron Castle Metal Industries",
  "steel fabrication UAE",
  "aluminum fabrication UAE",
  "industrial metal fabrication",
  "structural steel contractors",
  "custom metal works",
  "Sharjah metal industries",
  "precision metal installation",
  "operations hub"
];
const DEFAULT_IMAGE = "/logo.png";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

function toAbsoluteUrl(path?: string | null) {
  if (!path) return `${SITE_URL}${DEFAULT_IMAGE}`;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function keywordsArray(value?: string | null) {
  if (!value) return DEFAULT_KEYWORDS;
  const list = value
    .split(/[,\\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
  return list.length ? list : DEFAULT_KEYWORDS;
}

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.setting.findFirst();
  const title = setting?.seoTitle || DEFAULT_META_TITLE;
  const description = setting?.seoDescription || DEFAULT_META_DESCRIPTION;
  const keywords = keywordsArray(setting?.seoKeywords);
  const image = toAbsoluteUrl(setting?.seoImageUrl);
  const siteName = setting?.siteName || "Iron Castle UAE";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s | Iron Castle UAE"
    },
    description,
    keywords,
    alternates: {
      canonical: SITE_URL
    },
    openGraph: {
      type: "website",
      url: SITE_URL,
      siteName,
      title,
      description,
      images: [
        {
          url: image,
          width: 1024,
          height: 512,
          alt: siteName
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    },
    robots: {
      index: true,
      follow: true
    },
    icons: {
      icon: "/favicon.png"
    }
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setting = await prisma.setting.findFirst();
  const siteName = setting?.siteName || "Iron Castle UAE";
  const contactEmail = setting?.contactEmail || "info@ironcastle.ae";
  const phone = setting?.phone || "+971 52 230 6357";
  const address = setting?.address || "Al Sajaa Industrial, Sharjah, UAE";
  const logo = toAbsoluteUrl(setting?.logoUrl);

  const defaultOrganization = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    name: siteName,
    url: SITE_URL,
    logo,
    description: DEFAULT_META_DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: contactEmail,
      telephone: phone
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Sharjah",
      addressCountry: "AE"
    }
  };

  const jsonLd = setting?.seoJsonLd?.trim() || JSON.stringify(defaultOrganization);

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="icon" href="/favicon.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body className={poppins.className} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
