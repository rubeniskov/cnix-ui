import React from 'react';
import Workspace3DViewer from './Workspace3DViewer';

export default {
  title: '3D Viewer',
  component: Workspace3DViewer,
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export const Basic = (props) => <Workspace3DViewer {...props} />;
