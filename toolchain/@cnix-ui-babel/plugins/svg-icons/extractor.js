const cheerio = require('cheerio');
const { readFileSync } = require('fs');

const extractSvg = (source, selector) => {
  const svgSourceContent = readFileSync(source, { encoding: 'utf8' });
  return cheerio.load(svgSourceContent)(selector).html();
};

module.exports = extractSvg;
