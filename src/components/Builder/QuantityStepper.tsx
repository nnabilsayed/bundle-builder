import styles from './QuantityStepper.module.css';

interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  compact?: boolean;
}

export function QuantityStepper({ value, onIncrement, onDecrement, compact }: QuantityStepperProps) {
  return (
    <div className={`${styles.stepper} ${compact ? styles.compact : ''}`}>
      <button
        className={styles.btn}
        onClick={onDecrement}
        disabled={value <= 0}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={styles.count}>{value}</span>
      <button
        className={styles.btn}
        onClick={onIncrement}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
