Cypress.Commands.add('login', () => {
  cy.fixture('user').then(credentials => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8000/auth/login',
      body: credentials
    }).then(response => {
      localStorage.setItem('jwt', JSON.stringify(response.body.access_token))
    })
  })
})


/*
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
*/
