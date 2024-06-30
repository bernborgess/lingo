describe('Respondendo a questão de forma errada', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')

    });

    it('faz login e responde a questão', () => {
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
        cy.get('[data-testID="word-5"]').click()
        cy.get('[data-testID="button"]').click()
        cy.contains('Wrong Answer!')
    });

})