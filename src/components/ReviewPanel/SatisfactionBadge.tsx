import styles from './SatisfactionBadge.module.css';

export function SatisfactionBadge() {
  return (
    <img src="/images/30-days.png" alt="30-day satisfaction guarantee" className={styles.seal} />
  );
}
