const { renameSync } = require('fs');

module.exports = (on, config) => {
  on('after:screenshot', ({ path }) => {
    renameSync(path, path.replace(/ \(\d*\)/i, ''));
  });

  return config;
};
