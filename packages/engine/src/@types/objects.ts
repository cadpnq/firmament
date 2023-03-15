import type { BaseObject } from 'src/mixins/BaseObject';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T = object> = new (...args: any[]) => T;
export type Mixin<R = object> = <T extends Constructor<BaseObject>>(
  base: T
) => Constructor<R> & T;
export type Kind<T extends BaseObject> = () => Constructor<T>;

export interface ObjectManifest {
  name: string;
  kind: string;
  spec: Record<string, any>;
}
