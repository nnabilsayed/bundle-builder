import { steps } from '../../data/steps';
import { AccordionStep } from './AccordionStep';

export function Builder() {
  return (
    <div className="flex flex-col gap-3 min-w-0">
      <h1 className="text-2xl font-[900] text-text-primary mb-1 hidden max-md:block">
        Let's get started!
      </h1>
      <div className="flex flex-col gap-2.5">
        {steps.map((step) => (
          <AccordionStep key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}
