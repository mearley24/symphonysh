import { useState } from "react";
import { ArrowUpRight, ExternalLink, Info, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

export type ProductPreview = {
  /** Optional category label (e.g. "Keypad", "Processor"). */
  category?: string;
  /** 1-3 sentence "what it is" description. */
  description: string;
  /** Optional best-fit / use case context. */
  bestFit?: string;
  /** Optional related platform/category line ("Lighting layer · Lutron"). */
  relatedTo?: string;
  /** Optional bullet list of key facts. */
  highlights?: string[];
  /** Optional in-repo image src. Otherwise a styled placeholder is shown. */
  image?: string;
  /** Optional alt text for image. */
  imageAlt?: string;
  /** Official manufacturer page (opens in new tab). */
  officialUrl?: string;
  /** Optional walkthrough/CTA link (defaults to /scheduling). */
  ctaHref?: string;
  /** Override CTA label. */
  ctaLabel?: string;
};

export type ProductFamilyItem = {
  label: string;
  href?: string;
  /** When true, render as outbound link (target=_blank). Defaults to false (internal). */
  external?: boolean;
  /** Optional tooltip / accessible description. */
  hint?: string;
  /** When set, the pill opens an in-page preview modal instead of immediately navigating. */
  preview?: ProductPreview;
};

export type ProductFamilyGroup = {
  title: string;
  /** Optional href for the branch heading itself, when a meaningful landing page exists. */
  href?: string;
  external?: boolean;
  description?: string;
  items: ProductFamilyItem[];
};

export type ProductFamilyRoot = {
  label: string;
  sublabel?: string;
  href?: string;
  external?: boolean;
  hint?: string;
  preview?: ProductPreview;
};

type Props = {
  /** Top "processor / platform" node at the root of the map. */
  root?: ProductFamilyRoot;
  groups: ProductFamilyGroup[];
};

const pillBase =
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] sm:text-sm leading-tight transition-colors";

const Pill = ({
  item,
  onPreview,
}: {
  item: ProductFamilyItem;
  onPreview: (item: ProductFamilyItem) => void;
}) => {
  const interactiveClass =
    "border border-white/15 bg-white/[0.03] text-white/90 hover:text-white hover:border-accent/60 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70";

  if (item.preview) {
    return (
      <button
        type="button"
        onClick={() => onPreview(item)}
        title={item.hint}
        aria-haspopup="dialog"
        className={`${pillBase} ${interactiveClass}`}
      >
        <span>{item.label}</span>
        <Info className="w-3 h-3 opacity-70" aria-hidden="true" />
      </button>
    );
  }

  if (item.href) {
    const isExternal = item.external;
    if (isExternal) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.hint}
          className={`${pillBase} ${interactiveClass}`}
        >
          <span>{item.label}</span>
          <ArrowUpRight className="w-3 h-3 opacity-70" aria-hidden="true" />
        </a>
      );
    }
    return (
      <a href={item.href} title={item.hint} className={`${pillBase} ${interactiveClass}`}>
        <span>{item.label}</span>
      </a>
    );
  }
  return (
    <span
      className={`${pillBase} text-white/70`}
      title={item.hint}
      aria-label={item.hint ? `${item.label}. ${item.hint}` : undefined}
    >
      {item.label}
    </span>
  );
};

const BranchHeading = ({ group }: { group: ProductFamilyGroup }) => {
  const headingClass =
    "text-white font-semibold text-base sm:text-lg leading-snug";
  if (group.href) {
    if (group.external) {
      return (
        <a
          href={group.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${headingClass} inline-flex items-center gap-1.5 hover:text-accent transition-colors`}
        >
          {group.title}
          <ArrowUpRight className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
        </a>
      );
    }
    return (
      <a
        href={group.href}
        className={`${headingClass} hover:text-accent transition-colors`}
      >
        {group.title}
      </a>
    );
  }
  return <h3 className={headingClass}>{group.title}</h3>;
};

const RootNode = ({
  root,
  onPreview,
}: {
  root: ProductFamilyRoot;
  onPreview: (preview: ProductPreview, label: string) => void;
}) => {
  const inner = (
    <>
      <span className="text-white font-semibold text-base sm:text-lg">
        {root.label}
      </span>
      {root.sublabel && (
        <span className="block text-white/60 text-xs sm:text-sm mt-1 leading-snug">
          {root.sublabel}
        </span>
      )}
    </>
  );
  const baseCls =
    "relative inline-block text-center px-5 py-3 rounded-xl border border-accent/40 bg-black/55 backdrop-blur-sm shadow-[0_0_0_1px_rgba(212,175,55,0.05)]";

  if (root.preview) {
    return (
      <button
        type="button"
        onClick={() => root.preview && onPreview(root.preview, root.label)}
        title={root.hint}
        aria-haspopup="dialog"
        className={`${baseCls} hover:border-accent transition-colors group text-left`}
      >
        {inner}
        <Info
          className="absolute top-2 right-2 w-3.5 h-3.5 text-white/40 group-hover:text-accent transition-colors"
          aria-hidden="true"
        />
      </button>
    );
  }

  if (root.href) {
    if (root.external) {
      return (
        <a
          href={root.href}
          target="_blank"
          rel="noopener noreferrer"
          title={root.hint}
          className={`${baseCls} hover:border-accent transition-colors group`}
        >
          {inner}
          <ArrowUpRight
            className="absolute top-2 right-2 w-3.5 h-3.5 text-white/40 group-hover:text-accent transition-colors"
            aria-hidden="true"
          />
        </a>
      );
    }
    return (
      <a
        href={root.href}
        title={root.hint}
        className={`${baseCls} hover:border-accent transition-colors`}
      >
        {inner}
      </a>
    );
  }
  return (
    <div className={baseCls} title={root.hint}>
      {inner}
    </div>
  );
};

const ProductFamilyTree = ({ root, groups }: Props) => {
  const [activePreview, setActivePreview] = useState<{
    label: string;
    preview: ProductPreview;
  } | null>(null);

  const openItemPreview = (item: ProductFamilyItem) => {
    if (item.preview) {
      setActivePreview({ label: item.label, preview: item.preview });
    }
  };

  const openRootPreview = (preview: ProductPreview, label: string) => {
    setActivePreview({ label, preview });
  };

  const close = () => setActivePreview(null);

  return (
    <div className="space-y-0">
      {/* Root node (processor / platform) */}
      {root && (
        <div className="flex flex-col items-center">
          <RootNode root={root} onPreview={openRootPreview} />
          {/* trunk */}
          <div
            className="w-px h-8 sm:h-10 bg-gradient-to-b from-accent/60 to-white/15"
            aria-hidden="true"
          />
          {/* horizontal spreader on desktop */}
          <div
            className="hidden sm:block w-full max-w-3xl h-px bg-white/15"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Branches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 sm:gap-y-10 pt-2 sm:pt-0">
        {groups.map((group) => (
          <div key={group.title} className="relative">
            {/* Drop connector from spreader (desktop only) */}
            {root && (
              <div
                className="hidden sm:block absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-white/15"
                aria-hidden="true"
              />
            )}
            <div className="flex flex-col items-start">
              <div className="mb-1.5 flex items-baseline gap-2">
                <BranchHeading group={group} />
              </div>
              {group.description && (
                <p className="text-white/55 text-[13px] sm:text-sm leading-relaxed mb-3 max-w-prose">
                  {group.description}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Pill key={item.label} item={item} onPreview={openItemPreview} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProductPreviewDialog
        active={activePreview}
        onOpenChange={(open) => {
          if (!open) close();
        }}
      />
    </div>
  );
};

const ProductPreviewDialog = ({
  active,
  onOpenChange,
}: {
  active: { label: string; preview: ProductPreview } | null;
  onOpenChange: (open: boolean) => void;
}) => {
  const open = !!active;
  const preview = active?.preview;
  const label = active?.label ?? "";
  const ctaHref = preview?.ctaHref ?? "/scheduling";
  const ctaLabel = preview?.ctaLabel ?? "Ask about this in a walkthrough";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg sm:max-w-xl border border-white/10 bg-[#0b0b0d]/95 backdrop-blur-md text-white p-0 overflow-hidden"
      >
        {preview && (
          <>
            {/* Visual header */}
            <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-accent/15 via-black to-black border-b border-white/10 flex items-center justify-center overflow-hidden">
              {preview.image ? (
                <img
                  src={preview.image}
                  alt={preview.imageAlt ?? label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="text-center px-6">
                  {preview.category && (
                    <p className="text-accent text-[11px] tracking-[0.18em] uppercase mb-2 font-medium">
                      {preview.category}
                    </p>
                  )}
                  <p className="text-white text-2xl sm:text-3xl font-semibold leading-tight">
                    {label}
                  </p>
                  {preview.relatedTo && (
                    <p className="text-white/50 text-xs sm:text-sm mt-3">
                      {preview.relatedTo}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="px-6 pt-5 pb-6 space-y-5">
              <DialogHeader className="space-y-1.5 text-left">
                <DialogTitle className="text-white text-xl sm:text-2xl font-semibold leading-tight">
                  {label}
                </DialogTitle>
                {preview.category && !preview.image && (
                  <span className="sr-only">{preview.category}</span>
                )}
                <DialogDescription className="text-white/65 text-sm sm:text-base leading-relaxed">
                  {preview.description}
                </DialogDescription>
              </DialogHeader>

              {preview.bestFit && (
                <div className="rounded-lg border border-white/8 bg-white/[0.02] p-4">
                  <p className="text-accent text-[11px] tracking-wide uppercase mb-1 font-medium">
                    Best fit
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {preview.bestFit}
                  </p>
                </div>
              )}

              {preview.highlights && preview.highlights.length > 0 && (
                <ul className="space-y-1.5">
                  {preview.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-white/70 text-sm leading-relaxed"
                    >
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0"
                        aria-hidden="true"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {preview.relatedTo && preview.image && (
                <p className="text-white/45 text-xs">{preview.relatedTo}</p>
              )}

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <Link
                  to={ctaHref}
                  onClick={() => onOpenChange(false)}
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {ctaLabel}
                </Link>
                {preview.officialUrl && (
                  <a
                    href={preview.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 hover:bg-white/5 text-white/85 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Official product page
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductFamilyTree;
