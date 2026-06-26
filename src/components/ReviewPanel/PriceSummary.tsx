import { formatCurrency, formatMonthly } from '../../utils/formatCurrency';

interface PriceSummaryProps {
  totalCompareAt: number;
  totalPrice: number;
}

const FINANCING_MONTHLY = 17.17;

export function PriceSummary({ totalCompareAt, totalPrice }: PriceSummaryProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex items-center justify-center py-[5px] px-2 bg-[#4E2FD2] rounded-[3px] font-gilroy font-medium text-xs leading-[15px] tracking-[-0.05em] text-white whitespace-nowrap">
          as low as {formatMonthly(FINANCING_MONTHLY)}
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-gilroy font-medium text-sm leading-5 tracking-[0.0025em] line-through text-[#6F7882]">
            {formatCurrency(totalCompareAt)}
          </span>
          <span className="font-gilroy font-bold text-2xl leading-8 tracking-[-0.00125em] text-[#4E2FD2]">
            {formatCurrency(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
