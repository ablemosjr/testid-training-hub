// Testes E2E para a página de listagem de produtos
// Comentários em português para facilitar leitura

describe('Página de Produtos - Listagem', () => {
  beforeEach(() => {
    // visita a rota de produtos antes de cada teste
    cy.visit('/produtos')
  })

  it('Deve renderizar a página e os elementos principais', () => {
    cy.get('[data-test="page-produtos"]').should('exist')
    cy.get('[data-test="input-busca-produto"]').should('exist')
    cy.get('[data-test="table-produtos"]').should('exist')
    cy.get('[data-test^="produto-row-"]').should('have.length.at.least', 1)
  })

  it('Deve filtrar a lista ao buscar por nome', () => {
    // busca por parte do nome do produto (Mouse Wireless)
    cy.get('[data-test="input-busca-produto"]').type('Mouse')
    // o produto com id 2 (Mouse Wireless) deve permanecer
    cy.get('[data-test^="produto-row-"]').should('have.length', 1)
    cy.get('[data-test="produto-row-2"]').should('exist')
  })

  it('Deve excluir um produto da lista', () => {
    // garante que a linha do produto com id 1 existe
    cy.get('[data-test="produto-row-1"]').should('exist')

    // clica no botão excluir do produto 1
    cy.get('[data-test="button-excluir-produto-1"]').click()

    // após exclusão, a linha não deve existir mais
    cy.get('[data-test="produto-row-1"]').should('not.exist')

    // verificar toast de sucesso
    cy.contains('Produto excluído com sucesso!').should('exist')
  })

  it('Deve abrir edição de produto e navegar para detalhe/edição', () => {
    // clica no botão de editar do produto 3
    cy.get('[data-test="button-editar-produto-3"]').click()

    // deve navegar para a rota de produto/3
    cy.url().should('include', '/produto/3')
  })

  it('Deve adicionar um produto ao carrinho a partir da página de detalhe', () => {
    // visita a página de detalhe do produto 1
    cy.visit('/produto/1')

    // verifica se a página de detalhes carregou
    cy.get('[data-test="page-detalhes-produto"]').should('exist')

    // clica no botão de adicionar ao carrinho
    cy.get('[data-test="button-adicionar-carrinho"]').click()

    // valida se o toast de sucesso aparece
    cy.contains('Produto adicionado ao carrinho!').should('exist')
  })
})
