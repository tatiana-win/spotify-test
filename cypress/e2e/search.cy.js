describe('test search', () => {
  beforeEach(() => {
    cy.intercept('GET', '/v1/search').as('searchMuse');
    cy.intercept('GET', '/v1/*', { fixture: 'search.json' }).as('searchMuse');
    window.localStorage.setItem(
      'token',
      JSON.stringify(
        'gBQAI8YWH7yiWmyoMOwPaIYeQz67--zDE5YxRKmxXSzSHGsMmZujK9dC2HpbSRKYFxRpoI7HugDgoVKqZp2RPdenXdq_eVx2OuMkKy-utc1qCQ1yJ4R7cvKBX6AVkYWOzw1cMQtgxqLDKZkYDg5-Rlxosj23aqs7J5xls-3b8i2lndRByMF3SKpGuo9i23xiy_0xaqCIo8O9tcQFz5aNq9CspKWP8KOc09NT9lPjpwjkZGO-6RdC4_30ew0qdFS6Cmg',
      ),
    );
    window.localStorage.setItem(
      'expiresAt',
      JSON.stringify(Date.now() + 3600 * 1000),
    );
    cy.visit('http://localhost:3000/search');
  });

  it('scenario 1', () => {
    cy.get('#search-page').should('exist');
    cy.get('#search-input').type('muse');
    cy.wait('@searchMuse');
    cy.contains('Artists').should('exist');
    cy.contains('Tracks').should('exist');

    cy.get('.artist-name').first().should('have.text', 'Muse');
    cy.get('.track-name').first().should('have.text', 'Hysteria');
  });
});
