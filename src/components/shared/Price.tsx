import clsx from 'clsx';
import { formatCurrency, formatMonthly } from '../../utils/formatCurrency';

interface PriceProps {
  price: number;
  compareAtPrice?: number;
  isFreeWithBundle?: boolean;
  pricingType?: 'one-time' | 'monthly';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'default' | 'card';
}

const compareAtSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' } as const;
const activeSizes = { sm: 'text-sm', md: 'text-base', lg: 'text-xl font-bold' } as const;

export function Price({ price, compareAtPrice, isFreeWithBundle, pricingType, size = 'md', theme = 'default' }: PriceProps) {
  const formatter = pricingType === 'monthly' ? formatMonthly : formatCurrency;
  const showCompareAt = compareAtPrice && (isFreeWithBundle || compareAtPrice !== price);

  return (
    <span className={clsx(theme === 'card' ? 'inline-flex flex-col items-end gap-0' : 'inline-flex items-baseline gap-1')}>
      {showCompareAt && (
        <span className={clsx('line-through text-[#6F7882]', compareAtSizes[size])}>
          {formatter(compareAtPrice!)}
        </span>
      )}
      {isFreeWithBundle ? (
        <span className="text-[#4E2FD2] font-bold">FREE</span>
      ) : (
        <span className={clsx('font-semibold text-[#4E2FD2]', activeSizes[size])}>
          {formatter(price)}
        </span>
      )}
    </span>
  );
}
