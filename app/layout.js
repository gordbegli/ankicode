import { Inter } from "next/font/google";
import "./globals.css";
import MobileBlocker from "./components/MobileBlocker";
import WelcomeMessage from "./components/WelcomeMessage";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AnkiCode",
  description: "AnkiCode",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MobileBlocker />
        <WelcomeMessage />
        {children}
      </body>
    </html>
  );
}