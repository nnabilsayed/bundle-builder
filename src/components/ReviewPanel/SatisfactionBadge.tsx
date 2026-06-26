export function SatisfactionBadge() {
  return (
    <div className="flex items-center gap-3">
      <img src="/images/30-days.png" alt="30-day satisfaction guarantee" className="w-[78px] h-[78px] shrink-0 object-contain" />
      <div className="flex flex-col gap-1">
        <span className="font-gilroy font-bold text-sm leading-[1.2] text-[#1F1F1F]">
          30-day hassle-free returns
        </span>
        <span className="font-gilroy font-normal text-xs leading-[1.4] text-[#484848]">
          If you're not totally in love with the product, we will refund you 100%.
        </span>
      </div>
    </div>
  );
}
