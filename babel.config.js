const { existsSync } = require('fs');
const path = require('path');
const alias = require('./utils/alias');

module.exports = (api) => {
  const useESModules = api.env(['legacy', 'modern', 'stable']);

  const presets = [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
        debug: process.env.MUI_BUILD_VERBOSE === 'true',
        modules: useESModules ? false : 'commonjs',
        shippedProposals: api.env('modern'),
      },
    ],
    '@babel/preset-react',
  ];

  const plugins = [
    ['babel-plugin-module-resolver',
      {
        root: ['./src/'],
        alias,
      }],
  ];

  return {
    presets,
    plugins,
    overrides: Object.values(alias).map((packageDir) => {
      const configFile = path.join(packageDir, '.babelrc');
      return {
        test: packageDir,
        extends: configFile,
      };
    }).filter(({ extends: $ }) => existsSync($)),
  };
};
