import { Link } from "react-router-dom";
import { ArrowRight, Camera } from "lucide-react";
import { proofSets, type ProofSetKey, type ProofPhoto } from "../data/projectProof";

type Props = {
  setKey: ProofSetKey;
  /** Override headline if the page wants a tighter angle. */
  headline?: string;
  /** Override subhead if the page wants a tighter angle. */
  subhead?: string;
  /** Optional override for the section eyebrow. Defaults to "Recent Work". */
  eyebrow?: string;
  /** Limit to first N photos (useful for tight pages). */
  limit?: number;
  /** Render against the lighter alternating section background. */
  variant?: "dark" | "light";
  /** Footer link — defaults to /projects unless overridden or hidden. */
  footerLink?: { to: string; label: string } | null;
};

const ProofCard = ({ photo }: { photo: ProofPhoto }) => {
  const inner = (
    <>
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>
      <div className="p-4">
        <p className="text-white/85 text-sm font-medium leading-snug">
          {photo.caption}
        </p>
      </div>
    </>
  );

  const baseClasses =
    "group relative flex flex-col rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm overflow-hidden shadow-lg shadow-black/20";

  if (photo.projectSlug) {
    return (
      <Link
        to={`/projects/${photo.projectSlug}`}
        className={`${baseClasses} hover:border-accent/30 transition-all duration-200`}
        aria-label={`View ${photo.caption} project`}
      >
        {inner}
      </Link>
    );
  }

  return <div className={baseClasses}>{inner}</div>;
};

/**
 * Visual proof strip — small, captioned grid of real Symphony project
 * photos. Uses only photos already in /public/lovable-uploads/. If the
 * referenced proof set has zero photos, the section renders nothing.
 *
 * Designed to drop into existing service / platform pages between content
 * sections without changing surrounding layout. Cards link to real project
 * pages so the visitor can see the full set.
 */
const ProjectProof = ({
  setKey,
  headline,
  subhead,
  eyebrow = "Recent Work",
  limit,
  variant = "dark",
  footerLink,
}: Props) => {
  const set = proofSets[setKey];
  if (!set || set.photos.length === 0) return null;

  const photos = limit ? set.photos.slice(0, limit) : set.photos;

  // The site's two repeating section backgrounds — match whichever the
  // surrounding page is alternating away from.
  const sectionBg =
    variant === "dark"
      ? "bg-black/15 backdrop-blur-sm border-y border-white/5"
      : "bg-black/20 backdrop-blur-sm border-y border-white/5";

  // Default footer link: a tighter "see all <category>" hook. Pages can
  // override or pass null to hide.
  const resolvedFooter =
    footerLink === null
      ? null
      : footerLink ?? { to: "/projects", label: "Browse every project" };

  // Adaptive grid: 4 columns on desktop when 4+ photos, 3 otherwise.
  const gridCols =
    photos.length >= 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : photos.length === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2";

  return (
    <section className={`py-16 sm:py-24 px-4 sm:px-6 ${sectionBg}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2 inline-flex items-center gap-2">
            <Camera className="w-3.5 h-3.5" />
            {eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {headline ?? set.headline}
          </h2>
          <p className="text-white/55 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            {subhead ?? set.subhead}
          </p>
        </div>

        <div className={`grid ${gridCols} gap-4 sm:gap-5`}>
          {photos.map((photo) => (
            <ProofCard key={photo.src} photo={photo} />
          ))}
        </div>

        {resolvedFooter && (
          <div className="text-center mt-8">
            <Link
              to={resolvedFooter.to}
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
            >
              {resolvedFooter.label} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectProof;
