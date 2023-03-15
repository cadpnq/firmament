export const registryFactory = <T>() =>
  class Registry {
    static entries: T[] = [];
  };
