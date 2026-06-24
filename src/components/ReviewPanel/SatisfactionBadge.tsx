import styles from './SatisfactionBadge.module.css';

export function SatisfactionBadge() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.badge}>
        <div className={styles.seal}>
          <span className={styles.pct}>100%</span>
          <span className={styles.sub}>Wyze</span>
          <span className={styles.sub2}>satisfaction</span>
          <span className={styles.sub}>guarantee</span>
        </div>
      </div>
      <div className={styles.text}>
        <strong>30-day hassle-free returns</strong>
        <p>If you're not totally in love with the product, we will refund you 100%.</p>
      </div>
    </div>
  );
}
