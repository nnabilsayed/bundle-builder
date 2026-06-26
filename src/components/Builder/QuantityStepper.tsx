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
  if (compact) {
    const btnClass = 'w-[26px] h-[26px] border-none bg-transparent cursor-pointer font-medium text-text-primary flex items-center justify-center shrink-0 text-sm transition-colors duration-100 hover:bg-bg disabled:text-text-muted disabled:cursor-not-allowed';
    return (
      <div className="inline-flex items-center border-[1.5px] border-border rounded overflow-hidden h-[26px]">
        <button className={btnClass} onClick={onDecrement} disabled={value <= minValue} aria-label="Decrease quantity">−</button>
        <span className="text-center font-semibold text-text-primary px-1 min-w-[22px] text-xs">{value}</span>
        <button className={btnClass} onClick={onIncrement} disabled={maxValue !== undefined && value >= maxValue} aria-label="Increase quantity">+</button>
      </div>
    );
  }

  const btnClass = 'w-[20px] h-[20px] rounded-[4px] bg-[#F0F4F7] border-none cursor-pointer font-medium text-text-primary flex items-center justify-center shrink-0 text-base transition-colors duration-100 hover:opacity-80 disabled:text-text-muted disabled:cursor-not-allowed';

  return (
    <div className="inline-flex items-center gap-[10px]">
      <button className={btnClass} onClick={onDecrement} disabled={value <= minValue} aria-label="Decrease quantity">−</button>
      <span className="text-center font-semibold text-text-primary min-w-[16px] text-sm">{value}</span>
      <button className={btnClass} onClick={onIncrement} disabled={maxValue !== undefined && value >= maxValue} aria-label="Increase quantity">+</button>
    </div>
  );
}
