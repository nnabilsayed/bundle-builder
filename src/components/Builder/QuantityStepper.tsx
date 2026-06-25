import styles from './QuantityStepper.module.css';

interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  compact?: boolean;
  minValue?: number;
  maxValue?: number;
}

export function QuantityStepper({ value, onIncrement, onDecrement, compact, minValue = 0, maxValue }: QuantityStepperProps) {
  return (
    <div className={`${styles.stepper} ${compact ? styles.compact : ''}`}>
      <button
        className={styles.btn}
        onClick={onDecrement}
        disabled={value <= minValue}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={styles.count}>{value}</span>
      <button
        className={styles.btn}
        onClick={onIncrement}
        disabled={maxValue !== undefined && value >= maxValue}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
