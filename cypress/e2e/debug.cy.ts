// Cypress spec para reproduzir um erro no DebugForm e pausar a execução
// Abra o Cypress com `npx cypress open` para usar o modo interativo.

describe('Debug Form - pausar em erro', () => {
  it('dispara erro 500 e pausa a execução para inspeção', () => {
    cy.visit('/debug-form');

    cy.get('[data-test="page-debug-form"]').should('exist');

    // preencher campos
    cy.get('[data-test="input-debug-nome"]').clear().type('Teste de Erro');
    cy.get('[data-test="input-debug-email"]').clear().type('erro@example.com');

    // selecionar modo que retorna 500
    cy.get('[data-test="select-debug-mode"]').select('500').should('have.value', '500');

    // habilitar o checkbox que executa `debugger;` no front-end quando ocorrer erro
    cy.get('[data-test="checkbox-debug-break"]').check().should('be.checked');

    // enviar o formulário
    cy.get('[data-test="button-debug-submit"]').click();

    // Pausa o runner do Cypress para permitir inspeção manual.
    // No modo interativo, abra a janela do AUT (app) e o DevTools (F12) ou conecte o VS Code
    // ao Chrome para capturar o ponto onde o `debugger;` parou.
    cy.pause();

    // Depois de retomar manualmente a execução, validar que houve erro na saída
    cy.get('[data-test="pre-debug-output"]', { timeout: 10000 }).should('contain.text', 'ERROR');
  });
});
