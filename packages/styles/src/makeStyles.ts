import { createUseStyles, Styles } from 'react-jss';


/**
 * Return a useStyles hook which use the theme by context to fill the styles.
 */
const makeStyles = (rules: Styles) => createUseStyles(rules);

export default makeStyles;
