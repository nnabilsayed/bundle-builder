import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react';
import { BundleState, BundleAction, ReviewLineData, StepId } from '../types';
import { bundleReducer } from './bundleReducer';
import { initialState } from '../data/initialSelections';
import { products } from '../data/products';
import { loadBundleState } from '../utils/localStorage';

interface BundleContextValue {
  state: BundleState;
  dispatch: React.Dispatch<BundleAction>;
  reviewLines: ReviewLineData[];
  selectedCountByStep: Record<StepId, number>;
  totalCompareAt: number;
  totalPrice: number;
  totalSavings: number;
}

const BundleContext = createContext<BundleContextValue | null>(null);

export function BundleProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(bundleReducer, initialState);

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = loadBundleState();
    if (saved) {
      dispatch({ type: 'RESTORE_STATE', state: saved });
    }
  }, []);

  // Build review lines from current selections
  const reviewLines = useMemo<ReviewLineData[]>(() => {
    const lines: ReviewLineData[] = [];

    for (const product of products) {
      if (product.variants) {
        for (const variant of product.variants) {
          const qty = state.selections[variant.id] ?? 0;
          if (qty > 0) {
            lines.push({
              id: variant.id,
              productId: product.id,
              name: product.name,
              variantLabel: variant.color,
              quantity: qty,
              price: product.price,
              compareAtPrice: product.compareAtPrice,
              isFreeWithBundle: product.isFreeWithBundle,
              required: product.required,
              pricingType: product.pricingType,
              image: variant.image,
              category: product.reviewCategory,
            });
          }
        }
      } else {
        const qty = state.selections[product.id] ?? 0;
        if (qty > 0) {
          lines.push({
            id: product.id,
            productId: product.id,
            name: product.name,
            quantity: qty,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            isFreeWithBundle: product.isFreeWithBundle,
            required: product.required,
            pricingType: product.pricingType,
            image: product.image,
            category: product.reviewCategory,
          });
        }
      }
    }

    return lines;
  }, [state.selections]);

  // Count of distinct products selected per step
  const selectedCountByStep = useMemo<Record<StepId, number>>(() => {
    const counts: Record<StepId, number> = {
      cameras: 0,
      plan: 0,
      sensors: 0,
      protection: 0,
    };
    for (const product of products) {
      const stepId = product.stepId;
      if (product.variants) {
        const hasAny = product.variants.some(
          (v) => (state.selections[v.id] ?? 0) > 0
        );
        if (hasAny) counts[stepId]++;
      } else {
        if ((state.selections[product.id] ?? 0) > 0) counts[stepId]++;
      }
    }
    return counts;
  }, [state.selections]);

  const { totalCompareAt, totalPrice, totalSavings } = useMemo(() => {
    let compareAt = 0;
    let price = 0;

    for (const line of reviewLines) {
      if (line.pricingType === 'monthly') continue; // exclude monthly from one-time total
      if (line.isFreeWithBundle) continue;
      const linePrice = line.price * line.quantity;
      const lineCompareAt = (line.compareAtPrice ?? line.price) * line.quantity;
      price += linePrice;
      compareAt += lineCompareAt;
    }

    // Add shipping savings (hardcoded: $5.99 saved)
    compareAt += 5.99;

    return {
      totalCompareAt: compareAt,
      totalPrice: price,
      totalSavings: compareAt - price,
    };
  }, [reviewLines]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      reviewLines,
      selectedCountByStep,
      totalCompareAt,
      totalPrice,
      totalSavings,
    }),
    [state, reviewLines, selectedCountByStep, totalCompareAt, totalPrice, totalSavings]
  );

  return <BundleContext.Provider value={value}>{children}</BundleContext.Provider>;
}

export function useBundleContext(): BundleContextValue {
  const ctx = useContext(BundleContext);
  if (!ctx) throw new Error('useBundleContext must be used within BundleProvider');
  return ctx;
}
