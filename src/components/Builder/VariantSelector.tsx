import { ProductVariant } from '../../types';
import styles from './VariantSelector.module.css';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({ variants, selectedVariantId, onSelect }: VariantSelectorProps) {
  return (
    <div className={styles.row}>
      {variants.map((v) => (
        <button
          key={v.id}
          className={`${styles.chip} ${v.id === selectedVariantId ? styles.active : ''}`}
          onClick={() => onSelect(v.id)}
          title={v.color}
          aria-label={v.color}
          aria-pressed={v.id === selectedVariantId}
        >
          <span
            className={styles.swatch}
            style={{
              backgroundColor: v.colorHex,
              border: v.colorHex === '#FFFFFF' ? '1px solid #ccc' : undefined,
            }}
          />
          <span className={styles.label}>{v.color}</span>
        </button>
      ))}
    </div>
  );
}
