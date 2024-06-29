describe('Criar Nova Conta', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:5173/')
    });
    
    it('Acessa tela de criação de conta e preenche formulário', () => {
    cy.contains('Sign Up').click()

    const uniqueUser = `testeCypress${Date.now()}`
    const uniqueEmail = `teste${Date.now()}@cypress.com`

    cy.get('[data-testID="form-input-user"]').should('exist')
    cy.get('[data-testID="form-input-email"]').should('exist')
    cy.get('[data-testID="form-input-password"]').should('exist')
    cy.wait(1000)
    cy.get('[data-testID="form-input-user"]').type(uniqueUser)
    cy.wait(1000)
    cy.get('[data-testID="form-input-email"]').type(uniqueEmail)
    cy.wait(1000)
    cy.get('[data-testID="form-input-password"]').type('cypress@teste')
    cy.wait(1000)
    cy.get('[data-testID="button"]').click()

    cy.get('[data-testID="form"]').should('exist')
    cy.get('[data-testID="form-input"]').should('exist')
    cy.get('[data-testID="form-input-user"]').should('exist')
    cy.get('[data-testID="form-input-password"]').should('exist')
    cy.wait(500)
    cy.get('[data-testID="form-input-user"]').type(uniqueUser)
    cy.wait(500)
    
    cy.get('[data-testID="form-input-password"]').type('cypress@teste')
    cy.wait(500)
    cy.get('[data-testID="button"]').click()

    cy.get('[data-testID="card"]').should('exist')
  });
})