const importToRequire = require('babel-plugin-import-to-require');

module.exports = (babel, opts) => importToRequire(babel, {
  ...opts,
  modules: [
    'glslify',
  ],
});
