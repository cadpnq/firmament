import type { registryFactory } from '../registries/registryFactory';

export const registryDecoratorFactory =
  <T>(registry: ReturnType<typeof registryFactory>) =>
  (constructor: T) => {
    registry.entries.push(constructor);
  };
