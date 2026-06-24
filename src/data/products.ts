import { Product } from '../types';

export const products: Product[] = [
  // === CAMERAS (Step 1) ===
  {
    id: 'wyze-cam-v4',
    name: 'Wyze Cam v4',
    description: 'The clearest Wyze Cam ever made.',
    learnMoreUrl: '#',
    stepId: 'cameras',
    reviewCategory: 'cameras',
    price: 27.98,
    compareAtPrice: 35.98,
    discountLabel: 'Save 22%',
    variants: [
      { id: 'wyze-cam-v4-white', color: 'White', colorHex: '#FFFFFF', image: '' },
      { id: 'wyze-cam-v4-gray', color: 'Gray', colorHex: '#888888', image: '' },
      { id: 'wyze-cam-v4-black', color: 'Black', colorHex: '#222222', image: '' },
    ],
  },
  {
    id: 'wyze-cam-pan-v3',
    name: 'Wyze Cam Pan v3',
    description: '360° pan and 180° tilt security camera.',
    learnMoreUrl: '#',
    stepId: 'cameras',
    reviewCategory: 'cameras',
    price: 34.98,
    compareAtPrice: 39.98,
    discountLabel: 'Save 13%',
    variants: [
      { id: 'wyze-cam-pan-v3-white', color: 'White', colorHex: '#FFFFFF', image: '' },
      { id: 'wyze-cam-pan-v3-black', color: 'Black', colorHex: '#222222', image: '' },
    ],
  },
  {
    id: 'wyze-cam-floodlight-v2',
    name: 'Wyze Cam Floodlight v2',
    description: '2K floodlight camera with a 160° wide-angle view for your garage.',
    learnMoreUrl: '#',
    stepId: 'cameras',
    reviewCategory: 'cameras',
    price: 69.98,
    compareAtPrice: 89.98,
    discountLabel: 'Save 22%',
    variants: [
      { id: 'wyze-cam-floodlight-v2-white', color: 'White', colorHex: '#FFFFFF', image: '' },
      { id: 'wyze-cam-floodlight-v2-black', color: 'Black', colorHex: '#222222', image: '' },
    ],
  },
  {
    id: 'wyze-duo-cam-doorbell',
    name: 'Wyze Duo Cam Doorbell',
    description: 'Two cameras. Two views. Double the porch protection.',
    learnMoreUrl: '#',
    stepId: 'cameras',
    reviewCategory: 'cameras',
    price: 69.98,
    image: '',
  },
  {
    id: 'wyze-battery-cam-pro',
    name: 'Wyze Battery Cam Pro',
    description: 'Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed.',
    learnMoreUrl: '#',
    stepId: 'cameras',
    reviewCategory: 'cameras',
    price: 89.98,
    variants: [
      { id: 'wyze-battery-cam-pro-white', color: 'White', colorHex: '#FFFFFF', image: '' },
      { id: 'wyze-battery-cam-pro-black', color: 'Black', colorHex: '#222222', image: '' },
    ],
  },

  // === PLAN (Step 2) ===
  {
    id: 'cam-unlimited',
    name: 'Cam Unlimited',
    description: 'Unlimited cameras, person detection, package detection, and more.',
    stepId: 'plan',
    reviewCategory: 'plan',
    price: 9.99,
    compareAtPrice: 12.99,
    pricingType: 'monthly',
    image: '',
  },

  // === SENSORS (Step 3) ===
  {
    id: 'wyze-sense-motion-sensor',
    name: 'Wyze Sense Motion Sensor',
    description: 'Detect motion in any room.',
    stepId: 'sensors',
    reviewCategory: 'sensors',
    price: 29.99,
    image: '',
  },
  {
    id: 'wyze-sense-hub',
    name: 'Wyze Sense Hub (Required)',
    description: 'The hub that connects all your sensors.',
    stepId: 'sensors',
    reviewCategory: 'sensors',
    price: 29.99,
    compareAtPrice: 29.99,
    isFreeWithBundle: true,
    image: '',
  },

  // === PROTECTION (Step 4) ===
  {
    id: 'wyze-microsd-card',
    name: 'Wyze MicroSD Card (256GB)',
    description: 'Local storage for your Wyze cameras.',
    stepId: 'protection',
    reviewCategory: 'accessories',
    price: 20.98,
    image: '',
  },
];
