import { ReviewCategory } from '../../types';
import { useBundleContext } from '../../context/BundleContext';
import { saveBundleState } from '../../utils/localStorage';
import { formatCurrency } from '../../utils/formatCurrency';
import { ReviewSection } from './ReviewSection';
import { SatisfactionBadge } from './SatisfactionBadge';
import { PriceSummary } from './PriceSummary';
import { Button } from '../shared/Button';
import { Price } from '../shared/Price';

const ITEM_CATEGORIES: ReviewCategory[] = ['cameras', 'sensors', 'accessories'];

export function ReviewPanel() {
  const { state, reviewLines, totalCompareAt, totalPrice, totalSavings } = useBundleContext();

  const planLine = reviewLines.find((l) => l.category === 'plan');

  function handleSave() {
    saveBundleState(state);
    const el = document.activeElement as HTMLElement;
    el?.blur();
    alert('Your system has been saved! It will be restored when you return.');
  }

  function handleCheckout() {
    alert('Checkout coming soon!');
  }

  return (
    <aside className="w-full bg-[#EDF4FF] border-[1.5px] border-border rounded-xl p-4 flex flex-col gap-1 sticky top-5 max-h-[calc(100vh-40px)] overflow-y-auto self-start max-md:static max-md:max-h-none max-md:overflow-y-visible xl:static xl:max-h-none xl:overflow-y-visible xl:p-6 xl:self-stretch">

      {/* At xl: 2-column internal layout */}
      <div className="xl:grid xl:grid-cols-[1fr_auto] xl:gap-8 xl:items-start">

        {/* Left column: header + line items */}
        <div className="flex flex-col gap-1">
          <div className="border-b border-border pb-2.5 mb-1">
            <p className="font-gilroy font-normal text-[12px] leading-[100%] tracking-[1.6px] text-[#484848] uppercase m-0 mb-2">REVIEW</p>
            <h2 className="font-gilroy font-semibold text-[22px] leading-none tracking-[0.6px] text-[#1F1F1F] mb-1.5">
              Your security system
            </h2>
            <p className="font-gilroy font-medium text-sm leading-[1.3] tracking-[0.6px] text-[#1F1F1F]/75 m-0">
              Review your personalized protection system designed to keep what matters most safe.
            </p>
          </div>

          <div className="flex flex-col border-b border-border pb-1">
            {ITEM_CATEGORIES.map((cat) => (
              <ReviewSection
                key={cat}
                category={cat}
                lines={reviewLines.filter((l) => l.category === cat)}
              />
            ))}
          </div>

          {planLine && (
            <div className="py-2 pb-1 border-b border-border">
              <h4 className="font-gilroy font-normal text-xs leading-4 tracking-[0.03em] text-[#A8B2BD] uppercase m-0 mb-1.5">
                <span className="md:hidden">HOME MONITORING PLAN</span>
                <span className="hidden md:inline">PLAN</span>
              </h4>
              <div className="flex items-center gap-2 py-0.5">
                <img src="/images/cam unlimited.svg" alt="Cam Unlimited" className="w-5 h-6 shrink-0" />
                <span className="flex-1 font-gilroy text-[20px] md:text-[15px] xl:text-[20px] font-bold leading-none tracking-[-0.002em] text-[#4E2FD2]">
                  <span className="text-black">Cam </span>Unlimited
                </span>
                <Price
                  price={planLine.price}
                  compareAtPrice={planLine.compareAtPrice}
                  pricingType="monthly"
                  size="sm"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2.5 py-2">
            <img src="/images/Wyze Sense Keypad.svg" alt="Fast Shipping" className="w-[41px] h-[41px] shrink-0" />
            <span className="flex-1 font-gilroy text-[18px] font-medium leading-[16px] tracking-[0.005em] text-[#0B0D10]">Fast Shipping</span>
            <Price price={0} compareAtPrice={5.99} isFreeWithBundle />
          </div>
        </div>

        {/* Right column: satisfaction + totals + checkout */}
        <div className="flex flex-col gap-3 xl:w-[300px] xl:pt-4">
          <SatisfactionBadge />
          <PriceSummary totalCompareAt={totalCompareAt} totalPrice={totalPrice} />

          {totalSavings > 0 && (
            <p className="font-gilroy font-semibold text-[14px] leading-none tracking-[-0.06px] text-[#0AA288] text-center m-0 w-full">
              Congrats! You're saving {formatCurrency(totalSavings)} on your security bundle!
            </p>
          )}

          <Button
            variant="primary"
            fullWidth
            onClick={handleCheckout}
            className="mt-1 px-4 py-[13px] h-12 font-bold text-[17px] leading-none gap-2 !rounded !bg-[#4E2FD2] !border-[#4E2FD2]"
          >
            Checkout
          </Button>

          <button
            className="bg-transparent border-none cursor-pointer font-gilroy font-normal italic text-sm leading-[120%] tracking-[-0.016px] underline text-center text-[#484848] p-1.5 w-full hover:opacity-80"
            onClick={handleSave}
          >
            Save my system for later
          </button>
        </div>
      </div>
    </aside>
  );
}
