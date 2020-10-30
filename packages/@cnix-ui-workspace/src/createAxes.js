// module.exports = createBackgroundCube;

// const createBuffer = require('gl-buffer');
// const createVAO = require('gl-vao');
// const glslify = require('glslify');

// const createShader = glslify({
//   vert: './shaders/backgroundVert.glsl',
//   frag: './shaders/backgroundFrag.glsl',
// });

// function BackgroundCube(gl, buffer, vao, shader) {
//   this.gl = gl;
//   this.buffer = buffer;
//   this.vao = vao;
//   this.shader = shader;
// }

// const proto = BackgroundCube.prototype;

// proto.draw = function (model, view, projection, bounds, enable, colors) {
//   this.shader.bind();
//   this.shader.uniforms = {
//     model,
//     view,
//     projection,
//     bounds,
//     enable,
//     colors,
//   };
//   this.vao.bind();
//   this.vao.draw(this.gl.TRIANGLES, 36);
// };

// proto.dispose = function () {
//   this.vao.dispose();
//   this.buffer.dispose();
//   this.shader.dispose();
// };

// function createBackgroundCube(gl) {
//   // Create cube vertices
//   const vertices = [];
//   const indices = [];
//   let ptr = 0;
//   for (let d = 0; d < 3; ++d) {
//     let u = (d + 1) % 3;
//     let v = (d + 2) % 3;
//     const x = [0, 0, 0];
//     const c = [0, 0, 0];
//     for (let s = -1; s <= 1; s += 2) {
//       indices.push(ptr, ptr + 2, ptr + 1,
//         ptr + 1, ptr + 2, ptr + 3);
//       x[d] = s;
//       c[d] = s;
//       for (let i = -1; i <= 1; i += 2) {
//         x[u] = i;
//         for (let j = -1; j <= 1; j += 2) {
//           x[v] = j;
//           vertices.push(x[0], x[1], x[2],
//             c[0], c[1], c[2]);
//           ptr += 1;
//         }
//       }
//       // Swap u and v
//       const tt = u;
//       u = v;
//       v = tt;
//     }
//   }

//   // Allocate buffer and vertex array
//   const buffer = createBuffer(gl, new Float32Array(vertices));
//   const elements = createBuffer(gl, new Uint16Array(indices), gl.ELEMENT_ARRAY_BUFFER);
//   const vao = createVAO(gl, [
//     {
//       buffer,
//       type: gl.FLOAT,
//       size: 3,
//       offset: 0,
//       stride: 24,
//     },
//     {
//       buffer,
//       type: gl.FLOAT,
//       size: 3,
//       offset: 12,
//       stride: 24,
//     },
//   ], elements);

//   // Create shader object
//   const shader = createShader(gl);
//   shader.attributes.position.location = 0;
//   shader.attributes.normal.location = 1;

//   return new BackgroundCube(gl, buffer, vao, shader);
// }
