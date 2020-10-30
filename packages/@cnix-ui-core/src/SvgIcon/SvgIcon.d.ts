import * as React from 'react';
import { CommonProps } from '..';



export interface SygIconProps extends CommonProps,  {
  /**
     * Node passed into the SVG element.
     */
    children?: React.ReactNode,
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
     */
    color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error',
    /**
     * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
     */
    fontSize?: 'inherit' | 'default' | 'small' | 'large',
    /**
     * Override the default viewboxApplies a color attribute to the SVG element.
     */
    viewBox?: string,
}
