export const parsePixelValue = (value: string, defaultValue: number = 12): number => {
  const parsed = parseInt(value.replace('px', ''));
  return isNaN(parsed) ? defaultValue : parsed;
};

export const parsePaddingValue = (value: string, defaultValue: number = 24): number => {
  const firstValue = value.split(' ')[0];
  const parsed = parseInt(firstValue.replace('px', ''));
  return isNaN(parsed) ? defaultValue : parsed;
};

export const parsePadding = (value: string, defaultValue: number = 12): { vertical: number; horizontal: number } => {
  if (!value) return { vertical: defaultValue, horizontal: defaultValue };
  const parts = value.split(' ').map(part => parseInt(part.replace('px', '')));
  if (parts.length === 1 && !isNaN(parts[0])) return { vertical: parts[0], horizontal: parts[0] };
  if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) return { vertical: parts[0], horizontal: parts[1] };
  return { vertical: defaultValue, horizontal: defaultValue };
};