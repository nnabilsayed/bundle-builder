import styles from './DiscountBadge.module.css';

export function DiscountBadge({ label }: { label: string }) {
  return <span className={styles.badge}>{label}</span>;
}
