/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import makeStyles from '@cnix-ui/styles/makeStyles';
import styles from './WidgetContainer.styles';

export const useStyles = makeStyles(styles);

const ResponsiveGridLayout = WidthProvider(Responsive);

const getLayoutsFromSomewhere = () => ({
  lg: [{
    i: 'widget-0', x: 0, y: 0, w: 2, h: 2, minW: 4, maxW: 4,
  }, {
    i: 'workspace', x: 2, y: 0, w: 8, h: 5, minW: 2, minH: 3, maxH: 5, static: true,
  }, {
    i: 'widget-1', x: 10, y: 0, w: 2, h: 4,
  }],
});

const WidgetContainer = ({
  children,
  widgets,
  ...restProps
}) => {
  const classes = useStyles(restProps);
  const layouts = getLayoutsFromSomewhere();
  console.log(children);
  return (
    <div className={classes.root}>
      <div className={classes.backside}>
        {children}
      </div>
      <ResponsiveGridLayout
        className={classes.grid}
        layouts={layouts}
        breakpoints={{
          lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0,
        }}
        cols={{
          lg: 12, md: 10, sm: 6, xs: 4, xxs: 2,
        }}
      >
        <div key="workspace" />
        {widgets.map((Widget, idx) => <Widget key={`widget-${idx}`} />)}
      </ResponsiveGridLayout>
    </div>
  );
};

export default WidgetContainer;
