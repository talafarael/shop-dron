import localFont from "next/font/local";
import "../app/globals.scss";
import "./layout.scss";
import Header from "./Header/header";

import Menu from "./Menu/menu";
import {  Suspense, useState } from "react";
import Load from "./Load";


// const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const geistSemiBold = localFont({
  src: "../app/fonts/IBM_Plex_Sans/IBMPlexSans-Bold.ttf",
  variable: "--font-semi-bold",
  weight: "100 900",
});
const geistMontserrat = localFont({
  src: "../app/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  weight: "100 900",
});
export default function Layout({
  children,
  boolMenu,
}: {
  children: React.ReactNode;
  boolMenu: boolean;
}) {
  const [activeMenu, setActiveMenu] = useState<boolean>(false);

  return (
    <div
      className={` conatiner ${geistMontserrat.variable} ${geistSemiBold.variable} ${geistMono.variable} ${geistSans.variable}`}
    >
      <Header  boolMenu={boolMenu} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="body">
        {boolMenu ? <Menu activeMenu={activeMenu} /> : null}
        <Suspense fallback={<Load />}>
         
          {children}
        </Suspense>
      </div>
    </div>
  );
}
