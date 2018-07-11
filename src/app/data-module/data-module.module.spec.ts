import { DataModuleModule } from './data-module.module';

describe('DataModuleModule', () => {
  let dataModuleModule: DataModuleModule;

  beforeEach(() => {
    dataModuleModule = new DataModuleModule();
  });

  it('should create an instance', () => {
    expect(dataModuleModule).toBeTruthy();
  });
});
