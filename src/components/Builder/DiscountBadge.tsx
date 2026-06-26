export function DiscountBadge({ label }: { label: string }) {
  return (
    <span className="inline-block bg-discount-bg text-discount-text text-[11px] font-bold py-0.5 px-[7px] rounded-full tracking-[0.02em] whitespace-nowrap">
      {label}
    </span>
  );
}
