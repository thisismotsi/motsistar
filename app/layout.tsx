import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/theme";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AffiliateSection from "./components/AffiliateSection";
import Head from "./head";
import NavigationButtons from "./components/NavigationButtons";

export const metadata = {
  title: "MOTSISTAR | Learn, Think & Thrive",
  description:
    "Access high-quality educational resources including revision notes, curriculum guides, video lessons, and personalized tutoring for IEB, Eswatini, and Cambridge learners. Empowering students in Africa and beyond to master math, science, coding, and more.",
  keywords: [
    "MOTSISTAR",
    "Education",
    "Cambridge revision notes",
    "Eswatini tutorial",
    "Examination preparation",
    "IGCSE",
    "Answer sheets",
    "Math tutorials",
    "Physics tutorials",
    "Physical science tutorials",
    "Chemistry tutorials",
    "Combined Science tutorials",
    "Additional math tutorials",
    "Mathematics tutorials",
    "Science learning",
    "Coding for students",
    "Scholarship links",
    "Academic support",
    "Online tutoring",
    "Video lessons",
    "STEM education",
    "African learners",
    "Study tools",
    "Exam preparation",
    "Concept-based learning",
    "Think and Thrive",
  ],
  metadataBase: new URL("https://www.motsistar.org"),
  openGraph: {
    title: "MOTSISTAR | Learn, Think & Thrive",
    description:
      "Explore curated study materials, video lessons, and tutoring services for IEB, Eswatini, and Cambridge. Affordable, elegant learning for Africa and beyond.",
    url: "https://www.motsistar.org",
    siteName: "MOTSISTAR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MOTSISTAR educational platform preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MOTSISTAR | Learn, Think & Thrive",
    description:
      "Study smarter with MOTSISTAR: revision notes, tutoring, and more for African learners and beyond.",
    creator: "@Motsi135733",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Head />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
      </head>
      <body>
        <ThemeProvider>
          <div className="sticky top-0 z-50 bg-white shadow-sm">
            <Navbar />
          </div>
          <main>{children}</main>
          <AffiliateSection />
          <NavigationButtons />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
