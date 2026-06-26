import clsx from 'clsx';
import { Product } from '../../types';
import { useBundleContext } from '../../context/BundleContext';
import { DiscountBadge } from './DiscountBadge';
import { VariantSelector } from './VariantSelector';
import { QuantityStepper } from './QuantityStepper';
import { Price } from '../shared/Price';

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
      className={clsx(
        'bg-white border-2 rounded-[10px] relative transition-colors duration-150',
        /* horizontal on mobile/tablet, vertical on xl desktop */
        'flex flex-row gap-[13px] p-[11px]',
        'xl:flex-col xl:gap-2 xl:p-3',
        isSelected ? 'border-primary' : 'border-transparent',
        isToggle ? 'cursor-pointer hover:border-primary hover:opacity-95' : 'cursor-default'
      )}
      onClick={isToggle ? handleToggle : undefined}
    >
      {/* Image wrapper */}
      <div className="relative shrink-0 w-[130px] flex items-center justify-center xl:w-full xl:shrink-0 xl:h-[100px]">
        {product.discountLabel && (
          <div className="absolute top-0 left-0 z-[1]">
            <DiscountBadge label={product.discountLabel} />
          </div>
        )}
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} className="w-full max-h-[140px] object-contain xl:max-h-[100px]" />
        ) : (
          <div className="w-[100px] h-[100px] bg-gradient-to-br from-[#e8e8f0] to-[#d0d0e0] rounded-lg" aria-label={product.name} />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1.5">
          <h3 className="font-gilroy font-semibold text-base leading-none tracking-[0.6px] text-[#1F1F1F] m-0 xl:text-sm">
            {product.name}
          </h3>
          {isToggle && (
            <div className={clsx(
              'w-[18px] h-[18px] shrink-0 rounded-full border-2 flex items-center justify-center transition-colors duration-150',
              isSelected ? 'bg-primary border-primary' : 'bg-white border-[#C8D0D8]'
            )}>
              {isSelected && <span className="text-white text-[11px] leading-none font-bold">✓</span>}
            </div>
          )}
        </div>

        {product.description && (
          <p className="font-gilroy font-medium text-xs leading-[1.3] tracking-[0.6px] text-[#1F1F1F] m-0">
            {product.description}
          </p>
        )}

        {product.learnMoreUrl && (
          <a
            href={product.learnMoreUrl}
            className="font-gilroy font-medium text-xs leading-[1.3] tracking-[0.6px] text-primary underline"
            onClick={(e) => e.stopPropagation()}
          >
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

        <div className="flex items-end justify-between gap-2.5 mt-auto pt-2">
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
