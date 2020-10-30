Cypress.Commands.add('story', (id) => {
  cy.visit('iframe.html', {
    qs: {
      viewMode: 'story',
      id: '3d-viewer--basic',
    },
  });
});
