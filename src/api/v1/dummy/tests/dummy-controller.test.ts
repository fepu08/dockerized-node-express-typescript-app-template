import { Request, Response, NextFunction } from 'express';
import httpMocks from 'node-mocks-http';
import { DummyService } from '../dummy-service';
import { DummyController } from '../dummy-controller';
import core from 'express-serve-static-core';

describe('DummyController', () => {
  let mockNext: jest.Mocked<NextFunction>;
  let mockRequest: httpMocks.MockRequest<Request<core.ParamsDictionary>>;
  let mockResponse: httpMocks.MockResponse<
    Response<unknown, Record<string, unknown>>
  >;
  let spy: jest.SpyInstance;

  beforeEach(() => {
    mockNext = jest.fn();
    mockResponse = httpMocks.createResponse();
    jest.clearAllMocks();
  });

  describe('GET /dummy', () => {
    beforeEach(() => {
      mockRequest = httpMocks.createRequest({});
      spy = jest.spyOn(DummyService, 'dummyService');
      jest.clearAllMocks();
    });

    it('should return 200', async () => {
      spy.mockResolvedValue(111);
      await DummyController.dummyController(
        mockRequest,
        mockResponse,
        mockNext,
      );

      expect(DummyService.dummyService).toHaveBeenCalledTimes(1);
      expect(mockResponse.statusCode).toBe(200);
      expect(mockResponse._getJSONData()).toEqual(111);
    });
  });
});
