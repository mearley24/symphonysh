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
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-black/40 backdrop-blur-sm text-xs sm:text-sm transition-colors";

const Bubble = ({ item }: { item: ProductFamilyItem }) => {
  if (item.href) {
    const isExternal = item.external;
    const className = `${bubbleBase} border-white/10 text-white/75 hover:text-white hover:border-accent/40 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60`;
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
          <ArrowUpRight className="w-3 h-3 opacity-60" aria-hidden="true" />
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
      className={`${bubbleBase} border-white/10 text-white/70`}
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
          className="rounded-xl border border-white/8 bg-black/30 backdrop-blur-sm p-5 sm:p-6"
        >
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <h3 className="text-white font-semibold text-base sm:text-lg">
              {group.title}
            </h3>
            <span
              className="text-accent/70 text-[10px] sm:text-xs font-medium uppercase tracking-wider shrink-0"
              aria-hidden="true"
            >
              {group.items.length} {group.items.length === 1 ? "piece" : "pieces"}
            </span>
          </div>
          {group.description && (
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              {group.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2 pt-1">
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
