import { BundleState } from '../types';

const STORAGE_KEY = 'wyze-bundle-builder';

export function saveBundleState(state: BundleState): void {
  try {
    const serialized = JSON.stringify({
      selections: state.selections,
      selectedVariantByProduct: state.selectedVariantByProduct,
    });
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    // localStorage unavailable or full
  }
}

export function loadBundleState(): Partial<BundleState> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearBundleState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // noop
  }
}
