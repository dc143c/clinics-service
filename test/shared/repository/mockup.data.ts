import { ProviderData } from '@/shared/repository/providers';
import { mockupData } from '../constants';
import { Clinic } from '@/shared/entities';
import { STATECODE_LIST } from '@/shared/repository/constants';

export class ProviderDataTest extends ProviderData {
  constructor() {
    super();
    const mockedData = [];

    mockupData.map((clinic: Clinic) => {
      clinic = new Clinic(
        Object.values(clinic)[0],
        Object.values(clinic)[1],
        Object.values(clinic)[2],
      );

      if (clinic.getStateName().length == 2) {
        clinic.setStateName(STATECODE_LIST[clinic.getStateName()]);
      }

      if (
        mockedData.filter(
          (item) =>
            item.getName() === clinic.getName() &&
            item.getStateName() === clinic.getStateName(),
        ).length === 0
      ) {
        mockedData.push(clinic);
      }
    });

    this.providersDatabase = mockedData;
  }
}
