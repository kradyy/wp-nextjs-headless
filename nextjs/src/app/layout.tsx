import './globals.css'
import { Raleway, Merriweather_Sans } from "next/font/google";

const raleway = Raleway({
  variable: "--display-font",
  subsets: ["latin-ext"],
});

const merriweather = Merriweather_Sans({
  variable: "--body-font",
  subsets: ["latin-ext"],
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${merriweather.variable}`}>{children}</body>
    </html>
  )
}
