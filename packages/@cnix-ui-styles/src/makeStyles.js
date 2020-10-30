/** @typedef {import(".").StyledRules} StyledRules */
import { createUseStyles } from 'react-jss';

/**
 * Return a useStyles hook which use the theme by context to fill the style rules.
 *
 * @param {StyledRules} rules
 * @returns {any}
 */
const makeStyles = (rules) => createUseStyles(rules);

export default makeStyles;
