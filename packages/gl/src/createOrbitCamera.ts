// import createCamera from 'orbit-camera';
// import createScroll from 'scroll-speed';
// import mp from 'mouse-position';
// import mb from 'mouse-pressed';
// import key from 'key-pressed';

// const panSpeed = 1;

// module.exports = attachCamera;

// function attachCamera(canvas, opts) {
//   opts = opts || {};
//   opts.pan = opts.pan !== false;
//   opts.scale = opts.scale !== false;
//   opts.rotate = opts.rotate !== false;

//   const scroll = createScroll(canvas, opts.scale);
//   const mbut = mb(canvas, opts.rotate);
//   const mpos = mp(canvas);
//   const camera = createCamera(
//     [0, 10, 30],
//     [0, 0, 0],
//     [0, 1, 0],
//   );

//   camera.tick = tick;

//   return camera;

//   function tick() {
//     const ctrl = key('<control>') || key('<alt>');
//     const alt = key('<shift>');
//     const { height } = canvas;
//     const { width } = canvas;

//     if (opts.rotate && mbut.left && !ctrl && !alt) {
//       camera.rotate(
//         [mpos.x / width - 0.5, mpos.y / height - 0.5],
//         [mpos.prevX / width - 0.5, mpos.prevY / height - 0.5],
//       );
//     }

//     if (opts.pan && mbut.right || (mbut.left && ctrl && !alt)) {
//       camera.pan([
//         panSpeed * (mpos.x - mpos.prevX) / width,
//         panSpeed * (mpos.y - mpos.prevY) / height,
//       ]);
//     }

//     if (opts.scale && scroll[1]) {
//       camera.distance *= Math.exp(scroll[1] / height);
//     }

//     if (opts.scale && (mbut.middle || (mbut.left && !ctrl && alt))) {
//       const d = mpos.y - mpos.prevY;
//       if (!d) return;

//       camera.distance *= Math.exp(d / height);
//     }

//     scroll.flush();
//     mpos.flush();
//   }
// }
