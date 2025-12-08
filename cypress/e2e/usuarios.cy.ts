// Testes E2E para a página de listagem de usuários
// Comentários em português explicam cada passo para facilitar leitura

describe('Página de Usuários - Listagem', () => {
  beforeEach(() => {
    // visita a rota de usuários antes de cada teste
    cy.visit('/usuarios')
  })

  it('Deve renderizar a página e os elementos principais', () => {
    // Verifica se o container da página existe
    cy.get('[data-test="page-usuarios"]').should('exist')

    // Verifica se o campo de busca está presente
    cy.get('[data-test="input-busca-usuario"]').should('exist')

    // Verifica se a tabela de usuários está presente
    cy.get('[data-test="table-usuarios"]').should('exist')

    // Verifica que pelo menos uma linha de usuário (mock) está visível
    cy.get('[data-test^="user-row-"]').should('have.length.at.least', 1)
  })

  it('Deve filtrar a lista ao buscar por nome ou email', () => {
    // digita um nome que sabemos existir no mock (Maria)
    cy.get('[data-test="input-busca-usuario"]').type('Maria')

    // somente a linha do usuário Maria (id 2) deve permanecer
    cy.get('[data-test^="user-row-"]').should('have.length', 1)
    cy.get('[data-test="user-row-2"]').should('exist')
  })

  it('Deve permitir excluir um usuário da lista', () => {
    // garante que a linha do usuário com id 1 existe
    cy.get('[data-test="user-row-1"]').should('exist')

    // clica no botão excluir do usuário 1
    cy.get('[data-test="button-excluir-usuario-1"]').click()

    // após exclusão, a linha não deve existir mais
    cy.get('[data-test="user-row-1"]').should('not.exist')
  })

  it('Deve clicar em Novo Usuário, preencher o formulário e salvar', () => {
    // clica no link/button que cria novo usuário
    cy.contains('+ Novo Usuário').click()

    // deve navegar para a rota de novo usuário
    cy.url().should('include', '/usuario/novo')

    // o formulário deve estar visível
    cy.get('[data-test="form-usuario"]').should('exist')

    // preenche os campos do formulário
    cy.get('[data-test="input-nome"]').type('Teste Cypress')
    cy.get('[data-test="input-email"]').type('cypress.teste@example.com')
    // seleciona o tipo como Administrador (valor do option é 'admin')
    cy.get('[data-test="select-tipo-usuario"]')
      .should('exist')
      .select('admin')
      .should('have.value', 'admin')

    // submete o formulário
    cy.get('[data-test="button-salvar"]').click()

    // após salvar, deve voltar para a listagem de usuários
    cy.url().should('include', '/usuarios')

    // e a página de usuários deve existir
    cy.get('[data-test="page-usuarios"]').should('exist')

    // opcional: verificar a presença do toast de sucesso
    cy.contains('Usuário cadastrado!').should('exist')
  })

  it('Deve editar um usuário existente, alterar campos e salvar', () => {
    // clica no botão de editar do usuário com id 2
    cy.get('[data-test="button-editar-usuario-2"]').click()

    // deve navegar para a rota de edição do usuário
    cy.url().should('include', '/usuario/2')

    // o formulário deve existir e estar em modo edição
    cy.get('[data-test="form-usuario"]').should('exist')

    // altera os campos do formulário
    cy.get('[data-test="input-nome"]').clear().type('Maria Editada')
    cy.get('[data-test="input-email"]').clear().type('maria.editada@example.com')
    cy.get('[data-test="select-tipo-usuario"]').should('exist').select('viewer').should('have.value', 'viewer')

    // submete o formulário
    cy.get('[data-test="button-salvar"]').click()

    // após salvar, deve voltar para a listagem de usuários
    cy.url().should('include', '/usuarios')

    // deve aparecer o toast de atualização
    cy.contains('Usuário atualizado!').should('exist')
  })

  it('Deve abrir edição de usuário, não alterar nada e salvar', () => {
    // escolhe o usuário 3 para abrir a edição
    cy.get('[data-test="button-editar-usuario-3"]').click()

    // deve navegar para a rota de edição do usuário
    cy.url().should('include', '/usuario/3')

    // o formulário de edição deve estar visível
    cy.get('[data-test="form-usuario"]').should('exist')

    // não altera nenhum campo, apenas salva
    cy.get('[data-test="button-salvar"]').click()

    // valida retorno para a listagem e toast de sucesso
    cy.url().should('include', '/usuarios')
    cy.contains('Usuário atualizado!').should('exist')
  })
})
