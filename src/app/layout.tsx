import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Lato } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./NextAuthProvider";
import ReduxProvider from "./ReduxProvider";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dentist Booking",
  description: "2110507 Final Project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession();

  return (
    <html lang="en">
      <body className={`${lato.className} h-screen w-screen`}>
        <ReduxProvider>
          <NextAuthProvider session={nextAuthSession}>
            <div className="absolute -z-10 h-[30vh] w-full overflow-hidden bg-gradient-to-b from-[#F1E9F5] to-transparent" />
            <NavBar />
            {children}
            <Footer />
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
