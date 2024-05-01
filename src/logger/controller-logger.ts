import { performance } from 'perf_hooks';
import { logger } from './logger';

export function DebugLogger() {
  return (
    target: NonNullable<unknown>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value as unknown;
    if (typeof originalMethod === 'function') {
      descriptor.value = async function (this: void, ...args: never) {
        logger.info(`[${propertyKey}] has been invoked.`);
        const t1 = performance.now();
        await originalMethod.apply(this, args);
        const t2 = performance.now();
        const executionTime = t2 - t1;
        logger.info(`[${propertyKey}] has finished.`);
        logger.debug(
          `[${propertyKey}] It took ${executionTime.toFixed(2)}ms to execute`,
        );
      };
    }
    return descriptor;
  };
}
