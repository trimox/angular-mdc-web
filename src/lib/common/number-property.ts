export function toNumber(value: any, fallbackValue = 0) {
  return isNaN(parseFloat(value as any)) || isNaN(Number(value)) ? fallbackValue : Number(value);
}
