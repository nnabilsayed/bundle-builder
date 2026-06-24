import { formatCurrency, formatMonthly } from '../../utils/formatCurrency';
import styles from './Price.module.css';

interface PriceProps {
  price: number;
  compareAtPrice?: number;
  isFreeWithBundle?: boolean;
  pricingType?: 'one-time' | 'monthly';
  size?: 'sm' | 'md' | 'lg';
}

export function Price({ price, compareAtPrice, isFreeWithBundle, pricingType, size = 'md' }: PriceProps) {
  const formatter = pricingType === 'monthly' ? formatMonthly : formatCurrency;
  const showCompareAt = compareAtPrice && compareAtPrice !== price;

  return (
    <span className={`${styles.price} ${styles[size]}`}>
      {showCompareAt && (
        <span className={styles.compareAt}>{formatter(compareAtPrice!)}</span>
      )}
      {isFreeWithBundle ? (
        <span className={styles.free}>FREE</span>
      ) : (
        <span className={styles.active}>{formatter(price)}</span>
      )}
    </span>
  );
}
