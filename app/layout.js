import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Apeksha",
  description: "Apeksha - St. Martin's Engineering College",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={bricolage.variable}>
      {" "}
      {/* ✅ put it here */}
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
