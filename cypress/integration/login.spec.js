/// <reference types="Cypress" />

describe('Login', () => {
  it('Se puede loguear correctamente sin la UI', () => {
    cy.login()
    cy.visit('/')
    cy.get('[data-cy=hero]').should('contain', 'Bienvenidos al store de Hakuna')
  })
})