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
    <div className="flex items-center gap-4 h-[41px]">
      <div className="shrink-0 w-7 h-7 flex items-center justify-center">
        {line.image ? (
          <img src={line.image} alt={line.name} className="w-full h-full object-contain" />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-[#e8e8f0] to-[#d0d0e0] rounded" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-gilroy text-[13px] font-semibold text-[#1F1F1F] leading-[1.3] tracking-[0.3px] block">
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
      <div className="w-[95px] shrink-0 flex justify-end">
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
