describe('Registration testing', () => {

    
    

    let name = ' ';
    let email = '';
    let phoneNumber = '';
    let password = '';
    let nonValidEmail = '';
    let existingEmail = '';
    let nonValidPhoneNumber = '';
    let shortPassword = '';
    let longPassword = '';
    let caseSensitivityTestMail = '';


    before(function() {

        Cypress.on('uncaught:exception', (err, runnable) => {//kod sprecava pucanje testova zbog nebitnih exception-a
            return false
         })


    });

    beforeEach(function() {

        cy.viewport(1280,720)// modifikujemo dimenzije automatskog browsera radi boljeg funkcionisanja testa
        cy.visit('/')
        // cy.turnOffPopup();
        cy.contains('Dozvoli sve').should('exist')
        cy.contains('Dozvoli sve').click();
        cy.get('[data-test="userIcon"]').click();
        cy.get('.loginPopup_registrationLink__AFSmp')
        .click();
    });

    // Negative test cases


    it('TC01- should not be clickable if fields are empty', () => {

        cy.get('[data-test="registerButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');


    });

    it('TC02-empty string registration', () => {

        cy.get('[data-test="nameSurnameRegistration"]').as('nameField')
        .type(' ');
        cy.get('@nameField')
        .parent()
        .find('p.errorMessage')// bug- ne prikazuje se poruka o gresci ako se unese space
        .should('be.visible');
        cy.get('[data-test="emailRegistration"]')
        .type(' ');
        cy.get('.input_error__g1FJt > p:nth-child(4)')
        .should('be.visible');
        cy.get('[data-test="phoneRegistration"]')
        .type(' ');
        cy.get('div.registerForm_formGroup__Uvsv8:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('be.visible');
        cy.get('[data-test="passwordRegistration"]')
        .type(' ');
        cy.get('p.errorMessage:nth-child(5)')
        .should('be.visible')
        cy.get('[data-test="registerButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/');
    });

    it('TC03-should not be clickable with name only', () => {
        cy.get('[data-test="nameSurnameRegistration"]')
        .type(name);
        cy.get('[data-test="emailRegistration"]')
        .type(' ');
        cy.get('.input_error__g1FJt > p:nth-child(4)')
        .should('be.visible');
        cy.get('[data-test="phoneRegistration"]')
        .type(' ');
        cy.get('div.registerForm_formGroup__Uvsv8:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('be.visible');
        cy.get('[data-test="passwordRegistration"]')
        .type(' ');
        cy.get('p.errorMessage:nth-child(5)')
        .should('be.visible');
        cy.get('[data-test="termsOfUse"]')
        .click();
        cy.get('[data-test="registerButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/');
    });

    it('TC04-should not be clickable with email only', () => {

        
        cy.get('[data-test="emailRegistration"]')
        .type(email);
        cy.get('[data-test="termsOfUse"]')
        .click();
        cy.get('[data-test="registerButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/');
    });

    it('TC05-should not be clickable with phone number only', () => {

        cy.get('[data-test="phoneRegistration"]')
        .type(phoneNumber);
        cy.get('[data-test="termsOfUse"]')
        .click();
        cy.get('[data-test="registerButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');
    });

    it('TC06-should not be clickable with password only', () => {

        cy.get('[data-test="passwordRegistration"]')
        .type(password);
        cy.get('[data-test="termsOfUse"]')
        .click();
        cy.get('[data-test="registerButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');
    });

    it('TC07-should not be clickable without checking the terms of use', () => {

        cy.get('[data-test="nameSurnameRegistration"]')
        .type(name);
        cy.get('[data-test="emailRegistration"]')
        .type(email);
        cy.get('[data-test="phoneRegistration"]')
        .type(phoneNumber);
        cy.get('[data-test="passwordRegistration"]')
        .type(password);
        cy.get('[data-test="registerButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');


    });

    it('TC08-should not be clickable without name', () => {

        cy.get('[data-test="emailRegistration"]')
        .type(email);
        cy.get('[data-test="phoneRegistration"]')
        .type(phoneNumber);
        cy.get('[data-test="passwordRegistration"]')
        .type(password);
        cy.get('[data-test="termsOfUse"]')
        .click();
        cy.get('[data-test="registerButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');


    });

    it('TC09-should not be clickable without email', () => {

        cy.get('[data-test="nameSurnameRegistration"]')
        .type(name);
        cy.get('[data-test="phoneRegistration"]')
        .type(phoneNumber);
        cy.get('[data-test="passwordRegistration"]')
        .type(password);
        cy.get('[data-test="termsOfUse"]')
        .click();
        cy.get('[data-test="registerButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');

        
    });

    it('TC10-should not be clickable without password', () => {

        cy.get('[data-test="nameSurnameRegistration"]')
        .type(name);
        cy.get('[data-test="emailRegistration"]')
        .type(email);
        cy.get('[data-test="phoneRegistration"]')
        .type(phoneNumber);
        cy.get('[data-test="termsOfUse"]')
        .click();
        cy.get('[data-test="registerButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');

    });

    it('TC11- should not be clickable with non valid email', () => {

        cy.get('[data-test="nameSurnameRegistration"]')
        .type(name);
        cy.get('[data-test="emailRegistration"]')
        .type(nonValidEmail);
        cy.get('div.registerForm_formGroup__Uvsv8:nth-child(2) > div:nth-child(1) > p:nth-child(4)')
        .contains('Neispravan format email adrese.')
        .should('be.visible');
        cy.get('[data-test="phoneRegistration"]')
        .type(phoneNumber);
        cy.get('[data-test="passwordRegistration"]')
        .type(password);
        cy.get('[data-test="termsOfUse"]')
        .click();
        cy.get('[data-test="registerButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');
    });

    it('TC12- should not be able to register with existing email', () => {

        cy.get('[data-test="nameSurnameRegistration"]')
        .type(name);
        cy.get('[data-test="emailRegistration"]')
        .type(existingEmail);
        cy.get('[data-test="phoneRegistration"]')
        .type(phoneNumber);
        cy.get('[data-test="passwordRegistration"]')
        .type(password);
        cy.get('[data-test="termsOfUse"]')
        .click();
        cy.get('[data-test="registerButton"]')
        .click();
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');
        cy.get('p.errorMessage:nth-child(5)')
        .contains('Ne možete se registrovati sa unetim podacima')
        .should('be.visible')
    });

    it('TC13- should not be clickable with non valid phone number', () => {

        cy.get('[data-test="nameSurnameRegistration"]')
        .type(name);
        cy.get('[data-test="emailRegistration"]')
        .type(email);
        cy.get('[data-test="phoneRegistration"]')
        .type(nonValidPhoneNumber);
        cy.get('.input_error__g1FJt > p:nth-child(4)')
        .contains('Telefon mora biti u ispravnom formatu')
        .should('be.visible');
        cy.get('[data-test="passwordRegistration"]')
        .type(password);
        cy.get('[data-test="termsOfUse"]')
        .click();
        cy.get('button.button_button__HcCCQ:nth-child(7)')
        .should('be.disabled');
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');
    });

    it('TC14- should not be clickable with a too short password', () => {

        cy.get('[data-test="nameSurnameRegistration"]')
        .type(name);
        cy.get('[data-test="emailRegistration"]')
        .type(email);
        cy.get('[data-test="phoneRegistration"]')
        .type(phoneNumber);
        cy.get('[data-test="passwordRegistration"]')
        .type(shortPassword);
        cy.get('p.errorMessage:nth-child(5)')
        .contains('Broj karaktera mora biti minimum 8')
        .should('be.visible')
        cy.get('[data-test="termsOfUse"]')
        .click();
        cy.get('[data-test="registerButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');
    });

    it('TC15- should not be able to register with a too long password', () => {
        cy.get('[data-test="nameSurnameRegistration"]')
        .type(name);
        cy.get('[data-test="emailRegistration"]')
        .type(email);
        cy.get('[data-test="phoneRegistration"]')
        .type(phoneNumber);
        cy.get('[data-test="passwordRegistration"]')
        .type(longPassword);
        cy.get('[data-test="termsOfUse"]')
        .click();
        cy.get('[data-test="registerButton"]')
        .click();
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('be.visible');
        cy.get('p.errorMessage:nth-child(5)')
        .contains('Ne možete se registrovati sa unetim podacima')
        .should('be.visible')
    });

    // Positive test cases

    it('TC16- view password button should turn dots into text', () => {

        cy.get('[data-test="passwordRegistration"]').as('password')
        .should('exist')
        .and('have.attr', 'type', 'password')
        .type('12345678');

        cy.get('figure.input_passwordEye__wFpmZ')
        .should('be.visible')
        .click();

        cy.get('@password')
        .should('have.attr', 'type', 'text')
        .and('have.value', '12345678');
    });

    it('TC17-testing case sensitive registration-should not register', () => {

        cy.get('[data-test="nameSurnameRegistration"]')
        .type(name);
        cy.get('[data-test="emailRegistration"]')
        .type(caseSensitivityTestMail); // Upisujemo Uros.rasic@cubes.rs. Postojeci mail je uros.rasic@cubes.rs
        cy.get('[data-test="phoneRegistration"]')
        .type('+381654324543');
        cy.get('[data-test="passwordRegistration"]')
        .type(password);
        cy.get('[data-test="termsOfUse"]')
        .click();
        cy.get('[data-test="registerButton"]')
        .click();
        cy.get('.errorMessage')
        .contains('Ne možete se registrovati sa unetim podacima')
        .should('be.visible');
        cy.get('.loginPopup_unloggedWindow__xLYwT').as('registrationPoppup');
        cy.get('@registrationPoppup')
        .should('be.visible');


    });

    // it('TC18- successful registration', () => {

    //     cy.generateRandomEmail().then((email) => { //Generisemo random email i izvlacimo ga u varijablu, pisemo u funkciji da bi mogli da joj pristupimo

    //         cy.generateRandomPhoneNumber().then((phoneNumber) => { //Generisemo random broj telefona i takodje otvaramo novu funkciju radi pristupu broja

    //             cy.get('[data-test="nameSurnameRegistration"]')
    //             .type('Nikola Nikolic');
    //             cy.get('[data-test="emailRegistration"]')
    //             .type(email);
    //             cy.get('[data-test="phoneRegistration"]')
    //             .type(phoneNumber);
    //             cy.get('[data-test="passwordRegistration"]')
    //             .type(password);
    //             cy.get('[data-test="termsOfUse"]')
    //             .click();
    //             cy.get('[data-test="registerButton"]')
    //             .click();
    //             cy.get('.profilePopup_loggedInWindow__ow4pG p') 
    //             .should('contain.text', 'Nikola Nikolic'); 

    //         });

    //     });
    // });

    // TEST JE ZAKOMENTARISAN KAKO SE NE BI PUNIO STAGING NEPOTREBNIM NALOZIMA


});

