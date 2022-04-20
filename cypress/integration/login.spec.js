describe('LOGIN', () => {

  it('Podemos loguearnos correctamente sin usar la UI', () => {
    cy.login()
    cy.visit('/')
  })
  
})