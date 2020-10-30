/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
// @ts-check
/** @typedef {import("@babel/core").NodePath} NodePath */
/** @typedef {import("@babel/types").Program} Program */
/** @typedef {import("@babel/types").ExportDefaultDeclaration} ExportDefaultDeclaration */
const debug = require('debug')('babel-plugin-typescript-react-props');
const { default: template } = require('@babel/template');
const t = require('@babel/types');
const createParserProps = require('./react-props-parser');

// adds prop-types require declaration
// inject prop-types before module.exports default
// inject storybook STORYBOOK_REACT_CLASSES
// detects if proptypes are defined to extend

/*
if (typeof STORYBOOK_REACT_CLASSES !== "undefined") {
  STORYBOOK_REACT_CLASSES["src/components/Workspace3DViewer.js"] = {
    name: "Workspace3DViewer",
    docgenInfo: Workspace3DViewer.__docgenInfo,
    path: "src/components/Workspace3DViewer.js"
  };
}

{
  ["displayName": string,]
  ["methods": [],]
  ["description": string,]
  ["props": {
    "<propName>": {
      "type": {
        "name": "<typeName>",
        ["value": <typeValue>]
        ["raw": string]
      },
      "flowType": <flowType>,
      "tsType": <tsType>,
      "required": boolean,
      "description": string,
      ["defaultValue": {
        "value": string,
        "computed": boolean
      }]
    },
    ...
  },]
  ["composes": <componentNames>]
}
Workspace3DViewer.displayName = 'Workspace3DViewer';
Workspace3DViewer.__docgenInfo = {
  description: 'Renders a canvas with a WebGL capability for visualize 3D Objects\n\n@param {Props} props',
  methods: [],
  displayName: 'Workspace3DViewer',
};
*/

// Workspace3D.docgen = {
//   displayName: 'displayName',
//   description: 'description',
//   methods: [],
//   composes: null,
//   props: {
//     propName: {
//       required: false,
//       description: 'proDescription',
//       type: {
//         name: 'typeName',
//         value: '',
//         raw: '',
//       },
//       defaultValue: {
//         value: 'value',
//         computed: false,
//       },
//     },
//   },
// };

/**
 *
 * @param {Object} componentNode
 * @param {String} [description]
 */
const createDocgen = ({
  name,
  types,
}, description) => {
  const propObjectExpression = ({
    jsDoc, propType: { type, value },
  }) => t.objectExpression([
    t.objectProperty(t.identifier('required'), t.booleanLiteral(false)),
    t.objectProperty(t.identifier('description'), t.stringLiteral(jsDoc)),
    t.objectProperty(t.identifier('type'), t.objectExpression([
      t.objectProperty(t.identifier('name'), t.stringLiteral(type.replace(/Node$/, '').toLowerCase())),
      value && t.objectProperty(t.identifier('value'), t.stringLiteral(value)),
      t.objectProperty(t.identifier('raw'), t.stringLiteral('rawValue')),
    ].filter(Boolean))),
    t.objectProperty(t.identifier('defaultValue'), t.objectExpression([
      t.objectProperty(t.identifier('value'), t.stringLiteral('value')),
      t.objectProperty(t.identifier('computed'), t.booleanLiteral(false)),
    ])),
  ]);
  return t.expressionStatement(
    t.assignmentExpression('=',
      t.memberExpression(
        t.identifier(name),
        t.identifier('__docgenInfo'),
      ), t.objectExpression([
        t.objectProperty(t.identifier('displayName'), t.stringLiteral(name)),
        t.objectProperty(t.identifier('description'), t.stringLiteral(description || '')),
        t.objectProperty(t.identifier('methods'), t.arrayExpression()),
        t.objectProperty(t.identifier('composes'), t.nullLiteral()),
        t.objectProperty(t.identifier('props'), t.objectExpression(types
          .filter(({ type }) => type === 'PropTypeNode')
          .map((PropTypeNode) => t.objectProperty(
            t.identifier(PropTypeNode.name), propObjectExpression(PropTypeNode),
          )))),
      ])),
  );
};

/**
 * @typedef {Object} Refs
 * @prop {String} componentName
 * @prop {String} [description]
 * @prop {babel.NodePath<babel.types.ImportDeclaration>} reactImport
 * @prop {babel.NodePath<babel.types.ImportDeclaration>} propTypesImport
 * @prop {babel.NodePath<babel.types.ExportDefaultDeclaration>} defaultExport
 */

/**
  * Creates an ast injector
  *
  * @param {*} gopts
  */
const createInjector = (gopts) => {
  const parseProps = createParserProps(gopts);

  /**
   * @param {Refs} refs
   * @param {String} filename
   * @param {Object} opts
   * @param {Boolean} opts.preserveComments
   */
  const injectReactProps = ({
    componentName,
    description,
    defaultExport,
  }, filename, opts) => {
    if (!defaultExport) {
      return null;
    }

    const {
      preserveComments = true,
      docgen = false,
    } = { ...opts };
    const { ast: astPropTypes, format } = parseProps(filename);
    if (astPropTypes) {
      const componentNode = astPropTypes.body.find(({ type, name }) => type === 'ComponentNode' && name === componentName);
      const genASTProps = template(format(), {
        preserveComments,
      });
      debug('adding prop types for component "%s" in %s: %O', componentName, filename, astPropTypes);
      const path = genASTProps();

      if (docgen && componentNode) {
        const docgenNodePath = createDocgen(componentNode, description);
        defaultExport.insertBefore(docgenNodePath);
      }
      defaultExport.insertBefore(path);
      return path;
    }
    return null;
  };

  return injectReactProps;
};

/**
 *
 * @param {NodePath} programPath
 * @param {Refs|Object} [refs]
 * @param {Object} [opts]
 * @param {RegExp} [opts.test]
 * @param {RegExp} [opts.ignore]
 * @returns {Refs}
 */
const createRefs = (programPath, refs, opts) => {
  const {
    test = /^[A-Z].*/,
    ignore = null,
  } = { ...opts };
  let lrefs = [
    'componentName',
    'defaultExport',
    'reactImport',
    'propTypesImport',
  ].reduce((p, n) => { p[n] = null; return p; }, refs || {});

  programPath.traverse({
    ImportDeclaration(path) {
      const { value } = path.node.source;
      if (value === 'react') {
        lrefs.reactImport = path;
      } else if (value === 'prop-types') {
        lrefs.propTypesImport = path;
      }
    },
    ExportDefaultDeclaration(path) {
      // @ts-ignore
      const { declaration: { name } } = path.node;
      lrefs.componentName = name;
      if (name) {
        if (!new RegExp(test).test(name)) {
          debug('ignoring component "%s" do not match name with "%s"', name, test);
          lrefs = null;
        } else if (ignore && new RegExp(ignore).test(name)) {
          debug('ignoring component "%s" match with the ignore pattern "%s"', name, ignore);
          lrefs = null;
        } else {
          lrefs.defaultExport = path;
        }
      }
    },
  });

  return lrefs;
};

const createImport = (name, module) => t.importDeclaration(
  [t.importDefaultSpecifier(t.identifier(name))], t.stringLiteral(module),
);

module.exports = (_, gopts) => {
  const injectReactProps = createInjector(gopts);
  /** @type {Refs} */
  let refs;
  return ({
    visitor: {
      Program: {
        enter(programPath) {
          refs = createRefs(programPath, refs);
        },
        exit(__, { filename, opts }) {
          if (refs) {
            const reactPropsNode = injectReactProps(refs, filename, opts);
            if (reactPropsNode && !refs.propTypesImport) {
              debug('injecting missing import "%s" required', 'prop-types');
              refs.reactImport.insertAfter(createImport('PropTypes', 'prop-types'));
            }
          }
        },
      },
    },
  });
};
