import React from 'react';
import StoreProvider from '@cnix-ui/store/StoreProvider';
import Workspace from '@cnix-ui/workspace';
import WidgetContainer from '@cnix-ui/core/Widget/WidgetContainer';
import WidgetControls from '@cnix-ui/widgets/WidgetControls';

const CnixUI = () => (
  <StoreProvider>
    <WidgetContainer widgets={[WidgetControls, WidgetControls]}>
      <Workspace />
    </WidgetContainer>
  </StoreProvider>
);

export default CnixUI;
