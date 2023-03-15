import { KindRegistry, SystemRegistry } from '../registries/Registries';
import { registryDecoratorFactory } from './registryDecoratorFactory';

export const RegisterKind = registryDecoratorFactory(KindRegistry);
export const RegisterSystem = registryDecoratorFactory(SystemRegistry);
