import { Logger } from '../logger/logger';
import { ReflectMetadataTypesEnum } from '../util/reflect-metadata-types.enum';

import { Controller } from './controller';

export interface DataOptions {
  type?: any;
  optional?: boolean;
  isArray?: boolean;
}

const dataLogger = Logger.create('@Data()');

export function Data(options?: DataOptions): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    const reflectType = Reflect.getMetadata(
      ReflectMetadataTypesEnum.paramTypes,
      target,
      propertyKey
    )?.[parameterIndex];
    const type = options?.type ?? reflectType;
    if (type === Array && devMode) {
      dataLogger.warn(
        `${target.constructor.name}#${String(
          propertyKey
        )} has a parameter with type "Array", did you forget to put the "type" property${
          options?.isArray ? '' : ' and the "isArray" property'
        }?`
      );
    }
    if (type === Object && devMode) {
      dataLogger.warn(
        `${target.constructor.name}#${String(
          propertyKey
        )} has a parameter with type "Object", did you forget to put the type property?`
      );
    }
    Controller.upsertMethodMetadata(target.constructor, String(propertyKey), (metadata) => {
      metadata.parameters[parameterIndex] = {
        type: options?.type ?? reflectType,
        optional: options?.optional ?? false,
        index: parameterIndex,
        isArray: options?.isArray ?? false,
      };
      return metadata;
    });
  };
}
