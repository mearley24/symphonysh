import { ArrowUpRight } from "lucide-react";

export type ProductFamilyItem = {
  label: string;
  href?: string;
  /** When true, render as outbound link (target=_blank). Defaults to false (internal). */
  external?: boolean;
  /** Optional tooltip / accessible description. */
  hint?: string;
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
};

type Props = {
  /** Top "processor / platform" node at the root of the map. */
  root?: ProductFamilyRoot;
  groups: ProductFamilyGroup[];
};

const pillBase =
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] sm:text-sm leading-tight transition-colors";

const Pill = ({ item }: { item: ProductFamilyItem }) => {
  if (item.href) {
    const isExternal = item.external;
    const className = `${pillBase} border border-white/15 bg-white/[0.03] text-white/90 hover:text-white hover:border-accent/60 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70`;
    if (isExternal) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.hint}
          className={className}
        >
          <span>{item.label}</span>
          <ArrowUpRight className="w-3 h-3 opacity-70" aria-hidden="true" />
        </a>
      );
    }
    return (
      <a href={item.href} title={item.hint} className={className}>
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

const RootNode = ({ root }: { root: ProductFamilyRoot }) => {
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
  return (
    <div className="space-y-0">
      {/* Root node (processor / platform) */}
      {root && (
        <div className="flex flex-col items-center">
          <RootNode root={root} />
          {/* trunk */}
          <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-accent/60 to-white/15" aria-hidden="true" />
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
                  <Pill key={item.label} item={item} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFamilyTree;
