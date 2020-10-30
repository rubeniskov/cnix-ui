const CnixUIDom = require('@cnix-ui/dom');

// Browser
if (global.document) {
  let element = document.getElementById('app');
  if (!element) {
    element = document.createElement('div');
    document.body.appendChild(element);
  }
  CnixUIDom(element);
}
