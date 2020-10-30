export { Node, PropTypeNode } from 'typescript-to-proptypes/dist/types';

export type PropTypeDescriptor = {
  name:
    | 'arrayOf'
    | 'custom'
    | 'enum'
    | 'array'
    | 'bool'
    | 'func'
    | 'number'
    | 'object'
    | 'string'
    | 'any'
    | 'element'
    | 'node'
    | 'symbol'
    | 'objectOf'
    | 'shape'
    | 'exact'
    | 'union'
    | 'elementType',
  value?: any,
  raw?: string,
  computed?: boolean,
  // These are only needed for shape/exact types.
  // Consider consolidating PropTypeDescriptor and PropDescriptor
  description?: string,
  required?: boolean,
};

export type PropDescriptor = {
  type?: PropTypeDescriptor,
  required?: boolean,
  defaultValue?: any,
  description?: string,
};
