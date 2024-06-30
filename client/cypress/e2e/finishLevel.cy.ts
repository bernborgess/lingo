describe('Respondendo a todas as questões corretamente', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:5173/')
    
  });
  
  it('faz login e responde as questões', () => {
    cy.get('[data-testID="form"]').should('exist')
    cy.get('[data-testID="form-input"]').should('exist')
    cy.get('[data-testID="form-input-user"]').should('exist')
    cy.get('[data-testID="form-input-password"]').should('exist')
    cy.wait(500)
    cy.get('[data-testID="form-input-user"]').type('string')
    cy.wait(500)
    
    cy.get('[data-testID="form-input-password"]').type('string')
    cy.wait(500)
    cy.get('[data-testID="button"]').click()

    cy.get('[data-testID="card"]').should('exist')
    cy.get('[data-testID="card-button-0"]').should('exist')

    cy.get('[data-testID="card-button-0"]').click()
    cy.get('[data-testID="word-1"]').click()
    cy.get('[data-testID="word-2"]').click()
    cy.get('[data-testID="word-3"]').click()
    cy.get('[data-testID="word-4"]').click()
    cy.get('[data-testID="button"]').click()
    cy.contains('Excellent!')

    cy.get('[data-testID="button"]').click()
    cy.get('[data-testID="button-0"]').click()
    cy.contains('Excellent!')
    cy.get('[data-testID="button"]').click()
    cy.get('[data-testID="card"]').should('exist')

  });

})