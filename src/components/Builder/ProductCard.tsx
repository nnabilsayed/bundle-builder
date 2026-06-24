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

  function handleIncrement() {
    dispatch({ type: 'INCREMENT', id: activeVariantId });
  }

  function handleDecrement() {
    dispatch({ type: 'DECREMENT', id: activeVariantId });
  }

  const activeVariant = product.variants?.find((v) => v.id === activeVariantId);
  const imageUrl = activeVariant?.image || product.image;

  return (
    <div className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
      {product.discountLabel && (
        <div className={styles.badgeWrapper}>
          <DiscountBadge label={product.discountLabel} />
        </div>
      )}

      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder} aria-label={product.name} />
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>

        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}

        {product.learnMoreUrl && (
          <a href={product.learnMoreUrl} className={styles.learnMore}>
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
          <QuantityStepper
            value={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
          <Price
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            pricingType={product.pricingType}
            isFreeWithBundle={product.isFreeWithBundle}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
