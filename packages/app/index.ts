import { render } from 'react-dom';
import { createElement } from 'react';
import App from './src/App'

render(createElement(App), document.body.appendChild(document.createElement('div')))