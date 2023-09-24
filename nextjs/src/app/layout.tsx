import "./globals.css";
import { Raleway, Merriweather_Sans, Poppins, Aboreto } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin-ext"],
  variable: "--body-font",
  weight: ["400", "700"],
});

const aboreto = Aboreto({
  subsets: ["latin-ext"],
  variable: "--display-font",
  weight: ["400"],
});

export const metadata = {
  title: "Wordpress headless with Next.js",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${aboreto.variable}`}>
        {children}
      </body>
    </html>
  );
}
