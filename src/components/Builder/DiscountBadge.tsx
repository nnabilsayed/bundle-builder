export function DiscountBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center bg-[#4E2FD2] text-white text-[11px] font-bold py-[2px] px-[6px] rounded-[10px] tracking-[0.02em] whitespace-nowrap">
      {label}
    </span>
  );
}
