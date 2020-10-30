/* eslint-disable global-require */
const plugins = [require('./webgl'), require('./screenshoot')];

module.exports = (on, config) => plugins.forEach((plugin) => plugin(on, config));
