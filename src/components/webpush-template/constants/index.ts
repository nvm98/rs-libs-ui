export * from './variables.constant';
export * from './blocks.constant';

// Web Push specific constants
export const MAX_TITLE_LENGTH = 50;
export const MAX_BODY_LENGTH = 125;

// Common notification icons
export const COMMON_ICONS = [
  { value: '/icons/notification.png', label: 'Default Notification' },
  { value: '/icons/order.png', label: 'Order' },
  { value: '/icons/cart.png', label: 'Cart' },
  { value: '/icons/sale.png', label: 'Sale' },
  { value: '/icons/delivery.png', label: 'Delivery' },
  { value: '/icons/reminder.png', label: 'Reminder' }
];

// Vibration patterns
export const VIBRATION_PATTERNS = [
  { value: [200], label: 'Short' },
  { value: [200, 100, 200], label: 'Double' },
  { value: [200, 100, 200, 100, 200], label: 'Triple' },
  { value: [100, 50, 100, 50, 100, 50, 400], label: 'SOS' }
];
