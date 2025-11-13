import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

interface IProps {
      children: ReactNode
}

export default function CommonLayout({ children }: IProps) {
      return (
            <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <div className="grow container mx-auto px-4 md:px-6">{children}</div>
                  <Footer />
                  <ScrollToTop />
            </div>
      )
}
