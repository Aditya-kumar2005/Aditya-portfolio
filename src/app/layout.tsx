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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://adityalabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

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
      url: BASE_URL,
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
    url: BASE_URL,
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
    canonical: BASE_URL,
  },

  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="w39Kz5w2njYiHg87Ja92t2_XocOtPMLGyOs9GHYrklg"
        />
	<meta name="msvalidate.01" content="5DC0DAD597EA033BB06A3761E2906656" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Aditya Labs",
              url: BASE_URL,
              logo: `${BASE_URL}/aditya-lab-logo.png`,
              description:
                "AI Automation, SaaS Development, Web Development, Mobile Apps, AI Agents, WhatsApp Automation, CRM Integration and Business Automation Solutions.",
              founder: {
                "@type": "Person",
                name: "Aditya Kumar",
                email: "mailto:adityalabs87@gmail.com",
              },
              sameAs: [
                "https://www.linkedin.com/in/aditya-kumar-b4874235b",
                "https://github.com/Aditya-kumar2005",
                "https://x.com/adityalabs",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-dark text-white selection:bg-brand selection:text-white`}
      >
        <Providers>{children}</Providers>
        <Toaster richColors position="top-right" />
      </body>
	<link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
<script type="module">
	import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

	createChat({
		webhookUrl: process.env.NEXT_PUBLIC_SITE_CHATBOT
	});
</script>
    </html>
  );
}
