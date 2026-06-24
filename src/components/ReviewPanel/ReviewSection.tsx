import { ReviewLineData, ReviewCategory } from '../../types';
import { ReviewLineItem } from './ReviewLineItem';
import styles from './ReviewSection.module.css';

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
    <div className={styles.section}>
      <h4 className={styles.heading}>{categoryLabels[category]}</h4>
      <div className={styles.items}>
        {lines.map((line) => (
          <ReviewLineItem key={line.id} line={line} />
        ))}
      </div>
    </div>
  );
}
