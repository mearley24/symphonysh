import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Calendar } from "lucide-react";
import { trackPhoneClick } from "../utils/tracking";

const TEL = "tel:+19705193013";

/**
 * Sticky bottom CTA bar for mobile (<768px).
 * Appears after user scrolls past 400px (roughly past hero).
 * Slides up with a 300ms animation.
 */
const MobileClickToCall = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-[60] transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="bg-black/80 backdrop-blur-lg border-t border-white/10 px-4 py-3 flex gap-3">
        <Link
          to="/scheduling"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium text-sm rounded-lg min-h-[44px] transition-colors"
        >
          <Calendar className="w-4 h-4" />
          Schedule
        </Link>
        <a
          href={TEL}
          onClick={trackPhoneClick}
          className="flex-1 inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-medium text-sm rounded-lg min-h-[44px] transition-colors"
          aria-label="Call Symphony Smart Homes"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
      </div>
    </div>
  );
};

export default MobileClickToCall;
