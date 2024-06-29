describe('Login', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:5173/')
    
  });
  
  it('preenche form de login', () => {
    cy.get('[data-testID="form"]').should('exist')
    cy.get('[data-testID="form-input"]').should('exist')
    cy.get('[data-testID="form-input-user"]').should('exist')
    cy.get('[data-testID="form-input-password"]').should('exist')
    cy.wait(500)
    cy.get('[data-testID="form-input-user"]').type('string')
    cy.wait(500)
    
    cy.get('[data-testID="form-input-password"]').type('string')
    cy.wait(500)
    cy.contains('Login').click()
  });
  it('verifica se temos acesso a página home', () => {
    cy.visit('http://localhost:5173/app')

    cy.get('[data-testID="card"]').should('exist')
  })
})