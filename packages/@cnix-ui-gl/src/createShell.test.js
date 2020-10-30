import '@cnix-ui/test/setupBrowser';
import test from '@cnix-ui/test';
import sinon from '@cnix-ui/test/sinon';
import createShell from './createShell';

test('should return a setup function', (t) => {
  const setup = createShell();
  t.is(typeof setup, 'function');
});

test('should return shell api instance', (t) => {
  const setup = sinon.spy(createShell());
  const gl = {};
  const shell = setup(gl);

  t.deepEqual(Object.keys(shell), ['attach', 'detach', 'add']);
});
