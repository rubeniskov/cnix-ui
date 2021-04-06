import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import hoistNonReactStatics from 'hoist-non-react-statics';

const withStyles = (stylesOrCreator, options) => (Component) => {
  const useStyles = createUseStyles(stylesOrCreator, options);

  const WithStyles = React.forwardRef((props, ref) => {
    const { className, classes: classesProp, innerRef } = props;
    const classes = useStyles({ ...Component.defaultProps, ...props });

    return (
      <Component
        ref={innerRef || ref}
        className={clsx(className, classes.root)}
        classes={{ classes, ...classesProp }}
      />
    );
  });

  WithStyles.defaultProps = {
    classes: {},
    innerRef: null,
    className: null,
  };

  WithStyles.propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string,
    }),
    className: PropTypes.string,
    innerRef: PropTypes.element,
  };

  hoistNonReactStatics(WithStyles, Component);

  return WithStyles;
};

export default withStyles;
