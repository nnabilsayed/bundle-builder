import { ReviewCategory } from '../../types';
import { useBundleContext } from '../../context/BundleContext';
import { saveBundleState } from '../../utils/localStorage';
import { formatCurrency } from '../../utils/formatCurrency';
import { ReviewSection } from './ReviewSection';
import { SatisfactionBadge } from './SatisfactionBadge';
import { PriceSummary } from './PriceSummary';
import { Button } from '../shared/Button';
import { Price } from '../shared/Price';
import styles from './ReviewPanel.module.css';

// Plan and shipping are shown as static rows — not through ReviewSection
const ITEM_CATEGORIES: ReviewCategory[] = ['cameras', 'sensors', 'accessories'];

export function ReviewPanel() {
  const { state, reviewLines, totalCompareAt, totalPrice, totalSavings } = useBundleContext();

  const planLine = reviewLines.find((l) => l.category === 'plan');

  function handleSave() {
    saveBundleState(state);
    const el = document.activeElement as HTMLElement;
    el?.blur();
    // In a production app this would be a toast notification
    alert('Your system has been saved! It will be restored when you return.');
  }

  function handleCheckout() {
    alert('Checkout coming soon!');
  }

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.reviewLabel}>REVIEW</span>
        <h2 className={styles.title}>Your security system</h2>
        <p className={styles.subtitle}>
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      {/* Cameras, sensors, accessories — with qty steppers */}
      <div className={styles.items}>
        {ITEM_CATEGORIES.map((cat) => (
          <ReviewSection
            key={cat}
            category={cat}
            lines={reviewLines.filter((l) => l.category === cat)}
          />
        ))}
      </div>

      {/* Plan row — monthly pricing, no stepper */}
      {planLine && (
        <div className={styles.planSection}>
          <h4 className={styles.sectionHeading}>PLAN</h4>
          <div className={styles.planRow}>
            <img src="/images/cam unlimited.svg" alt="Cam Unlimited" className={styles.planIcon} />
            <a href="#" className={styles.planName}>
              <span className={styles.planNameDark}>Cam </span>Unlimited
            </a>
            <Price
              price={planLine.price}
              compareAtPrice={planLine.compareAtPrice}
              pricingType="monthly"
              size="sm"
            />
          </div>
        </div>
      )}

      {/* Shipping row */}
      <div className={styles.shippingRow}>
        <img src="/images/Wyze Sense Keypad.svg" alt="Fast Shipping" className={styles.shippingIcon} />
        <span className={styles.shippingLabel}>Fast Shipping</span>
        <Price price={0} compareAtPrice={5.99} isFreeWithBundle />
      </div>

      <div className={styles.priceRow}>
        <SatisfactionBadge />
        <PriceSummary totalCompareAt={totalCompareAt} totalPrice={totalPrice} />
      </div>

      {totalSavings > 0 && (
        <p className={styles.savings}>
          Congrats! You're saving {formatCurrency(totalSavings)} on your security bundle!
        </p>
      )}

      <Button variant="primary" fullWidth onClick={handleCheckout} className={styles.checkoutBtn}>
        Checkout
      </Button>

      <button className={styles.saveLink} onClick={handleSave}>
        Save my system for later
      </button>
    </aside>
  );
}
