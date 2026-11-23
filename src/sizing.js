import { SIZES } from './data.js';

// Rule of thumb from height/weight; fit: -1 snug, 0 regular, 1 roomy. oversize items already run big.
export function recommendSize({ height, weight, fit = 0, oversize = false }) {
  if (!(height > 120 && height < 230 && weight > 30 && weight < 200)) return null;
  let i = height < 165 ? 0 : height < 175 ? 1 : height < 183 ? 2 : 3;
  const bmi = weight / (height / 100) ** 2;
  if (bmi >= 25) i += 1;
  if (bmi < 18.5) i -= 1;
  i += fit;
  if (oversize && fit <= 0) i -= 1;
  i = Math.max(0, Math.min(SIZES.length - 1, i));
  return SIZES[i];
}
