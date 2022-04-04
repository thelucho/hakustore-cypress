/// <reference types="Cypress" />

describe('Manage by API', () => {
  beforeEach(() => {
    cy.login()
  })

  it('GET', () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/products'
    }

    cy.request(options).then(response => { 
      expect(response.status).equal(200)
      expect(response.body).to.not.be.null
    })
  })

  it('POST', () => {
    const product = {
      title: "Producto testing",
      price: 300,
      description: "Your perfect pack for everyday use and walks in the forest. ",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    }

    const options = {
      method: 'POST',
      url: 'http://localhost:8000/products',
      body: product
    }

    cy.request(options).then(response => {
      expect(response.status).equal(201)
      expect(response.body).to.not.be.null
      expect(response.body.title).equal(product.title)
    })
  })

  it('DELETE', () => {
    const id = 13
    const options = {
      method: 'DELETE',
      url: `http://localhost:8000/products/${id}`
    }

    cy.request(options).then(response => {
      cy.log(response)
      expect(response.status).equal(200)
    })
  })
})