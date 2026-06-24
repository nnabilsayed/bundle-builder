import { formatCurrency, formatMonthly } from '../../utils/formatCurrency';
import styles from './PriceSummary.module.css';

interface PriceSummaryProps {
  totalCompareAt: number;
  totalPrice: number;
  totalSavings: number;
}

const FINANCING_MONTHLY = 17.17;

export function PriceSummary({ totalCompareAt, totalPrice, totalSavings }: PriceSummaryProps) {
  return (
    <div className={styles.summary}>
      <div className={styles.financing}>
        as low as <strong>{formatMonthly(FINANCING_MONTHLY)}</strong>
      </div>
      <div className={styles.totals}>
        <span className={styles.compareAt}>{formatCurrency(totalCompareAt)}</span>
        <span className={styles.price}>{formatCurrency(totalPrice)}</span>
      </div>
      {totalSavings > 0 && (
        <p className={styles.savings}>
          Congrats! You're saving {formatCurrency(totalSavings)} on your security bundle!
        </p>
      )}
    </div>
  );
}
