// @ts-check
/** @typedef {import("./SvgIcon").SygIconProps} SvgIconProps */
import * as React from 'react';
import makeStyles from '@cnix-ui/styles/makeStyles';
import styles from './SvgIcon.styles';

export const useStyles = makeStyles(styles);

/**
 * Creates a svg using the children as content of the icon
 *
 * @param {SvgIconProps} props
 */
export const SvgIcon = React.forwardRef(({
  children,
  viewBox = '0 0 24 24',
  component: Component = 'svg',
  ...restProps
}, ref) => {
  const classes = useStyles(restProps);
  return (
    <Component ref={ref} viewBox={viewBox} className={classes.root} focusable="false" {...restProps}>
      {children}
    </Component>
  );
});

export default SvgIcon;
