import { Clinic } from '@/shared/entities';
import { ClinicRepository } from '../repository/index';
import { STATECODE_LIST } from '../repository/constants';

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

export function fromObjectToClinic(clinic: Clinic): Clinic {
  let stateName = Object.values(clinic)[1];
  if (stateName.length == 2) {
    stateName = STATECODE_LIST[stateName];
  }
  return new Clinic(
    Object.values(clinic)[0],
    stateName,
    Object.values(clinic)[2],
  );
}

export function verifyIfExist(clinic: Clinic, clinicList: Clinic[]): boolean {
  return (
    clinicList.filter(
      (item) =>
        item.getName() === clinic.getName() &&
        item.getStateName() === clinic.getStateName(),
    ).length > 0
  );
}

export async function fromProviderToRepository(clinicList: Clinic[]) {
  const transformedClinicList: Clinic[] = [];
  try {
    clinicList.forEach((clinic: Clinic) => {
      clinic = fromObjectToClinic(clinic);

      if (!verifyIfExist(clinic, transformedClinicList)) {
        transformedClinicList.push(clinic);
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }

  return transformedClinicList;
}
