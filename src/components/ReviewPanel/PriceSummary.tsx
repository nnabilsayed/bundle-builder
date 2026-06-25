import { formatCurrency, formatMonthly } from '../../utils/formatCurrency';
import styles from './PriceSummary.module.css';

interface PriceSummaryProps {
  totalCompareAt: number;
  totalPrice: number;
}

const FINANCING_MONTHLY = 17.17;

export function PriceSummary({ totalCompareAt, totalPrice }: PriceSummaryProps) {
  return (
    <div className={styles.summary}>
      <div className={styles.financing}>
        as low as {formatMonthly(FINANCING_MONTHLY)}
      </div>
      <div className={styles.totals}>
        <span className={styles.compareAt}>{formatCurrency(totalCompareAt)}</span>
        <span className={styles.price}>{formatCurrency(totalPrice)}</span>
      </div>
    </div>
  );
}
