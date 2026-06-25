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
        <span className={styles.name}>{line.name}</span>
      </div>
      <QuantityStepper
        value={line.quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        minValue={line.required ? 1 : 0}
        maxValue={line.required ? 1 : undefined}
        compact
      />
      <div className={styles.priceCol}>
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
