import axios from 'axios';
import { Clinic } from '../../entities/Clinic';
import { Module } from '@nestjs/common';
import list from './list.json';
import { fromObjectToClinic, verifyIfExist } from '@/shared/helpers';

const PROVIDER_LIST = list;

@Module({})
export class ProviderData {
  public providersDatabase: Clinic[] = [];

  constructor() {
    this.gatherDataFromProviders();
  }

  public getProvidersDatabase(): Clinic[] {
    return this.providersDatabase;
  }

  private gatherDataFromProviders(): void {
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
        .then(async (response) => {
          response.data.forEach((clinic: Clinic) => {
            clinic = fromObjectToClinic(clinic);

            if (!verifyIfExist(clinic, this.providersDatabase)) {
              this.providersDatabase.push(clinic);
            }
          });
        })
        .catch((error) => {
          console.error(
            '[' +
              provider.PROVIDER_NAME +
              ']' +
              ' ⚠ FAIL ON GATHERING INFORMATION FROM PROVIDER: ' +
              error.code +
              '\n',
          );

          console.log('[WARNING] ⚠ Trying again in 10 seconds... \n');
          setTimeout(() => {
            console.log('Trying again...');
            this.gatherDataFromProviders();
          }, 10000);
        });
    });
  }
}
