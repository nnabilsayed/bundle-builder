import { Product } from '../../types';
import { useBundleContext } from '../../context/BundleContext';
import { DiscountBadge } from './DiscountBadge';
import { VariantSelector } from './VariantSelector';
import { QuantityStepper } from './QuantityStepper';
import { Price } from '../shared/Price';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useBundleContext();

  const isToggle = product.selectionType === 'toggle';

  const activeVariantId =
    product.variants
      ? (state.selectedVariantByProduct[product.id] ?? product.variants[0].id)
      : product.id;

  const quantity = state.selections[activeVariantId] ?? 0;

  const isSelected = product.variants
    ? product.variants.some((v) => (state.selections[v.id] ?? 0) > 0)
    : quantity > 0;

  function handleSelectVariant(variantId: string) {
    dispatch({ type: 'SELECT_VARIANT', productId: product.id, variantId });
  }

  function handleToggle() {
    dispatch({ type: 'SET_QUANTITY', id: activeVariantId, quantity: isSelected ? 0 : 1 });
  }

  function handleIncrement() {
    dispatch({ type: 'INCREMENT', id: activeVariantId });
  }

  function handleDecrement() {
    dispatch({ type: 'DECREMENT', id: activeVariantId });
  }

  const activeVariant = product.variants?.find((v) => v.id === activeVariantId);
  const imageUrl = activeVariant?.image || product.image;

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''} ${isToggle ? styles.toggleCard : ''}`}
      onClick={isToggle ? handleToggle : undefined}
    >
      <div className={styles.imageWrapper}>
        {product.discountLabel && (
          <div className={styles.badgeWrapper}>
            <DiscountBadge label={product.discountLabel} />
          </div>
        )}
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder} aria-label={product.name} />
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.nameRow}>
          <h3 className={styles.name}>{product.name}</h3>
          {isToggle && (
            <div className={`${styles.toggleIndicator} ${isSelected ? styles.toggleIndicatorOn : ''}`}>
              {isSelected && <span className={styles.checkmark}>✓</span>}
            </div>
          )}
        </div>

        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}

        {product.learnMoreUrl && (
          <a href={product.learnMoreUrl} className={styles.learnMore} onClick={(e) => e.stopPropagation()}>
            Learn More
          </a>
        )}

        {product.variants && (
          <VariantSelector
            variants={product.variants}
            selectedVariantId={activeVariantId}
            onSelect={handleSelectVariant}
          />
        )}

        <div className={styles.footer}>
          {!isToggle && (
            <QuantityStepper
              value={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              minValue={product.required ? 1 : 0}
              maxValue={product.required ? 1 : product.maxQty}
            />
          )}
          <Price
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            pricingType={product.pricingType}
            isFreeWithBundle={product.isFreeWithBundle}
            size="sm"
            theme="card"
          />
        </div>
      </div>
    </div>
  );
}
