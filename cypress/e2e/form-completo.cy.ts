// Spec Cypress para percorrer o FormCompletoPage
// Comentários em português explicam cada passo

describe('Formulário Completo - Fluxo E2E', () => {
  beforeEach(() => {
    cy.visit('/form-completo')
  })

  it('Deve validar campos obrigatórios ao submeter vazio', () => {
    cy.get('[data-test="page-form-completo"]').should('exist')

    // submete vazio
    cy.get('[data-test="button-salvar-form"]').click()

    // valida erros de obrigatoriedade
    cy.get('[data-test="error-form-nome"]').should('exist').and('contain.text', 'Nome é obrigatório')
    cy.get('[data-test="error-form-email"]').should('exist').and('contain.text', 'Email é obrigatório')
  })

  it('Deve preencher o formulário, gerenciar dependentes e submeter com sucesso', () => {
    // preencher campos principais
    cy.get('[data-test="input-form-nome"]').type('Teste Automação')
    cy.get('[data-test="input-form-email"]').type('teste@example.com')

    // testar máscara de telefone: digitar apenas números e validar formato
    cy.get('[data-test="input-form-telefone"]').type('11987654321')
    cy.get('[data-test="input-form-telefone"]').should('have.value', '(11) 98765-4321')

    // idade
    cy.get('[data-test="input-form-idade"]').clear().type('30')

    // select país
    cy.get('[data-test="select-form-pais"]').select('Brasil').should('have.value', 'Brasil')

    // radio gênero
    cy.get('[data-test="radio-form-genero-f"]').check().should('be.checked')

    // checkboxes múltiplos
    cy.get('[data-test="checkbox-form-interesse-0"]').check().should('be.checked')
    cy.get('[data-test="checkbox-form-interesse-1"]').check().should('be.checked')

    // observações
    cy.get('[data-test="textarea-form-observacoes"]').type('Observações de teste')

    // adicionar dois dependentes
    cy.get('[data-test="button-adicionar-dependente"]').click()
    cy.get('[data-test="button-adicionar-dependente"]').click()

    // preencher dependentes
    cy.get('[data-test="input-dependente-nome-0"]').type('Dependente Um')
    cy.get('[data-test="input-dependente-idade-0"]').type('10')

    cy.get('[data-test="input-dependente-nome-1"]').type('Dependente Dois')
    cy.get('[data-test="input-dependente-idade-1"]').type('8')

    // remover o segundo dependente e validar que foi removido
    cy.get('[data-test="button-remover-dependente-1"]').click()
    cy.get('[data-test="dependente-row-1"]').should('not.exist')

    // anexa avatar (arquivo colocado em /cypress/fixtures/avatar.jpeg)
    cy.get('[data-test="input-form-avatar"]').selectFile('cypress/fixtures/avatar.jpeg', { force: true })

    // opcional: validar que o input recebeu o arquivo
    cy.get('[data-test="input-form-avatar"]').then($input => {
      const el = $input[0] as HTMLInputElement
      expect(el.files && el.files.length).to.be.greaterThan(0)
    })

    // submeter o formulário
    cy.get('[data-test="button-salvar-form"]').click()

    // validar toast de sucesso
    cy.contains('Formulário enviado com sucesso!').should('exist')
  })
})
