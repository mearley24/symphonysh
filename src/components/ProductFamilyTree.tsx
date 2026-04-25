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
  description?: string;
  items: ProductFamilyItem[];
};

type Props = {
  groups: ProductFamilyGroup[];
};

const bubbleBase =
  "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border bg-black/45 backdrop-blur-sm text-sm sm:text-[15px] leading-tight transition-colors";

const Bubble = ({ item }: { item: ProductFamilyItem }) => {
  if (item.href) {
    const isExternal = item.external;
    const className = `${bubbleBase} border-white/20 text-white/90 hover:text-white hover:border-accent/60 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-1 focus-visible:ring-offset-black/40`;
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
          <ArrowUpRight className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
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
      className={`${bubbleBase} border-white/15 text-white/80`}
      title={item.hint}
      aria-label={item.hint ? `${item.label}. ${item.hint}` : undefined}
    >
      {item.label}
    </span>
  );
};

const ProductFamilyTree = ({ groups }: Props) => {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div
          key={group.title}
          className="rounded-xl border border-white/15 bg-black/35 backdrop-blur-sm p-5 sm:p-6"
        >
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <h3 className="text-white font-semibold text-lg sm:text-xl">
              {group.title}
            </h3>
            <span
              className="text-accent/85 text-[11px] sm:text-xs font-semibold uppercase tracking-wider shrink-0"
              aria-hidden="true"
            >
              {group.items.length} {group.items.length === 1 ? "piece" : "pieces"}
            </span>
          </div>
          {group.description && (
            <p className="text-white/75 text-[15px] sm:text-base leading-relaxed mb-4">
              {group.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2.5 pt-1">
            {group.items.map((item) => (
              <Bubble key={item.label} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductFamilyTree;
