// @ts-check
const { declare } = require('@babel/helper-plugin-utils');
const t = require('@babel/types');
const extractor = require('./extractor');

const createRefs = (programPath, state, opts) => {
  const {
    extensions = '.svg',
  } = { ...opts };

  programPath.traverse({
    ImportDefaultSpecifier(path) {
      console.log('yeah');
      const matchExtensions = new RegExp(`(${extensions.split(/,/).join('|')})$`);
      console.log(matchExtensions);
      const { value: svgPath } = path.node.source;
      if (matchExtensions.test(svgPath)) {
        state.svgImports.push(path);
      }
    },
    CallExpression(path) {
      console.log('CallExpression', path);
      const matchExtensions = new RegExp(`(${extensions.split(/,/).join('|')})$`);
      const { callee: { name: calleeName }, arguments: args } = path.node;

      if (calleeName !== 'require' || !args.length || !t.isStringLiteral(args[0])) {
        return;
      }

      const [{ value: svgPath }] = args;
      if (matchExtensions.test(svgPath)) {
        state.svgImports.push(path);
      }
    },
  });
};

/**
 *
 * @param {any} babel
 * @param {*} gopts
 */
const BabelPluginSvgIcons = declare((api, gopts) => {
  // console.log(api);
  const {
    // @ts-ignore
    source,
    // @ts-ignore
    selector,
  } = { ...gopts };

  if (source && selector) {
    console.log(extractor(source, selector));
  }

  return ({
    name: 'svg-icons',
    visitor: {
      Program: {
        enter(path, state) {
          createRefs(path, state);
        },
      },
    },
  });
});

module.exports = BabelPluginSvgIcons;
