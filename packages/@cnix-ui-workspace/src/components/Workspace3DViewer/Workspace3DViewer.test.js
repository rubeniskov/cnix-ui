const test = require('@cnix-ui/test');

test('foo', (t) => {
  t.pass();
});

test('bar', async (t) => {
  const bar = Promise.resolve('bar');
  t.is(await bar, 'bar');
});

// Button.test.js

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';

// import { Primary } from './Button.stories';

// it('renders the button in the primary state', () => {
//   render(<Primary {...Primary.args} />);
//   expect(screen.getByRole('button')).toHaveTextContent('Primary');
// });
