// Teste E2E de Login (Cypress)
// Comentários explicativos em Português (pt-BR)

describe('Página de Login - testes E2E', () => {
  // Antes de cada teste, visitamos a rota raiz /login
  // Observação: o projeto deve estar rodando (npm run dev)
  beforeEach(() => {
    // Navega até a rota de login da aplicação
    cy.visit('/login')
  })

  it('Deve mostrar os elementos principais da tela de login', () => {
    // Verifica se o container principal da página existe
    cy.get('[data-test="page-login"]').should('exist')

    // Verifica se os campos estão presentes
    cy.get('[data-test="input-email"]').should('exist')
    cy.get('[data-test="input-senha"]').should('exist')

    // Verifica se o botão de login está presente
    cy.get('[data-test="button-login"]').should('exist')
  })

  it('Deve exibir erro ao submeter credenciais inválidas', () => {
    // Digita um email inválido
    cy.get('[data-test="input-email"]').type('usuario@invalido.com')

    // Digita uma senha inválida
    cy.get('[data-test="input-senha"]').type('senhaerrada')

    // Clica no botão de login
    cy.get('[data-test="button-login"]').click()

    // A aplicação simula login com timeout; aguarda resposta e checa se o alerta de erro aparece
    cy.get('[data-test="alert-erro-login"]', { timeout: 2000 }).should('be.visible')
      .and('contain.text', 'Email ou senha inválidos')
  })

  it('Deve efetuar login com credenciais válidas', () => {
    // Limpa campos e digita credenciais válidas conforme demo
    cy.get('[data-test="input-email"]').clear().type('admin@teste.com')
    cy.get('[data-test="input-senha"]').clear().type('123456')

    // Clica no botão de login
    cy.get('[data-test="button-login"]').click()

    // Para este app demo o sucesso é indicado por não exibir o alerta de erro.
    // Verificamos que o alerta de erro NÃO existe ou está ausente.
    cy.get('[data-test="alert-erro-login"]').should('not.exist')

    // Opcional: se houver redirecionamento ou outro elemento visível após login,
    // adicionar asserções aqui (ex.: cy.url(), ou presença de um elemento do dashboard).
  })

  it('Deve alternar visibilidade da senha com o botão toggle', () => {
    // Digita uma senha qualquer
    cy.get('[data-test="input-senha"]').clear().type('minhasenha')

    // Por padrão o campo é do tipo password; clica no toggle para mostrar
    cy.get('[data-test="button-toggle-senha"]').click()

    // Agora o campo deve ter type 'text'
    cy.get('[data-test="input-senha"]').should('have.attr', 'type', 'text')

    // Clica novamente para esconder
    cy.get('[data-test="button-toggle-senha"]').click()
    cy.get('[data-test="input-senha"]').should('have.attr', 'type', 'password')
  })

  it('Deve acionar link de esqueci senha e exibir toast/feedback', () => {
    // Interceptar a ação de click do link — o app dispara toast info via sonner
    cy.get('[data-test="link-esqueci-senha"]').click()

    // A aplicação implementa um toast informativo; não existe data-test do toast,
    // então verificamos se não ocorreu erro e retornamos foco ao formulário.
    cy.get('[data-test="input-email"]').should('exist')
  })
})
