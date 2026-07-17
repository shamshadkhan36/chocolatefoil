import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/shop-context";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChocolateFoil.com | Luxury Chocolate & Confectionery Packaging",
  description: "Experience premium food-grade aluminium foils, wrappers, and bespoke packaging boxes for artisanal chocolates. Custom printing available worldwide.",
  keywords: ["chocolate foil", "custom printing foil", "candy wrapper", "luxury packaging", "aluminium foil roll", "confectionery wraps"],
  openGraph: {
    title: "ChocolateFoil.com | Premium Packaging Solutions",
    description: "Elegant, luxurious, food-safe chocolate packaging materials with global shipping.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased bg-cream-bg text-chocolate-dark transition-colors duration-300">
        <ShopProvider>
          {children}
        </ShopProvider>
      </body>
    </html>
  );
}
