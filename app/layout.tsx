import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import type { Metadata } from "next";
import { Inter, Poppins, Noto_Sans_Ethiopic } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingChat from "@/components/FloatingChat";
import { Providers } from "@/components/Providers";
import { getGlobalSettings } from "@/lib/actions";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const notoSansEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Akirma | Event Organizer in Ethiopia",
    template: "%s | Akirma Events"
  },
  description: "Akirma is the leading event organizer in Ethiopia specializing in weddings, corporate events, and cultural celebrations. Trusted event planning in Addis Ababa and nationwide.",
  keywords: ["event organizer in ethiopia", "event planner ethiopia", "wedding planner ethiopia", "event organizer addis ababa", "habesha wedding organizer", "corporate event planner ethiopia"],
  authors: [{ name: "Akirma Team" }],
  creator: "Akirma Brands",
  publisher: "Akirma Events",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://akirma.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Akirma | Premium Event Organizer in Ethiopia",
    description: "Creating unforgettable weddings, corporate galas, and cultural celebrations across Ethiopia.",
    url: "https://akirma.com",
    siteName: "Akirma",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Akirma Logo",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akirma | Event Organizer in Ethiopia",
    description: "Unforgettable events across Ethiopia. Weddings, Corporate & Cultural.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getGlobalSettings();
  const themeClass = settings.isYellowTheme ? "theme-yellow" : "";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} ${notoSansEthiopic.variable} ${themeClass} antialiased selection:bg-primary/20 selection:text-primary`}
      >
        <LocalBusinessSchema />
        <FAQSchema />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <LanguageProvider>
              {children}
              <FloatingChat />
            </LanguageProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
