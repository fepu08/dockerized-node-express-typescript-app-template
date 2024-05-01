import { DebugLogger } from '../../../logger/controller-logger';

export class DummyDAO {
  @DebugLogger()
  public static dummyDaoRequest() {
    return Promise.resolve(111);
  }
}
