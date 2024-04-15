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

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${monsterrat.className} bg-[#E1EAF3]`}>
                <Toaster />
                <CookiesProvider>{children}</CookiesProvider>
            </body>
        </html>
    );
}
