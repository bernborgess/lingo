describe('Criar Nova Conta', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:5173/')
    });
    
    it('Acessa tela de criação de conta e preenche formulário', () => {
    cy.contains('Sign Up').click()
    cy.get('[data-testID="form-input-user"]').should('exist')
    cy.get('[data-testID="form-input-email"]').should('exist')
    cy.get('[data-testID="form-input-password"]').should('exist')
    cy.wait(1000)
    cy.get('[data-testID="form-input-user"]').type('testeCypress')
    cy.wait(1000)
    cy.get('[data-testID="form-input-email"]').type('teste@cypress.com')
    cy.wait(1000)
    cy.get('[data-testID="form-input-password"]').type('cypress@teste')
    cy.wait(1000)
    cy.get('[data-testID="button"]').click()

    cy.get('[data-testID="form"]').should('exist')
    cy.get('[data-testID="form-input"]').should('exist')
    cy.get('[data-testID="form-input-user"]').should('exist')
    cy.get('[data-testID="form-input-password"]').should('exist')
    cy.wait(500)
    cy.get('[data-testID="form-input-user"]').type('testeCypress')
    cy.wait(500)
    
    cy.get('[data-testID="form-input-password"]').type('cypress@teste')
    cy.wait(500)
    cy.get('[data-testID="button"]').click()

    cy.get('[data-testID="card"]').should('exist')
  });
})