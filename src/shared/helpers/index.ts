import { Clinic } from '@/shared/entities';

export function compareTwoArrays(filtered: any[], results: any[]): any[] {
  const finalResults: any[] = [];

  if (results.length === 0) {
    return filtered;
  }

  results
    .filter((item) => filtered.includes(item))
    .forEach((item) => {
      if (!finalResults.includes(item)) {
        finalResults.push(item);
      }
    });

  return finalResults;
}

export async function analyzeFilterPayload(filters, clinicsService: any) {
  try {
    let results: Clinic[] = [];
    let filtered: Clinic[] = [];

    if (filters.name) {
      filtered = await clinicsService.getFilteredByName(filters.name);
      results = compareTwoArrays(filtered, results);
    }

    if (filters.stateName) {
      filtered = await clinicsService.getFilteredByStateName(filters.stateName);
      results = compareTwoArrays(filtered, results);
    }

    if (filters.availabilityFrom) {
      filtered = await clinicsService.getFilteredByAvailabilityFrom(
        filters.availabilityFrom,
      );
      results = compareTwoArrays(filtered, results);
    }

    if (filters.availabilityTo) {
      filtered = await clinicsService.getFilteredByAvailabilityTo(
        filters.availabilityTo,
      );
      results = compareTwoArrays(filtered, results);
    }

    if (
      !filters.name &&
      !filters.stateName &&
      !filters.availabilityFrom &&
      !filters.availabilityTo
    ) {
      filtered = await clinicsService.getAll();
      results = compareTwoArrays(filtered, results);
    }

    return results;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
