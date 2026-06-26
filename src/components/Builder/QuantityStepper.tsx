import clsx from 'clsx';

interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  compact?: boolean;
  minValue?: number;
  maxValue?: number;
}

export function QuantityStepper({ value, onIncrement, onDecrement, compact, minValue = 0, maxValue }: QuantityStepperProps) {
  const btnClass = clsx(
    'border-none bg-transparent cursor-pointer font-medium text-text-primary flex items-center justify-center shrink-0 transition-colors duration-100 hover:not-disabled:bg-bg disabled:text-text-muted disabled:cursor-not-allowed h-full',
    compact ? 'w-[26px] text-sm' : 'w-8 text-base'
  );

  return (
    <div
      className={clsx(
        'inline-flex items-center border-[1.5px] border-border rounded overflow-hidden',
        compact ? 'h-[26px]' : 'h-8'
      )}
    >
      <button
        className={btnClass}
        onClick={onDecrement}
        disabled={value <= minValue}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span
        className={clsx(
          'text-center font-semibold text-text-primary px-1',
          compact ? 'min-w-[22px] text-xs' : 'min-w-7 text-sm'
        )}
      >
        {value}
      </span>
      <button
        className={btnClass}
        onClick={onIncrement}
        disabled={maxValue !== undefined && value >= maxValue}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
