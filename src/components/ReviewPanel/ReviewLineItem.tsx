import { ReviewLineData } from '../../types';
import { useBundleContext } from '../../context/BundleContext';
import { QuantityStepper } from '../Builder/QuantityStepper';
import { Price } from '../shared/Price';

export function ReviewLineItem({ line }: { line: ReviewLineData }) {
  const { dispatch } = useBundleContext();

  function handleIncrement() {
    dispatch({ type: 'INCREMENT', id: line.id });
  }

  function handleDecrement() {
    dispatch({ type: 'DECREMENT', id: line.id });
  }

  return (
    <div className="flex items-center gap-2 py-1 min-h-[34px]">
      <div className="shrink-0 w-7 h-7 flex items-center justify-center">
        {line.image ? (
          <img src={line.image} alt={line.name} className="w-full h-full object-contain" />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-[#e8e8f0] to-[#d0d0e0] rounded" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-gilroy text-[18px] md:text-[13px] xl:text-[18px] font-medium text-[#0B0D10] leading-[16px] tracking-[0.005em] block truncate">
          {line.name}
        </span>
      </div>
      <QuantityStepper
        value={line.quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        minValue={line.required ? 1 : 0}
        maxValue={line.required ? 1 : undefined}
        compact
      />
      <div className="w-[75px] shrink-0 flex justify-end">
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
