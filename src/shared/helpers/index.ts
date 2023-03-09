export function compareTwoArrays(array1: any[], array2: any[]): any[] {
  if(array2.length === 0) {
    return array1;
  }
  return array2.filter((item) => array1.includes(item));
}