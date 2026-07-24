export const STROOPS = 10_000_000;

export function xlmToStroops(xlm) {
  return Math.round(Number(xlm) * STROOPS);
}

export function stroopsToXlm(stroops) {
  return Number(stroops) / STROOPS;
}