import { Clinic } from '@/shared/entities';
import { STATECODE_LIST } from '../repository/constants';
import { SearchClinicDTO } from '@/domain/clinics/dto/clinics.dto';

/**
 * Description. This function is responsible for filtering the results parameter by the filtered parameter.
 * @param {any[]} filtered Filtered array containing the information that should be filtered.
 * @param {any[]} results Previous array containing all information gathered so far.
 * @return {any[]} Returns a new array where the results parameter is being filtered by the filtered parameter.
 */
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

/**
 * Description. This function is responsible for filtering the results parameter by the filtered parameters outputing data from the service.
 * @param {SearchClinicDTO} filters Object containing information to be filtered.
 * @param {any[]} clinicsService Service being used for the filtering.
 * @return {any[]} Returns a new array where the results parameter is being filtered by the filtered parameters.
 */
export async function analyzeFilterPayload(
  filters: SearchClinicDTO,
  clinicsService: any,
) {
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

/**
 * Description. This function is responsible for standardizing the state name.
 * @param {Clinic} clinic Object containing information about the clinic.
 * @return {Clinic} Returns a new clinic where the state name is being standardized.
 */
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

/**
 * Description. This function is responsible for checking if the clinic has already being pushed to the clinicList array.
 * @param {Clinic} clinic Object containing information about the clinic to be checked on.
 * @param {Clinic[]} clinicList Array containing all clinics inputed so far.
 * @return {boolean} Returns true if the clinic has already being pushed to the clinicList array.
 */
export function verifyIfExist(clinic: Clinic, clinicList: Clinic[]): boolean {
  return (
    clinicList.filter(
      (item) =>
        item.getName() === clinic.getName() &&
        item.getStateName() === clinic.getStateName(),
    ).length > 0
  );
}

/**
 * Description. This function is responsible for transforming the clinic object into a clinic entity.
 * @param {Clinic[]} clinicList Array containing all clinics to be inputed at the repository.
 */
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
