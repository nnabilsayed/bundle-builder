import { useRef, useEffect, useState } from 'react';
import { Step, StepId } from '../../types';
import { useBundleContext } from '../../context/BundleContext';
import { products } from '../../data/products';
import { steps } from '../../data/steps';
import { ProductGrid } from './ProductGrid';
import { Button } from '../shared/Button';
import styles from './AccordionStep.module.css';

const stepIcons: Record<StepId, string> = {
  cameras: '/images/choose your cameras.png',
  plan: '/images/choose your plan.svg',
  sensors: '/images/choose your sensors.png',
  protection: '/images/add extra protection.png',
};

interface AccordionStepProps {
  step: Step;
}

export function AccordionStep({ step }: AccordionStepProps) {
  const { state, dispatch, selectedCountByStep } = useBundleContext();
  const isOpen = state.expandedStepId === step.id;
  const count = selectedCountByStep[step.id];
  const stepProducts = products.filter((p) => p.stepId === step.id);

  const contentRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  // Start at the correct height immediately — no flash on initial render
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

  useEffect(() => {
    // Skip animation on initial mount — initial height is already correct
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (!contentRef.current) return;

    if (isOpen) {
      const target = contentRef.current.scrollHeight;
      setHeight(target);
      const timer = setTimeout(() => setHeight(undefined), 300);
      return () => clearTimeout(timer);
    } else {
      // Snapshot current height, then animate to 0
      const current = contentRef.current.scrollHeight;
      setHeight(current);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0));
      });
    }
  }, [isOpen]);

  function handleToggle() {
    dispatch({ type: 'EXPAND_STEP', stepId: step.id });
  }

  function handleNext() {
    const currentIndex = steps.findIndex((s) => s.id === step.id);
    const nextStep = steps[currentIndex + 1];
    if (nextStep) {
      dispatch({ type: 'EXPAND_STEP', stepId: nextStep.id });
    }
  }

  return (
    <div className={`${styles.step} ${isOpen ? styles.open : ''}`}>
      <button className={styles.header} onClick={handleToggle} aria-expanded={isOpen}>
        <div className={styles.stepLabelRow}>
          <span className={styles.stepLabel}>STEP {step.number} OF 4</span>
        </div>
        <div className={styles.titleRow}>
          <div className={styles.titleLeft}>
            <img src={stepIcons[step.id]} alt="" className={styles.icon} />
            <span className={styles.title}>{step.title}</span>
          </div>
          <div className={styles.headerRight}>
            {count > 0 && (
              <span className={styles.selectedCount}>{count} selected</span>
            )}
            <span className={styles.chevron}>{isOpen ? '▲' : '▼'}</span>
          </div>
        </div>
      </button>

      <div
        className={styles.contentWrapper}
        style={{ height: height !== undefined ? `${height}px` : undefined }}
        ref={contentRef}
      >
        <div className={styles.content}>
          <ProductGrid products={stepProducts} />
          {step.nextStepLabel && (
            <div className={styles.nextWrapper}>
              <Button variant="outline" onClick={handleNext}>
                {step.nextStepLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
