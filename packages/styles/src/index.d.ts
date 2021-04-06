import React, { ClassAttributes } from 'react';

export type Theme = {};

/**
 * Defines what kind of types are allowed to use for identify a styled rule
 */
export type RuleKey = string | number | symbol;

/**
 * String tag css definition 
 * @example
 * ```javascript
 * const css = `
 *   background-color: red;
 *   color: blue;
 * `
 * ```
 */
export interface RuleDefinitionCssTag extends string {};

/**
 * Object css properties definition
 * @example
 * ```javascript
 * const css = {
 *  "background-color": 'red',
 *  "textAlign": 'center',
 *  "color": 'blue',
 * }
 * ```
 */
export interface RuleDefinitionCssProperties extends React.CSSProperties {};


/**
 * 
 */
export type RuleDefinitionCallback = (props: any) => RuleDefinitionCssProperties | RuleDefinitionCssTag;

/**
 * Allows
 * @see RuleDefinitionCallback function executed when component did mount
 * @see RuleDefinitionCssProperties css properties object
 * @see RuleDefinitionCssTag string definition or tagged 
 */
export type RuleDefinition = RuleDefinitionCssTag | RuleDefinitionCssProperties | RuleDefinitionCallback;

/**
 * 
 */
export type Rules = Record<RuleKey, RuleDefinition>;

/**
 * Styled rules structure
 */
export type StyledRules = (theme: Theme) => Rules | Rules;

/**
 * 
 */
export interface ThemeProps {
  theme?: Theme
}

/**
 * 
 */
export interface StyledProps extends ThemeProps {
  classes?: Record<string, string>,
  className?: string,
}
