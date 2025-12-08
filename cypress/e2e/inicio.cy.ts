describe('Página Início (Index)', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('exibe container e elementos principais com data-test', () => {
    cy.get('[data-test="page-home"]').should('exist')
    cy.get('[data-test="hero-titulo"]').should('exist')
    cy.get('[data-test="hero-subtitulo"]').should('exist')
    cy.get('[data-test="button-comecar"]').should('exist')
  })
})
