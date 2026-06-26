import { ReviewLineData, ReviewCategory } from '../../types';
import { ReviewLineItem } from './ReviewLineItem';

const categoryLabels: Record<ReviewCategory, string> = {
  cameras: 'CAMERAS',
  sensors: 'SENSORS',
  accessories: 'ACCESSORIES',
  plan: 'HOME MONITORING PLAN',
};

interface ReviewSectionProps {
  category: ReviewCategory;
  lines: ReviewLineData[];
}

export function ReviewSection({ category, lines }: ReviewSectionProps) {
  if (lines.length === 0) return null;

  return (
    <div className="flex flex-col">
      <h4 className="font-gilroy font-normal text-xs leading-4 tracking-[0.03em] text-[#A8B2BD] uppercase m-0 mb-0.5 pt-2.5">
        {categoryLabels[category]}
      </h4>
      <div className="flex flex-col">
        {lines.map((line) => (
          <ReviewLineItem key={line.id} line={line} />
        ))}
      </div>
    </div>
  );
}
