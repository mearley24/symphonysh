import { Link } from "react-router-dom";
import { Phone, Calendar } from "lucide-react";
import { trackPhoneClick } from "../utils/tracking";

/**
 * Always-visible bottom action bar on mobile only.
 * Hidden at sm: breakpoint and up — desktop has the header CTA + footer.
 * Two equal-width tap targets, large enough for one-handed phone use,
 * including older clients. 64px tall to clear iOS home indicator naturally.
 */
const StickyMobileCTA = () => {
  return (
    <div
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-lg border-t border-white/10 pb-safe"
      role="navigation"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-2 gap-px bg-white/10">
        <a
          href="tel:+19705193013"
          onClick={trackPhoneClick}
          className="flex items-center justify-center gap-2 bg-black/80 text-white font-semibold py-4 text-sm active:bg-white/5 transition-colors"
        >
          <Phone className="w-4 h-4 text-accent" />
          Call
        </a>
        <Link
          to="/scheduling"
          className="flex items-center justify-center gap-2 bg-accent text-white font-semibold py-4 text-sm active:bg-accent/90 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          Schedule
        </Link>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
