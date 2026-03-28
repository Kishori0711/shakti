import type { Metadata } from "next";
import { Montserrat, Open_Sans, Lato } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/provider";
import LanguageInitializer from "@/components/language/LanguageInitializer";
import { Toaster } from "react-hot-toast";
import { isAuthenticated } from "@/features/auth/authenticated"; 

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Shakti 2047 | India's first pathway-led career platform for ambitious women",
  description: "India's first pathway-led career platform for ambitious women.",
};

// (Optional) agar kabhi static rendering error aaye to ye add kar dena:
// export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated(); 

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} ${lato.variable}`}
    >
      <body className="antialiased">
        <ReduxProvider authed={authed}>
          <LanguageInitializer />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}