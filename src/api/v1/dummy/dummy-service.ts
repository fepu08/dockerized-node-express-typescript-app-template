import { DebugLogger } from '../../../logger/controller-logger';
import { DummyDAO } from './dummy-dao';

export class DummyService {
  @DebugLogger()
  public static async dummyService() {
    return await DummyDAO.dummyDaoRequest();
  }
}
