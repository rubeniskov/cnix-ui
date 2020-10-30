import React, { memo, forwardRef } from 'react';
import SvgIcon from '@cnix-ui/core/SvgIcon';

const createSvgIcon = (displayName, viewBox, path) => {
  const Component = (props, ref) => (
    <SvgIcon data-testid={`${displayName}Icon`} ref={ref} {...props} viewBox={viewBox}>
      {path}
    </SvgIcon>
  );

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = `${displayName}Icon`;
  }

  return memo(forwardRef(Component));
};

export default createSvgIcon;
