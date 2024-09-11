import localFont from "next/font/local";
import "../app/globals.scss";

import Header from "./Header/header";

// const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const geistSemiBold= localFont({
  src: "../app/fonts/IBM_Plex_Sans/IBMPlexSans-Bold.ttf",
  variable: "--font-semi-bold",
  weight: "100 900",
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${geistSemiBold.variable} ${geistMono.variable}`}>
      <Header />
      {children}
    </div>
  );
}
