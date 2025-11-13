import { ArrowUpFromDotIcon } from "lucide-react";
import { useEffect, useState } from "react"

export default function ScrollToTop() {
      const [isVisible, setIsVisible] = useState(false);

      const scrollToTop = () => {
            window.scrollTo({
                  top: 0,
                  behavior: "smooth"
            })
      };

      useEffect(() => {
            const toggleVisibility = () => {
                  if (window.scrollY > 300) setIsVisible(true);
                  else setIsVisible(false);
            };
            window.addEventListener("scroll", toggleVisibility);
            return () => window.removeEventListener("scroll", toggleVisibility);
      }, [])


      return (
            <div className="fixed right-3 bottom-3 animate-bounce">
                  {isVisible && <button onClick={scrollToTop} className="w-8 h-8 rounded-full bg-sidebar-primary text-white flex items-center justify-center cursor-pointer">
                        <ArrowUpFromDotIcon size={18} />
                  </button>}
            </div>
      )
}
