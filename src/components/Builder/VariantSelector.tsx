import clsx from 'clsx';
import { ProductVariant } from '../../types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({ variants, selectedVariantId, onSelect }: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1.5 my-1.5">
      {variants.map((v) => (
        <button
          key={v.id}
          className={clsx(
            'flex items-center gap-1 py-[3px] pr-2 pl-1 rounded-full border-[1.5px] bg-transparent cursor-pointer text-[11px] transition-colors duration-150',
            v.id === selectedVariantId
              ? 'border-primary text-primary'
              : 'border-border text-text-secondary hover:border-primary'
          )}
          onClick={() => onSelect(v.id)}
          title={v.color}
          aria-label={v.color}
          aria-pressed={v.id === selectedVariantId}
        >
          {v.image && <img src={v.image} alt={v.color} className="w-3 h-3 rounded-full inline-block shrink-0 object-cover" />}
          <span className="text-[11px] font-medium">{v.color}</span>
        </button>
      ))}
    </div>
  );
}
