import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  fallback: ["system-ui", "arial", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  fallback: ["system-ui", "arial", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  fallback: ["Consolas", "Monaco", "monospace"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://adityalabs.com"),

  title: {
    default: "Aditya Labs | AI Automation, SaaS & Software Development Agency",
    template: "%s | Aditya Labs",
  },

  description:
    "Aditya Labs helps businesses automate operations, generate leads, improve customer support, and scale faster with AI Agents, WhatsApp Automation, SaaS Platforms, Websites, Mobile Apps, CRM Integrations, and Custom Software Solutions.",

  keywords: [
    "Aditya Labs",
    "AI Agency",
    "AI Automation",
    "AI Agents",
    "AI Chatbots",
    "WhatsApp Automation",
    "WhatsApp AI",
    "CRM Integration",
    "Lead Generation Automation",
    "Business Automation",
    "Workflow Automation",
    "Custom Software Development",
    "SaaS Development",
    "Web Development",
    "Mobile App Development",
    "Next.js Development",
    "React Development",
    "TypeScript",
    "n8n Automation",
    "Vapi AI",
    "Voice AI Agents",
    "Customer Support AI",
    "Sales Automation",
    "AI Solutions",
    "Generative AI",
    "RAG Systems",
    "AI Consulting",
    "AI Development Company",
  ],

  authors: [
    {
      name: "Aditya Kumar",
      url: "https://adityalabs.com",
    },
  ],

  creator: "Aditya Labs",
  publisher: "Aditya Labs",

  icons: {
    icon: "/aditya-lab-logo.png",
    shortcut: "/aditya-lab-logo.png",
    apple: "/aditya-lab-logo.png",
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

  openGraph: {
    title: "Aditya Labs | AI Automation & Software Development Agency",
    description:
      "Build AI-powered businesses with Aditya Labs. We create AI Agents, WhatsApp Automation, SaaS Platforms, Mobile Apps, Websites, CRM Integrations, and Enterprise Automation Systems.",
    url: "https://adityalabs.com",
    siteName: "Aditya Labs",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aditya Labs",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aditya Labs | AI Automation & Software Development Agency",
    description:
      "AI Agents, WhatsApp Automation, SaaS Development, Mobile Apps, CRM Integration, and Business Automation Solutions.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://adityalabs.com",
  },

  category: "Technology",
};
// export const metadata: Metadata = {
//   title: "Aditya Labs — Premium SaaS & AI Agency",
//   description:
//     "Aditya Labs is a premium, developer-led SaaS engineering and AI-integration agency. We build, launch, and scale sophisticated SaaS products with AI at their core.",
//   keywords: [
//     "Aditya Labs",

//     "SaaS Development",
//     "AI Integration",
//     "Product Engineering",
//     "Agency",
//     "Next.js",
//     "React",
//     "TypeScript",
//   ],
//   authors: [{ name: "Aditya Kumar" }],
//   icons: {
//     icon: "/aditya-lab-logo.png",
//   },
//   openGraph: {
//     title: "Aditya Labs — Premium SaaS & AI Agency",
//     description:
//       "We build, launch, and scale sophisticated SaaS products with AI at their core.",
//     siteName: "Aditya Labs",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Aditya Labs — Premium SaaS & AI Agency",
//     description:
//       "We build, launch, and scale sophisticated SaaS products with AI at their core.",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
          __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Aditya Labs",
        url: "https://adityalabs.com",
        logo: "https://adityalabs.com/aditya-lab-logo.png",
        description:
          "AI Automation, SaaS Development, Web Development, Mobile Apps, AI Agents, WhatsApp Automation, CRM Integration and Business Automation Solutions.",
        founder: {
          "@type": "Person",
          name: "Aditya Kumar",
        },
        sameAs: [
          "https://linkedin.com/company/adityalabs",
          "https://github.com/adityalabs",
          "https://x.com/adityalabs"
        ],
          }),
        }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-dark text-white selection:bg-brand selection:text-white`}
      >
        <Providers>
          {children}
        </Providers>
        <Toaster richColors position="top-right" />
      </body>
      </html>
  );
}
