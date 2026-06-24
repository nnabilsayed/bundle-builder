import { BundleState, BundleAction } from '../types';

export function bundleReducer(state: BundleState, action: BundleAction): BundleState {
  switch (action.type) {
    case 'SET_QUANTITY': {
      const qty = Math.max(0, action.quantity);
      return {
        ...state,
        selections: { ...state.selections, [action.id]: qty },
      };
    }
    case 'INCREMENT': {
      const current = state.selections[action.id] ?? 0;
      return {
        ...state,
        selections: { ...state.selections, [action.id]: current + 1 },
      };
    }
    case 'DECREMENT': {
      const current = state.selections[action.id] ?? 0;
      const next = Math.max(0, current - 1);
      return {
        ...state,
        selections: { ...state.selections, [action.id]: next },
      };
    }
    case 'SELECT_VARIANT': {
      return {
        ...state,
        selectedVariantByProduct: {
          ...state.selectedVariantByProduct,
          [action.productId]: action.variantId,
        },
      };
    }
    case 'EXPAND_STEP': {
      return { ...state, expandedStepId: action.stepId };
    }
    case 'RESTORE_STATE': {
      return {
        ...state,
        selections: action.state.selections ?? state.selections,
        selectedVariantByProduct:
          action.state.selectedVariantByProduct ?? state.selectedVariantByProduct,
      };
    }
    default:
      return state;
  }
}
