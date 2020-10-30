const { declare } = require('@babel/helper-plugin-utils');
const importToRequire = require('babel-plugin-import-to-require');

module.exports = declare((api) => {
  api.assertVersion(7);

  return {
    plugins: [
      [importToRequire, {
        modules: [
          'glslify',
        ],
      }],
    ],
  };
});
