import { AppController } from '../src/app.controller';

describe('AppController', () => {
  type AppControlerType = {
    getHealth: () => { status: string };
  };

  let appController: AppControlerType;

  beforeEach(async () => {
    appController = new AppController();
    expect(appController).toBeDefined();
  });

  describe('getApplicationStatus', () => {
    it('Verify application status', async () => {
      expect(appController.getHealth()).toMatchObject({ status: 'ok' });
    });
  });
});
