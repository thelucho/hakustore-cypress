describe('HOME', () => {
  
  beforeEach(() => {
    cy.login()
    cy.fixture('products').then(products => {
      cy.intercept('GET', 'http://localhost:8000/products', products)
    }).as('items')
    cy.visit('/') 
  })

  it('Que se muestren los productos en la grilla', () => {
    cy.wait('@items').then(prods => {
      cy.get('[data-cy=products]').should('have.length', prods.response.body.length)
    })
  })

  it('Que en Iphone 6 se muestra el carrito al agregar un producto', () => {
    cy.viewport('iphone-6')
    cy.get('[data-cy=products]:first').find('.btn-danger').click()
    cy.get('[data-cy="cart"]').should('be.visible')
  })


  /*
  it('Puedo agregar productos al carrito y el carrito pasa a ser visible', () => {
    cy.get('[data-cy="cart"]').should('not.be.visible')

    cy.get('[data-cy=products]:first').find('.btn-danger').click()
    cy.get('[data-cy=products]:nth-child(4)').find('.btn-danger').click()
    
    cy.get('[data-cy="cart"]').should('be.visible')
    cy.get('[data-cy="cart"] > a').should('contain', '2 productos')
  })
  */

  /*
  it('Puedo eliminar lo que tiene el carrito', () => {
    cy.get('[data-cy=products]:first').find('.btn-danger').click()
    cy.get('[data-cy="cart"]').find('.close').click()
    cy.get('[data-cy="cart"]').should('not.be.visible')
  })
  */
})