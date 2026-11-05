

describe('Login testing', () => {

   

    let validEmail = '';
    let validEmailUpperCase = '';
    let validPassword = '';
    let shortPassword = '';
    let longPassword = '';
    let nonValidEmail = '';
    let validPhoneNumber = '+';
    let nonValidPhoneNumber = '';
    let requiredFieldErrorMessage = '';

    

    before(function() {
      //dodata komanda kako cypress testovi ne bi pucali
        Cypress.on('uncaught:exception', (err, runnable) => {
                        return false
                     })
          
        
        
        

        
    
        
        

        
        
    });

    beforeEach(function(){
        cy.viewport(1280,720)//modifikovane dimenzije automatskog browsera radi boljeg funkcionisanja testova
        cy.visit('')
        cy.contains('Dozvoli sve').should('exist')
        cy.contains('Dozvoli sve').click({ force: true});
        cy.get('[data-test="userIcon"]').click();
        // cy.turnOffPopup();
        cy.get('input[type="text"]').clear();
        cy.get('input[type="password"]').clear();


    });

    // negativni test caseovi

    
    it('TC01-should not be clickable if fields are empty', () => {
        cy.get('[data-test="loginButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_loginModal__lFjwR')
        .should('be.visible');
            


    });

    it('TC02-empty string login', () => {
        cy.get('[data-test="emailLogin"]').type(' ');//upisivanje praznog stringa u email polje
        cy.get('p.errorMessage:nth-child(4)')
        .contains(requiredFieldErrorMessage).eq(0)
        .should('be.visible');//provera error poruke
        cy.get('[data-test="passwordLogin"]').type(' ');//upisivanje praznog stringa u password polje
        cy.get('p.errorMessage:nth-child(5)')
        .contains(requiredFieldErrorMessage)
        .should('be.visible');//provera error poruke
        
        cy.get('[data-test="loginButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_loginModal__lFjwR')
        .should('be.visible');// proveravamo da li je forma za login ostala prisutna
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/');//proveravamo da li smo ostali na istom url-u



    });

    it('TC03-empty string email', () => {

        cy.get('[data-test="emailLogin"]').type(' ');
        cy.get('p.errorMessage:nth-child(4)')
        .should('be.visible')
        cy.get('[data-test="passwordLogin"]')
        .as('passwordField').type(validPassword); //unosimo validnu sifru deklarisanu na pocektu dokumenta
        cy.get('@passwordField')
        .parent()
        .find('p.errorMessage')
        .should('not.exist');
        cy.get('[data-test="loginButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_loginModal__lFjwR')
        .should('be.visible');
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/');
        
    })

    it('TC04-valid email, empty password login', ()=> {

        cy.get('[data-test="emailLogin"]').as('emailField').type(validEmail);//unosimo validan registrovani e-mail
        cy.get('@emailField')
        .parent()
        .find('p.errorMessage')
        .should('not.exist');
        cy.get('[data-test="passwordLogin"]').type(' ');
        cy.get('p.errorMessage:nth-child(5)')
        .contains(requiredFieldErrorMessage)
        .should('be.visible');
        cy.get('[data-test="loginButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_loginModal__lFjwR')
        .should('be.visible');
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/');
        
        
    })

    it('TC05-valid email, short password login', () => {

        cy.get('[data-test="emailLogin"]').as('emailField').type(validEmail);
        cy.get('@emailField')
        .parent()
        .find('p.errorMessage')
        .should('not.exist');
        cy.get('[data-test="passwordLogin"]')
        .type(shortPassword);//unosimo 7 karaktera(minimalna dozvoljena duzina je 8)da bi dobili gresku
        cy.get('p.errorMessage:nth-child(5)')
        .contains('Broj karaktera mora biti minimum 8')
        .should('be.visible');
        cy.get('[data-test="loginButton"]')
        .should('be.disabled');
        cy.get('.loginPopup_loginModal__lFjwR')
        .should('be.visible');
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/');

    })

    it('TC06-valid email, long password login', () => {

        cy.get('[data-test="emailLogin"]').as('emailField').type(validEmail);
        cy.get('@emailField')
        .parent()
        .find('p.errorMessage')
        .should('not.exist');
        cy.get('[data-test="passwordLogin"]').type(longPassword);// sifra sa preko 15 karaktera, sto je preko dozvoljenog limita
        cy.get('[data-test="loginButton"]')
        .click();
        cy.contains('Pogrešna lozinka ili e-mail/tel. broj')
        .should('be.visible');
        cy.get('.loginPopup_loginModal__lFjwR')
        .should('be.visible');
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/');
    })

    it('TC07-non-valid email login', () => {
        cy.get('[data-test="emailLogin"]').type(nonValidEmail);// nevalidan odnosno nepostojeci email
        cy.get('[data-test="passwordLogin"]').type(validPassword);
        cy.get('[data-test="loginButton"]')
        .click({ force: true});
        cy.contains('Pogrešna lozinka ili e-mail/tel. broj')
        .should('be.visible');
        cy.get('.loginPopup_loginModal__lFjwR')
        .should('be.visible');
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/');

        
    })

    it('TC08-non-valid phone number login', () => {
        cy.get('[data-test="emailLogin"]').type(nonValidPhoneNumber);
        cy.get('[data-test="passwordLogin"]').type(validPassword);
        cy.get('[data-test="loginButton"]')
        .click();
        cy.contains('Pogrešna lozinka ili e-mail/tel. broj')
        .should('be.visible');
        cy.get('.loginPopup_loginModal__lFjwR')
        .should('be.visible');
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/');

        
    })

     it('TC09-reset password with non-valid format email', () => {

         cy.url().should('eq', 'https://miamaya.cubesdev.rs/');
         cy.get('[data-test="resetPasswordLink"]')
         .click();
         cy.url().should('eq', 'https://miamaya.cubesdev.rs/reset-password/reset-password-request');// proveramo da li smo otisli na change password url

         cy.window().then((win) => {// ovim kodom sprecavamo da nas automatski scrolluje na dno stranice prilikom promene url-a
            win.onscroll = null;
          });

          cy.document().then((doc) => {
            doc.body.style.position = 'fixed'; 
          });

         cy.get('input[id="email"]')
         .scrollIntoView({ easing: 'linear', duration: 0 })//ovom komandom instant scrolujemo do elementa bez gubljenja vremena na smooth animaciju
         .should('be.visible')
         .type('fsdadaa');
          
         cy.get('button.button_dark__dL5Jq:nth-child(2)')
         .contains('Potvrdi')
        .should('be.disabled');
         cy.get('.resetPasswordRequestForm_input__vyL6f > p:nth-child(4)')
         .contains('Neispravan format email adrese.')
         .should('be.visible')


     })

     it('TC10-reset password with non-existent email', () => {

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/');
        cy.get('[data-test="resetPasswordLink"]')
         .click();
         cy.url().should('eq', 'https://miamaya.cubesdev.rs/reset-password/reset-password-request');

         cy.window().then((win) => {
            win.onscroll = null;
          });

          cy.document().then((doc) => {
            doc.body.style.position = 'fixed'; 
          });

         cy.get('input[id="email"]')
         .scrollIntoView({ easing: 'linear', duration: 0 })
         .should('be.visible')
         .type('blabla#$$@gmail.com', {force: true});// forsiramo click na element iako mozda nije vidljiv u tom trenutku
         cy.get('button.button_dark__dL5Jq:nth-child(2)')
         .contains('Potvrdi')
         .click();
         cy.get('.toaster_content__1QX8C' ,{ timeout:2000})// timeout:2000 pauzira izvrsavanje koda na 2 sekunde dok se ne pojavi trazeni element
         .should('exist')
         .and('contain', 'Ne postoji korisnik sa unetom email adresom!')


         

    })

    //pozitivni test case-ovi

    it('TC11- reseting the password using valid email', () => {

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/');
        cy.get('[data-test="resetPasswordLink"]')
         .click();
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/reset-password/reset-password-request');

         cy.window().then((win) => {
            win.onscroll = null;
          });

          cy.document().then((doc) => {
            doc.body.style.position = 'fixed'; 
          });

          cy.get('input[id="email"]')
         .scrollIntoView({ easing: 'linear', duration: 0 })
         .should('be.visible')
         .type(validEmail);
         cy.get('button.button_dark__dL5Jq:nth-child(2)')
         .contains('Potvrdi')
         .click();
         cy.get('.toaster_content__1QX8C' ,{ timeout:2000})
         .should('exist')
         .and('contain', 'Uskoro će Vam biti poslat email sa linkom stranice na kojoj ćete promeniti lozinku!')


    })

    it('TC12- view password button should turn dots into text', () => {

        cy.get('[data-test="passwordLogin"]').as('password')
        .should('exist')
        .and('have.attr', 'type', 'password')
        .type('12345678');

        cy.get('figure.input_passwordEye__wFpmZ')
        .should('be.visible')
        .click();

        cy.get('@password')
        .should('have.attr', 'type', 'text')
        .and('have.value', '12345678');
    })

    it('TC13-valid login', () => {

        cy.get('[data-test="emailLogin"]').type(validEmail)
        cy.get('[data-test="passwordLogin"]').type(validPassword)
        cy.get('[data-test="loginButton"]')
        .click();
        cy.get('.profilePopup_loggedInWindow__ow4pG p') 
        .should('contain.text', 'Nikola Nikolic'); 
        cy.get('.profilePopup_optionsWrapper__coI0r .button_light__tVtXb')
        .should('be.visible');
        cy.get('.profilePopup_optionsWrapper__coI0r .button_dark__dL5Jq')
        .should('be.visible');
    });

    it('TC14- close the form by clicking the x button', () => {

        cy.get('.loginPopup_closeModal__o7Ek2')
        .click();
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('not.be.visible');
        

        
    });


    it('TC15- login via valid email with changed case- should still login', () => {

        cy.get('[data-test="emailLogin"]').type(validEmailUpperCase);//unosimo postojeci mail sa velikim prvim slovom(trebalo bi da nas uloguje)
        cy.get('[data-test="passwordLogin"]').type(validPassword)
        cy.get('[data-test="loginButton"]')
        .click();
        cy.get('.profilePopup_loggedInWindow__ow4pG p') 
        .should('contain.text', 'Nikola Nikolic'); //proveravamo da li na profil pop-up prozoru stoji validno ime naloga
        cy.get('.profilePopup_optionsWrapper__coI0r .button_light__tVtXb')
        .should('be.visible');
        cy.get('.profilePopup_optionsWrapper__coI0r .button_dark__dL5Jq')
        .should('be.visible');
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/');
        


    });

    

    it('TC16- logout', () => {

        cy.get('[data-test="emailLogin"]').type(validEmail)
        cy.get('[data-test="passwordLogin"]').type(validPassword)
        cy.get('[data-test="loginButton"]')
        .click();
        cy.get('.profilePopup_loggedInWindow__ow4pG p') 
        .should('contain.text', 'Nikola Nikolic'); 
        cy.get('.profilePopup_optionsWrapper__coI0r .button_dark__dL5Jq')
        .should('be.visible');
        cy.get('[data-test="logoutButton"]')
        .should('be.visible')
        .contains('Odjavi se')
        .click();
        cy.get('.toaster_content__1QX8C' ,{ timeout:2000})
        .should('exist')
        .and('contain', 'Uspešno ste se odjavili!');
        cy.get('.loginPopup_unloggedWindow__xLYwT')
        .should('exist');
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/');

    



        
    });

   

    
       
      
      

});