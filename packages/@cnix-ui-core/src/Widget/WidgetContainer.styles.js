export default {
  '@global': {
    body: {
      backgroundColor: 'rgba(37, 37, 37)',
      margin: 0,
      padding: 0,
    },
  },
  root: {
    width: '100vw',
    height: '100vh',
  },
  backside: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  grid: {
    position: 'relative',
    transition: 'height 200ms ease',
    '& .react-grid-item': {
      transition: 'all 200ms ease',
      transitionProperty: 'left, top',
      '&.cssTransforms': {
        transitionProperty: 'transform',
      },
      '&.resizing': {
        zIndex: 1,
        willChange: 'width, height',
      },
      '&.react-draggable-dragging': {
        transition: 'none',
        zIndex: 3,
        willChange: 'transform',
      },
      '&.dropping': {
        visibility: 'hidden',
      },
      '&.react-grid-placeholder': {
        background: 'red',
        opacity: 0.2,
        transitionDuration: '100ms',
        zIndex: 2,
        userSelect: 'none',
      },
      '& > .react-resizable-handle': {
        position: 'absolute',
        width: '20px',
        height: '20px',
        bottom: 0,
        right: 0,
        cursor: 'se-resize',
      },
      '& > .react-resizable-handle::after': {
        content: '',
        position: 'absolute',
        right: '3px',
        bottom: '3px',
        width: '5px',
        height: '5px',
        borderRight: '2px solid rgba(0, 0, 0, 0.4)',
        borderBottom: '2px solid rgba(0, 0, 0, 0.4)',
      },
    },
    '& .react-resizable-hide > .react-resizable-handle': {
      display: 'none',
    },
    '& .react-resizable': {
      position: 'relative',
    },
    '& .react-resizable-handle': {
      position: 'absolute',
      width: '20px',
      height: '20px',
      backgroundRepeat: 'no-repeat',
      backgroundOrigin: 'content-box',
      boxSizing: 'border-box',
      backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+')",
      backgroundPosition: 'bottom right',
      padding: '0 3px 3px 0',
    },
    '& .react-resizable-handle-sw': {
      bottom: 0,
      left: 0,
      cursor: 'sw-resize',
      transform: 'rotate(90deg)',
    },
    '& .react-resizable-handle-se': {
      bottom: 0,
      right: 0,
      cursor: 'se-resize',
    },
    '& .react-resizable-handle-nw': {
      top: 0,
      left: 0,
      cursor: 'nw-resize',
      transform: 'rotate(180deg)',
    },
    '& .react-resizable-handle-ne': {
      top: 0,
      right: 0,
      cursor: 'ne-resize',
      transform: 'rotate(270deg)',
    },
    '& .react-resizable-handle-w, & .react-resizable-handle-e': {
      top: '50%',
      marginTop: '-10px',
      cursor: 'ew-resize',
    },
    '& .react-resizable-handle-w': {
      left: 0,
      transform: 'rotate(135deg)',
    },
    '& .react-resizable-handle-e': {
      right: 0,
      transform: 'rotate(315deg)',
    },
    '& .react-resizable-handle-n,&.react-resizable-handle-s': {
      left: '50%',
      marginLeft: '-10px',
      cursor: 'ns-resize',
    },
    '& .react-resizable-handle-n': {
      top: 0,
      transform: 'rotate(225deg)',
    },
    '& .react-resizable-handle-s': {
      bottom: 0,
      transform: 'rotate(45deg)',
    },
  },
};
