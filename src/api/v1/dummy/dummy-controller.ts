import { Request, Response, NextFunction } from 'express';
import { DummyService } from './dummy-service';
import { DebugLogger } from '../../../logger/controller-logger';

export class DummyController {
  @DebugLogger()
  public static async dummyController(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const response = await DummyService.dummyService();
    res.status(200).json(response);
  }
}
