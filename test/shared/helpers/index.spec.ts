import { compareTwoArrays } from '@/shared/helpers';

describe('Helper testing', () => {
  it('Array comparison should avoid duplicates', () => {
    const array1 = [1, 2, 3, 4, 5];
    const array2 = [1, 2, 3, 4, 5];
    expect(JSON.stringify(compareTwoArrays(array1, array2))).toBe(
      JSON.stringify(array2),
    );
  });

  it('Array comparison should input the filtered array', () => {
    const array1 = [];
    const array2 = [1, 2, 3, 4, 5];
    expect(JSON.stringify(compareTwoArrays(array2, array1))).toBe(
      JSON.stringify(array2),
    );
  });

  it('Array comparison should retrieve the filtered array from the previous results', () => {
    const array1 = [1, 2, 3, 4, 5];
    const array2 = [1, 2];
    expect(JSON.stringify(compareTwoArrays(array1, array2))).toBe(
      JSON.stringify(array2),
    );
  });

  it('Array comparison should return an empty array', () => {
    const array1 = [1, 2, 3, 4, 5];
    const array2 = [6, 7, 8, 9, 10];
    expect(JSON.stringify(compareTwoArrays(array1, array2))).toBe(
      JSON.stringify([]),
    );
  });
});
