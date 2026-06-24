import { ReviewLineData } from '../../types';
import { useBundleContext } from '../../context/BundleContext';
import { QuantityStepper } from '../Builder/QuantityStepper';
import { Price } from '../shared/Price';
import styles from './ReviewLineItem.module.css';

export function ReviewLineItem({ line }: { line: ReviewLineData }) {
  const { dispatch } = useBundleContext();

  function handleIncrement() {
    dispatch({ type: 'INCREMENT', id: line.id });
  }

  function handleDecrement() {
    dispatch({ type: 'DECREMENT', id: line.id });
  }

  return (
    <div className={styles.item}>
      <div className={styles.thumb}>
        {line.image ? (
          <img src={line.image} alt={line.name} className={styles.thumbImg} />
        ) : (
          <div className={styles.thumbPlaceholder} />
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.name}>
          {line.name}
          {line.variantLabel && (
            <span className={styles.variant}> ({line.variantLabel})</span>
          )}
        </span>
      </div>
      <div className={styles.controls}>
        <QuantityStepper
          value={line.quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          compact
        />
        <Price
          price={line.price * line.quantity}
          compareAtPrice={line.compareAtPrice ? line.compareAtPrice * line.quantity : undefined}
          isFreeWithBundle={line.isFreeWithBundle}
          pricingType={line.pricingType}
          size="sm"
        />
      </div>
    </div>
  );
}
