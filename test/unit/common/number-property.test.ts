import { toNumber } from '../../../src/lib/common';

describe('toNumber', () => {
  it('should coerce undefined to 0 or default', () => {
    expect(toNumber(undefined)).toBe(0);
    expect(toNumber(undefined, 111)).toBe(111);
  });

  it('should coerce null to 0 or default', () => {
    expect(toNumber(null)).toBe(0);
    expect(toNumber(null, 111)).toBe(111);
  });

  it('should coerce true to 0 or default', () => {
    expect(toNumber(true)).toBe(0);
    expect(toNumber(true, 111)).toBe(111);
  });

  it('should coerce false to 0 or default', () => {
    expect(toNumber(false)).toBe(0);
    expect(toNumber(false, 111)).toBe(111);
  });

  it('should coerce the empty string to 0 or default', () => {
    expect(toNumber('')).toBe(0);
    expect(toNumber('', 111)).toBe(111);
  });

  it('should coerce the string "1" to 1', () => {
    expect(toNumber('1')).toBe(1);
    expect(toNumber('1', 111)).toBe(1);
  });

  it('should coerce the string "123.456" to 123.456', () => {
    expect(toNumber('123.456')).toBe(123.456);
    expect(toNumber('123.456', 111)).toBe(123.456);
  });

  it('should coerce the string "-123.456" to -123.456', () => {
    expect(toNumber('-123.456')).toBe(-123.456);
    expect(toNumber('-123.456', 111)).toBe(-123.456);
  });

  it('should coerce an arbitrary string to 0 or default', () => {
    expect(toNumber('pink')).toBe(0);
    expect(toNumber('pink', 111)).toBe(111);
  });

  it('should coerce an arbitrary string prefixed with a number to 0 or default', () => {
    expect(toNumber('123pink')).toBe(0);
    expect(toNumber('123pink', 111)).toBe(111);
  });

  it('should coerce the number 1 to 1', () => {
    expect(toNumber(1)).toBe(1);
    expect(toNumber(1, 111)).toBe(1);
  });

  it('should coerce the number 123.456 to 123.456', () => {
    expect(toNumber(123.456)).toBe(123.456);
    expect(toNumber(123.456, 111)).toBe(123.456);
  });

  it('should coerce the number -123.456 to -123.456', () => {
    expect(toNumber(-123.456)).toBe(-123.456);
    expect(toNumber(-123.456, 111)).toBe(-123.456);
  });

  it('should coerce an object to 0 or default', () => {
    expect(toNumber({})).toBe(0);
    expect(toNumber({}, 111)).toBe(111);
  });

  it('should coerce an array to 0 or default', () => {
    expect(toNumber([])).toBe(0);
    expect(toNumber([], 111)).toBe(111);
  });
});
