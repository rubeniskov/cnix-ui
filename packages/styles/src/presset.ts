import functions from 'jss-plugin-rule-value-function';
import global from 'jss-plugin-global';
import nested from 'jss-plugin-nested';
import camelCase from 'jss-plugin-camel-case';
import template from 'jss-plugin-template';
import defaultUnit from 'jss-plugin-default-unit';
import vendorPrefixer from 'jss-plugin-vendor-prefixer';
import propsSort from 'jss-plugin-props-sort';

export default () => ({
  plugins: [
    functions(),
    global(),
    nested(),
    camelCase(),
    defaultUnit(),
    template(),
    typeof window === 'undefined' ? null : vendorPrefixer(),
    propsSort(),
  ],

});
