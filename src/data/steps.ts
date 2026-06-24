import { Step } from '../types';

export const steps: Step[] = [
  {
    id: 'cameras',
    number: 1,
    title: 'Choose your cameras',
    nextStepLabel: 'Next: Choose your plan',
  },
  {
    id: 'plan',
    number: 2,
    title: 'Choose your plan',
    nextStepLabel: 'Next: Choose your sensors',
  },
  {
    id: 'sensors',
    number: 3,
    title: 'Choose your sensors',
    nextStepLabel: 'Next: Add extra protection',
  },
  {
    id: 'protection',
    number: 4,
    title: 'Add extra protection',
  },
];
