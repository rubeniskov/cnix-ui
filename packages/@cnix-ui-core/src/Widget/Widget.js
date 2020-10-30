import React from 'react';
import useWidget from './useWidget';

export const Widget = ({
  children,
  name,
}) => {
  const widgets = useWidget();
  return (
    <div>{children}</div>
  );
};

export default Widget;
