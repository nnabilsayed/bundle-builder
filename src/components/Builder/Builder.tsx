import { steps } from '../../data/steps';
import { AccordionStep } from './AccordionStep';
import styles from './Builder.module.css';

export function Builder() {
  return (
    <div className={styles.builder}>
      <h1 className={styles.mobileHeading}>Let's get started!</h1>
      <div className={styles.steps}>
        {steps.map((step) => (
          <AccordionStep key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}
