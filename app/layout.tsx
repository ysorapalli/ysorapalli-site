import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Noto_Sans_Devanagari, Noto_Sans_Kannada, Noto_Sans_Telugu } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Only used for the greetings in Correspondence.
const deva = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: "500", variable: "--font-deva", display: "swap", preload: false });
const telugu = Noto_Sans_Telugu({ subsets: ["telugu"], weight: "500", variable: "--font-telugu", display: "swap", preload: false });
const kannada = Noto_Sans_Kannada({ subsets: ["kannada"], weight: "500", variable: "--font-kannada", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · A portfolio`, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · A portfolio`,
    description: site.description,
    images: [{ url: "/images/YashasviSorapalliPic-optimized.jpg", width: 1774, height: 1774, alt: `Portrait of ${site.name}` }],
  },
  twitter: { card: "summary", title: `${site.name} · A portfolio`, description: site.description },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E9E4D9" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0F12" },
  ],
};

// Runs before paint so the page never flashes the wrong theme.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${deva.variable} ${telugu.variable} ${kannada.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
