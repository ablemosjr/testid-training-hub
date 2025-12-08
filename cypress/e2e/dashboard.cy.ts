// Teste E2E para a página Dashboard
// Comentários explicativos em Português (pt-BR)

describe('Página Dashboard - testes E2E', () => {
  // Antes de cada teste, visitamos a rota /dashboard
  // Observação: o servidor de desenvolvimento deve estar rodando (npm run dev)
  beforeEach(() => {
    cy.visit('/dashboard')
  })

  it('Deve exibir o container principal e os cards de resumo', () => {
    // Verifica o container principal do dashboard
    cy.get('[data-test="page-dashboard"]').should('exist')

    // Verifica os cards de resumo (usuários, vendas, crescimento)
    cy.get('[data-test="card-resumo-usuarios"]').should('exist')
    cy.get('[data-test="card-resumo-vendas"]').should('exist')
    cy.get('[data-test="card-resumo-crescimento"]').should('exist')

    // Checa se os valores e labels estão visíveis dentro dos cards
    cy.get('[data-test="card-resumo-usuarios"]').within(() => {
      // verifica se o label existe
      cy.contains('Total de Usuários').should('exist')
      // verifica se o parágrafo que contém o valor não está vazio
      cy.get('p.text-2xl').should('not.have.text', '')
    })
  })

  it('Deve navegar para Relatórios ao clicar no botão correspondente', () => {
    // Verifica que o botão existe
    cy.get('[data-test="button-ir-para-relatorios"]').should('exist')

    // Clica no botão e verifica o redirecionamento para a rota /usuarios
    cy.get('[data-test="button-ir-para-relatorios"]').click()

    // Após o clique, a URL deve conter /usuarios
    cy.url().should('include', '/usuarios')

    // E a página de usuários deve ter seu container
    cy.get('[data-test="page-usuarios"]').should('exist')
  })
})
