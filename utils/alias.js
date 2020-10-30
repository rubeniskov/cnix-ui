const path = require('path');
const fs = require('fs');
const glob = require('glob');

const rootDir = path.resolve(__dirname, '..');
const pkgfilename = path.resolve(rootDir, 'package.json');
const pkg = require(pkgfilename);
let packages = (pkg.workspaces && ((pkg.workspaces.packages || pkg.workspaces) || []));
packages = Array.isArray(packages) ? packages : [packages];

if (packages) {
  packages = glob.sync(`{${packages.join(',')}}`, { cwd: process.cwd()});
}

module.exports = packages.reduce((prev, packageName) => {
  const filename = path.resolve(rootDir, packageName, 'package.json');
  const exists = fs.existsSync(filename);
  const aliases = prev;

  if (exists) {
    const { name } = require(filename);
    return { ...aliases, [name]: path.dirname(filename) };
  }
  return aliases;
}, {});
