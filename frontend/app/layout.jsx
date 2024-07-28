import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "next-client-cookies/server";

const monsterrat = Montserrat({
    subsets: ["latin"],
});

export const metadata = {
    title: "Nettoyer Shoes",
    description: "Nettoyer Shoes | Cuci Sepatu Malang",
};

export const viewport = {
    width: 'device-width',
    initialScale: 1.0,
    height: 'device-height'
    // Also supported by less commonly used
    // interactiveWidget: 'resizes-visual',
  }

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
         
            <body className={`${monsterrat.className} bg-[#E1EAF3]`}>
                <Toaster />
                <main>
                <CookiesProvider>{children}</CookiesProvider>
                </main>
            </body>
        </html>
    );
}
