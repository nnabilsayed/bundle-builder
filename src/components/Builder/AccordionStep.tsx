import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Step, StepId } from '../../types';
import { useBundleContext } from '../../context/BundleContext';
import { products } from '../../data/products';
import { steps } from '../../data/steps';
import { ProductGrid } from './ProductGrid';
import { Button } from '../shared/Button';

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
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

  useEffect(() => {
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
    <div className={clsx('border-b border-border last:border-b-0', isOpen ? 'bg-[#EDF4FF]' : 'bg-card-bg')}>
      <button className="w-full flex flex-col p-0 bg-transparent border-none cursor-pointer text-left gap-[5px] hover:bg-primary/[0.03]" onClick={handleToggle} aria-expanded={isOpen}>
        <div className="w-full flex items-center px-[15px] pt-3 pb-1.5">
          <span className="font-gilroy font-medium text-[11px] tracking-[0.08em] text-text-muted uppercase">
            STEP {step.number} OF 4
          </span>
        </div>
        <div className="flex items-center justify-between gap-[3px] px-[15px] py-5 border-t-[0.5px] border-b-[0.5px] border-[#1F1F1F] h-[66px] box-border">
          <div className="flex items-center gap-2">
            <img src={stepIcons[step.id]} alt="" className="w-6 h-6 object-contain shrink-0" />
            <span className="font-gilroy font-semibold text-[22px] leading-none tracking-[0] text-[#0B0D10]">
              {step.title}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {count > 0 && (
              <span className="font-gilroy font-semibold text-sm tracking-[0.3px] text-[#4E2FD2]">
                {count} selected
              </span>
            )}
            <span className="text-[10px] text-text-muted">{isOpen ? '▲' : '▼'}</span>
          </div>
        </div>
      </button>

      <div
        className="overflow-hidden transition-[height] duration-[280ms] ease-in-out"
        style={{ height: height !== undefined ? `${height}px` : undefined }}
        ref={contentRef}
      >
        <div className="p-4 flex flex-col gap-4">
          <ProductGrid products={stepProducts} />
          {step.nextStepLabel && (
            <div className="flex justify-center">
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
