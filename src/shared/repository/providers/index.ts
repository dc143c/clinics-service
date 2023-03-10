import axios from 'axios';
import { Clinic } from '../../entities/Clinic';
import { STATECODE_LIST } from '../constants';
import { Module } from '@nestjs/common';

const PROVIDER_LIST = [
  {
    PROVIDER_URL:
      'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json',
    PROVIDER_NAME: 'Dental',
    PROVIDER_METHOD: 'get',
    PROVIDER_API_KEY: '',
  },
  {
    PROVIDER_URL:
      'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json',
    PROVIDER_NAME: 'Vet',
    PROVIDER_METHOD: 'get',
    PROVIDER_API_KEY: '',
  },
];

@Module({})
export class ProviderData {
  public providersDatabase: Clinic[] = [];

  constructor() {
    PROVIDER_LIST.forEach((provider) => {
      axios({
        method: provider.PROVIDER_METHOD,
        url: provider.PROVIDER_URL,
        headers: provider.PROVIDER_API_KEY
          ? {
              Authorization: 'Bearer ' + provider.PROVIDER_API_KEY,
            }
          : {},
      })
        .then((response) => {
          response.data.forEach((clinic: Clinic) => {
            clinic = new Clinic(
              Object.values(clinic)[0],
              Object.values(clinic)[1],
              Object.values(clinic)[2],
            );

            if (clinic.getStateName().length == 2) {
              clinic.setStateName(STATECODE_LIST[clinic.getStateName()]);
            }

            if (
              this.providersDatabase.filter(
                (item) =>
                  item.getName() === clinic.getName() &&
                  item.getStateName() === clinic.getStateName(),
              ).length === 0
            ) {
              this.providersDatabase.push(clinic);
            }
          });

          // console.log(
          //   '[' +
          //     provider.PROVIDER_NAME +
          //     ']' +
          //     ' ✔ SUCCESS ON GATHERING INFORMATION FROM PROVIDER',
          // );
        })
        .catch((error) => {
          console.error(
            '[' +
              provider.PROVIDER_NAME +
              ']' +
              ' ⚠ FAIL ON GATHERING INFORMATION FROM PROVIDER: ' +
              '.\n',
            error.code + '\n',
            error.message,
          );
        });
    });
  }

  public getProvidersDatabase(): Clinic[] {
    return this.providersDatabase;
  }
}
