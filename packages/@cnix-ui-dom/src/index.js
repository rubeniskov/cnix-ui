// @ts-check
import React from 'react';
import { render } from 'react-dom';
import CnixUI from './CnixUI';

export default (element, options, cb) => render(<CnixUI {...options} />, element, cb);
