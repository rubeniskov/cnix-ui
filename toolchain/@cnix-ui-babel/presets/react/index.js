const { declare } = require('@babel/helper-plugin-utils');

const presetEnv = require('@babel/preset-env');
const presetReact = require('@babel/preset-react');
const presetTypeScript = require('@babel/preset-typescript');
const pluginTypeScriptReactProps = require('@cnix-ui/babel-plugin-typescript-react-props');

const transformReactJSX = require('@babel/plugin-transform-react-jsx');
const transformReactJSXDevelopment = require('@babel/plugin-transform-react-jsx-development');
const transformReactDisplayName = require('@babel/plugin-transform-react-display-name');
const transformReactJSXSource = require('@babel/plugin-transform-react-jsx-source');
const transformReactJSXSelf = require('@babel/plugin-transform-react-jsx-self');
const transformReactPure = require('@babel/plugin-transform-react-pure-annotations');

module.exports = declare((api) => {
  api.assertVersion(7);

  return {
    presets: [
      presetEnv,
      presetReact,
      presetTypeScript,
    ],
    // plugins: [
    //   transformReactJSX,
    // ],
    // env: {
    //   development: {
    //     plugins: [
    //       pluginTypeScriptReactProps,
    //     ],
    //   },
    // },
  };
});
