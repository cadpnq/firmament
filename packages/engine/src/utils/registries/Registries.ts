import type { Kind } from 'src/@types/objects';
import type { BaseObject } from 'src/mixins/BaseObject';
import type { System } from 'src/systems/System';
import { registryFactory } from './registryFactory';

export const KindRegistry = registryFactory<Kind<BaseObject>>();
export const SystemRegistry = registryFactory<System>();
