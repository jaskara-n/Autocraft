import type { Metadata } from "next";
import "./globals.css";
import { Ubuntu } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Provider } from "./Provider";

const ubuntu = Ubuntu({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abctshirts",
  description: "Premium T-shirts",
};

export default function RootLayout({
  children,
  customClassName,
}: {
  children: React.ReactNode;
  customClassName?: string;
}) {
  return (
    <html lang="en">
      <Provider>
        <body className={ubuntu.className}>
          <main className={customClassName}>
            <div className="bg-bg_primary h-screen flex flex-col relative overflow:hidden">
              <Navbar />
              {children}
            </div>

            <Footer />
          </main>
        </body>
      </Provider>
    </html>
  );
}
