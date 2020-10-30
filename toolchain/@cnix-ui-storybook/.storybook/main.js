// .storybook/main.js
const path = require('path');
const { existsSync } = require('fs');


const ignorePlugins = [
  'babel-plugin-add-react-displayname',
  'babel-plugin-emotion'
]

const ignoreWebpackPlugins = [
  'DocgenPlugin'
]

/*
overrides: Object.values(alias).map((packageDir) => {
  const configFile = path.join(packageDir, '.babelrc');
  return {
    test: packageDir,
    extends: configFile,
  };
}).filter(({ extends: $ }) => existsSync($))
*/

const babelrc = path.resolve(process.cwd(), '.babelrc');
const babelconfig = existsSync(babelrc) ? async (config) => ({
  // plugins: (options.plugins||[]).filter((plugin) => {
  //   const [name, opts] = Array.isArray(plugin) ? plugin : [plugin];
  //   // return false;
  //   return !new RegExp(`/${ignorePlugins.join('|')}/`).test(name)
  // }),
  overrides: [{
    test: /\.(mjs|tsx?|jsx?)$/,
    extends: babelrc
  }, ...config.overrides],
}) : null;

module.exports = {
  stories: [process.cwd() + '/src/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    require.resolve('storybook-dark-mode/register')
  ],
  babel: babelconfig ? babelconfig : undefined,
  webpackFinal: async (config) => {
    config.plugins = config.plugins.filter((plugin) => {
      return !ignoreWebpackPlugins.includes(plugin.constructor.name);
    });
    config.module.rules.unshift({
      test: /\.(js|ts|tsx)$/,
      loader: 'ify-loader',
    });
    return config;
  }
}
