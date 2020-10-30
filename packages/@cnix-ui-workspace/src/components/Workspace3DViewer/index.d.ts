export interface Props {
  /**
   * If `true`, the viewewr will disable mouse and keyboard events.
   * @default false
   */
  disabled?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
  };
}
