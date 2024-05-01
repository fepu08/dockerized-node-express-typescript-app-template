import express from 'express';
import { DummyController } from './dummy-controller';
import { asyncHandler } from '../../../utils';
import { validateDummy } from '../../../middlewares/body-validator-middleware';

const dummyRouter = express.Router();

dummyRouter
  .route('/')
  .get(asyncHandler(DummyController.dummyController))
  .post(validateDummy, asyncHandler(DummyController.dummyController));
export default dummyRouter;
