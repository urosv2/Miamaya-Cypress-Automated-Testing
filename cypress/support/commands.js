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
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
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
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {

    cy.get('[data-test="userIcon"]').click();
    cy.get('[data-test="emailLogin"]').type('uros.rasic@cubes.rs');
    cy.get('[data-test="passwordLogin"]').type('majkmc123');
    cy.get('[data-test="loginButton"]').click();

    // cy.wait(2000);

    // cy.get('[data-test="userIcon"]').click();

});

Cypress.Commands.add('generateRandomEmail', () => {

    const timestamp = Date.now();
    const randomEmail = `test${timestamp}@example.com`;
    return randomEmail;

});

Cypress.Commands.add('generateRandomPhoneNumber', () => {

    const randomDigits = Math.floor(1000000 + Math.random() * 1000000);
    return `+3816${randomDigits}`;
});

Cypress.Commands.add('turnOffPopup' , () => {

    cy.get('iframe.mf-notification-iframe', { timeout: 10000 })
  .its('0.contentDocument.body').should('not.be.empty')
  .then(cy.wrap)
  .find('.mf-notification-close a')
  .should('be.visible')
  .click({ force: true });


  


})

Cypress.Commands.add('chooseProductByTitle', ()=> {

    cy.visit('https://miamaya.cubesdev.rs/kategorija/odeca/majice');

    cy.get('[data-test="productList"]')
    .find('[data-test="single-product"]').eq(0)
    .within(()=> {
        cy.get('[data-test="productTitleOnList"').click();
    })

})

