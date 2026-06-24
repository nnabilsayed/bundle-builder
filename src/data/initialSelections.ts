import { BundleState } from '../types';

// Matches the Figma initial state:
// Cameras: Wyze Cam v4 White x1, Wyze Cam Pan v3 White x2
// Sensors: Wyze Sense Motion Sensor x2, Wyze Sense Hub x1
// Accessories: Wyze MicroSD Card x2
// Plan: Cam Unlimited x1
export const initialState: BundleState = {
  expandedStepId: 'cameras',
  selections: {
    'wyze-cam-v4-white': 1,
    'wyze-cam-pan-v3-white': 2,
    'wyze-sense-motion-sensor': 2,
    'wyze-sense-hub': 1,
    'wyze-microsd-card': 2,
    'cam-unlimited': 1,
  },
  selectedVariantByProduct: {
    'wyze-cam-v4': 'wyze-cam-v4-white',
    'wyze-cam-pan-v3': 'wyze-cam-pan-v3-white',
    'wyze-cam-floodlight-v2': 'wyze-cam-floodlight-v2-white',
    'wyze-battery-cam-pro': 'wyze-battery-cam-pro-white',
  },
};
