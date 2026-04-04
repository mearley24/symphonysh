import { Phone } from "lucide-react";

const TEL = "tel:+19705193013";

/**
 * Floating call button for small screens only (header phone is primary on desktop).
 */
const MobileClickToCall = () => {
  return (
    <a
      href={TEL}
      className="md:hidden fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 ring-2 ring-black/20 transition hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label="Call Symphony Smart Homes"
    >
      <Phone className="h-6 w-6" strokeWidth={2} />
    </a>
  );
};

export default MobileClickToCall;
