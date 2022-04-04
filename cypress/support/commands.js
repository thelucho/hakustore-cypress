// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

Cypress.Commands.add('login', () => {
  cy.visit('/')
  cy.fixture('user').then(credentials => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8000/auth/login',
      body: credentials
    }).then(response => {
      Cypress.env('token', response.body.access_token)
      localStorage.setItem('jwt', JSON.stringify(response.body.access_token))
    })
  })
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
Cypress.Commands.overwrite('request', (originalFn, ...options) => {
  const optionsObject = options[0];
  const token = Cypress.env('token');

  if (!!token && optionsObject === Object(optionsObject)) {
    optionsObject.headers = {
      authorization: 'Bearer ' + token,
      ...optionsObject.headers,
    };

    return originalFn(optionsObject);
  }

  return originalFn(...options);
})
