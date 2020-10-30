const fs = require('fs');
const path = require('path');
const glob = require('glob');
const ttp = require('typescript-to-proptypes');

module.exports = ({
  cwd = process.cwd(),
  sources = 'src',
  pattern = '**/*.{js,d.ts,ts,tsx}',
  tsconfig = 'tsconfig.json',
  ...opts
}) => {
  let tsconfigOpts;
  const tsconfigFilename = path.resolve(cwd, tsconfig);
  if (fs.existsSync(tsconfigFilename)) {
    tsconfigOpts = ttp.loadConfig(path.resolve(cwd, tsconfig));
  }

  const files = glob.sync(pattern, {
    absolute: true,
    cwd: path.join(cwd, sources),
  });

  const program = ttp.createProgram(files, {
    ...tsconfigOpts,
    ...opts,
    allowJs: true,
  });

  return (filePath, parseOpts) => {
    const ast = ttp.parseFromProgram(filePath, program, {
      checkDeclarations: true,
      ...parseOpts,
    });

    if (!ast.body.length) { return {}; }

    return {
      ast,
      format: (formatOpts) => ttp.generate(ast, {
        includeJSDoc: true,
        ...formatOpts,
      }),
    };
  };
};
