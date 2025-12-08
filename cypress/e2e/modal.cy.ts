// Testes E2E para a página de modal de confirmação
// Comentários em português explicam cada passo

describe('Modal de Confirmação', () => {
  beforeEach(() => {
    // visita a rota do modal antes de cada teste
    cy.visit('/modal')
  })

  it('Abre o modal e permite cancelar via botão', () => {
    // abre o modal
    cy.get('[data-test="button-abrir-modal"]').click()

    // modal e mensagem devem aparecer
    cy.get('[data-test="modal-confirmacao"]').should('be.visible')
    cy.get('[data-test="message-confirmacao"]').should('contain.text', 'excluir')

    // clica em cancelar e verifica que o modal fechou
    cy.get('[data-test="button-cancelar"]').click()
    cy.get('[data-test="modal-confirmacao"]').should('not.exist')
  })

  it('Fecha o modal ao clicar no overlay', () => {
    cy.get('[data-test="button-abrir-modal"]').click()
    cy.get('[data-test="modal-overlay"]').should('be.visible').click()
    cy.get('[data-test="modal-confirmacao"]').should('not.exist')
  })

  it('Confirma a ação e mostra toast de sucesso', () => {
    cy.get('[data-test="button-abrir-modal"]').click()

    // confirma a ação
    cy.get('[data-test="button-confirmar"]').click()

    // valida toast de sucesso e fechamento do modal
    cy.contains('Ação confirmada com sucesso!').should('exist')
    cy.get('[data-test="modal-confirmacao"]').should('not.exist')
  })
})
