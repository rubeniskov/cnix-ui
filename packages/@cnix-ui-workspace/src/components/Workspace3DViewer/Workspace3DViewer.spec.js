context('Actions', () => {
  beforeEach(() => {
    cy.story('3d-viewer--basic');
    cy.wait(600);
    cy.screenshot('load');
  });

  afterEach(() => {
    cy.screenshot('end');
  });

  it('canvas - rotate by default with turnable mode', () => {
    cy.get('canvas')
      .trigger('mousedown', {
        which: 1,
        pageX: 500,
        pageY: 330,
      })
      .trigger('mousemove', {
        which: 1,
        pageX: 500 + 100,
        pageY: 330,
      })
      .trigger('mouseup');
  });
});
