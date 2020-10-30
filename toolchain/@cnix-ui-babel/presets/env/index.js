const { declare } = require('@babel/helper-plugin-utils');

const presetEnv = require('@babel/preset-env');

module.exports = declare((api) => {
  api.assertVersion(7);

  return {
    presets: [
      presetEnv,
    ],
  };
});
