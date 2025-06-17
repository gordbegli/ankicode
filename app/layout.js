import { Inter } from "next/font/google";
import "./globals.css";
import WelcomeMessage from "./components/WelcomeMessage";
import { PostHogProvider } from "./components/PostHogProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'AnkiCode',
  description: 'Learn data structures through spaced repetition',
  metadataBase: new URL('https://ankicode.com'), 
  openGraph: {
    title: 'AnkiCode',
    description: 'Learn data structures through spaced repetition',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PostHogProvider>
          <WelcomeMessage />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}