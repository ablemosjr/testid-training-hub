// Testes de paginação para `TabelaPaginadaPage`
// Comentários em PT-BR explicam cada passo

describe('Tabela Paginada - Navegação', () => {
  beforeEach(() => {
    // visita a rota onde a tabela paginada está registrada
    cy.visit('/tabela')
  })

  it('Deve mostrar a primeira página corretamente', () => {
    cy.get('[data-test="table-itens"]').should('exist')

    // informação de paginação deve indicar 1-5 de 25
    cy.get('[data-test="pagination-info"]').should('contain.text', 'Mostrando 1-5 de 25 itens')

    // linhas 1..5 devem existir, 6 não
    cy.get('[data-test="item-row-1"]').should('exist')
    cy.get('[data-test="item-row-5"]').should('exist')
    cy.get('[data-test="item-row-6"]').should('not.exist')
  })

  it('Deve avançar para a próxima página e mostrar itens 6-10', () => {
    // clica no botão próximo
    cy.get('[data-test="pagination-next"]').click()

    // verifica info de paginação
    cy.get('[data-test="pagination-info"]').should('contain.text', 'Mostrando 6-10 de 25 itens')

    // verifica que item 6 existe e item 5 não
    cy.get('[data-test="item-row-6"]').should('exist')
    cy.get('[data-test="item-row-5"]').should('not.exist')
  })

  it('Deve ir para a página 3 clicando no número e depois voltar', () => {
    // clica no botão de página 3 (botões numéricos gerados na UI)
    cy.contains('button', '3').click()

    cy.get('[data-test="pagination-info"]').should('contain.text', 'Mostrando 11-15 de 25 itens')

    // volta para a página anterior
    cy.get('[data-test="pagination-prev"]').click()
    cy.get('[data-test="pagination-info"]').should('contain.text', 'Mostrando 6-10 de 25 itens')
  })

  it('Deve navegar até a última página e validar controles desabilitados', () => {
    // avançar até a última página
    cy.get('[data-test="pagination-next"]').click()
    cy.get('[data-test="pagination-next"]').click()
    cy.get('[data-test="pagination-next"]').click()
    cy.get('[data-test="pagination-next"]').click()

    // última página (5) deve mostrar 21-25
    cy.get('[data-test="pagination-info"]').should('contain.text', 'Mostrando 21-25 de 25 itens')

    // botão next deve estar desabilitado
    cy.get('[data-test="pagination-next"]').should('be.disabled')

    // botão prev deve estar habilitado
    cy.get('[data-test="pagination-prev"]').should('not.be.disabled')
  })
})
