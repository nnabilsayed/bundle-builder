export type StepId = 'cameras' | 'plan' | 'sensors' | 'protection';
export type ReviewCategory = 'cameras' | 'sensors' | 'accessories' | 'plan';

export interface ProductVariant {
  id: string;
  color: string;
  colorHex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  learnMoreUrl?: string;
  stepId: StepId;
  reviewCategory: ReviewCategory;
  price: number;
  compareAtPrice?: number;
  discountLabel?: string;
  variants?: ProductVariant[];
  pricingType?: 'one-time' | 'monthly';
  isFreeWithBundle?: boolean;
  image?: string; // used when no variants
}

export interface Step {
  id: StepId;
  number: 1 | 2 | 3 | 4;
  title: string;
  nextStepLabel?: string;
}

export interface BundleState {
  selections: Record<string, number>; // variantId or productId → qty
  expandedStepId: StepId;
  selectedVariantByProduct: Record<string, string>; // productId → active variantId
}

export type BundleAction =
  | { type: 'SET_QUANTITY'; id: string; quantity: number }
  | { type: 'INCREMENT'; id: string }
  | { type: 'DECREMENT'; id: string }
  | { type: 'SELECT_VARIANT'; productId: string; variantId: string }
  | { type: 'EXPAND_STEP'; stepId: StepId }
  | { type: 'RESTORE_STATE'; state: Partial<BundleState> };

export interface ReviewLineData {
  id: string;
  productId: string;
  name: string;
  variantLabel?: string;
  quantity: number;
  price: number;
  compareAtPrice?: number;
  isFreeWithBundle?: boolean;
  pricingType?: 'one-time' | 'monthly';
  image?: string;
  category: ReviewCategory;
}
