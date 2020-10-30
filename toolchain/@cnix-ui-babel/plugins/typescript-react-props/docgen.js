// @ts-check
/** @typedef {import("./types").Node} Node */
/** @typedef {import("./types").PropTypeNode} PropTypeNode */
/** @typedef {import("./types").PropDescriptor} PropDescriptor */
/** @typedef {import("./types").PropTypeDescriptor} PropTypeDescriptor */
const t = require('@babel/types');
// const require('typescript-to-proptypes');

/**
 * @param {PropTypeNode} node
 * @returns {PropDescriptor}
 */
const parseNode = (node) => {
  /** @type {PropTypeDescriptor} */
  const propTypeDescriptor = {}
  /** @type {PropDescriptor} */
  const propDescriptor = {
    description: node.jsDoc,
    type: propTypeDescriptor
  };
  switch (node.type) {
    case 'NodeString':
      propTypeDescriptor.name = 'string';
  }
  return propDescriptor;
}


// const propObjectExpression = ({
//   jsDoc, propType: { type, value },
// }) => t.objectExpression([
//   t.objectProperty(t.identifier('required'), t.booleanLiteral(false)),
//   t.objectProperty(t.identifier('description'), t.stringLiteral(jsDoc)),
//   t.objectProperty(t.identifier('type'), t.objectExpression([
//     t.objectProperty(t.identifier('name'), t.stringLiteral(type.replace(/Node$/, '').toLowerCase())),
//     value && t.objectProperty(t.identifier('value'), t.stringLiteral(value)),
//     t.objectProperty(t.identifier('raw'), t.stringLiteral('rawValue')),
//   ].filter(Boolean))),
//   t.objectProperty(t.identifier('defaultValue'), t.objectExpression([
//     t.objectProperty(t.identifier('value'), t.stringLiteral('value')),
//     t.objectProperty(t.identifier('computed'), t.booleanLiteral(false)),
//   ])),
// ]);

// const docgenExpression = () => {
//   return t.expressionStatement(
//     t.assignmentExpression('=',
//       t.memberExpression(
//         t.identifier(name),
//         t.identifier('__docgenInfo'),
//       ), t.objectExpression([
//         t.objectProperty(t.identifier('displayName'), t.stringLiteral(name)),
//         t.objectProperty(t.identifier('description'), t.stringLiteral(description || '')),
//         t.objectProperty(t.identifier('methods'), t.arrayExpression()),
//         t.objectProperty(t.identifier('composes'), t.nullLiteral()),
//         t.objectProperty(t.identifier('props'), t.objectExpression(types
//           .filter(({ type }) => type === 'PropTypeNode')
//           .map((PropTypeNode) => t.objectProperty(
//             t.identifier(PropTypeNode.name), propObjectExpression(PropTypeNode),
//           )))),
//       ])),
//   );
// }

/**
 *
 * @param {Node | PropTypeNode[]} node
 * @param {String} [description]
 */
const createDocgen = (opts => {

  const generateDocgen = (node) => {
    if (Array.isArray(node)) {
      generateDocgen
    }
  }

  return generateDocgen
};

module.exports = createDocgen;
