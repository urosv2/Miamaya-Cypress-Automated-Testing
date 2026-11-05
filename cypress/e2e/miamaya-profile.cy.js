describe('profile section testing', { scrollBehavior: 'center'},function()   {

    before(function() {
    
        Cypress.on('uncaught:exception', (err, runnable) => {
                        return false
                     });

        // Cypress.on('uncaught:exception', (err, runnable) => {

        //             if(err.message.includes('Hydration failed')){
        //                 return false;
        //             }
        //             return true;
        // });
          
        
        
        
  
        });
  
    beforeEach(function(){
        cy.viewport(1400,1000) //1280,720
        cy.visit('')
        // cy.turnOffPopup();
        cy.contains('Dozvoli sve').should('exist')
        cy.contains('Dozvoli sve').click({ force: true});
        
  
       
  
  
    });

    it('TC01-testing "Moj nalog" button- should take us to account page', () => {

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('button[type="button"]')
        .contains('Moj nalog')
        .click({ force: true});

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog');

        cy.get('.profileStart_title__jr1XI').as('profilePageTitle')
        .contains('Dobrodošli Uros')
        .should('be.visible')
        cy.get('.profileStart_description__96Gbl').as('profilePageDescription')
        .contains('Ovde možete brzo i lako pogledati vaše porudžbine i urediti lične podatke')
        .should('be.visible')
        cy.get('.profileStart_wrapper__HOa1O').as('profileOptions')
        .find('a[href="/profil/nalog/porudzbine-povrati"]').contains('Porudžbine i povrati')
        .should('be.visible')
        cy.get('@profileOptions')
        .find('a[href="/profil/lista-zelja"]').contains('Lista želja')
        .should('be.visible')
        cy.get('@profileOptions')
        .find('a[href="/profil/nalog/adrese"]').contains('Adrese')
        .should('be.visible')
        cy.get('@profileOptions')
        .find('a[href="/profil/nalog/podesavanje-naloga"]').contains('Podešavanje naloga')
        .should('be.visible')
        cy.get('a[href="/profil/nalog/moja-interesovanja"]').contains('Moja interesovanja')
        .should('be.visible')
        cy.get('button[type="button"]')
        .contains('Odjavi me');
    });
 
    it('TC02-testing "Porudzbine i povrati" link-should take us to valid page', () => {

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/porudzbine-povrati"]').contains('Porudžbine i povrati')
        .click();
        
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/porudzbine-povrati');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Porudžbine i povrati')
        .should('be.visible')
        cy.get('.ordersReturns_body__R5Ylz').as('allOrders')
        .should('be.visible');

    });

    it('TC03- testing-Porudzbine i povrati- reviewing order in orders page', () => {
        

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/porudzbine-povrati"]').contains('Porudžbine i povrati')
        .click();
        
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/porudzbine-povrati');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Porudžbine i povrati')
        .should('be.visible')
        cy.get('.ordersReturns_body__R5Ylz').as('allOrders')
        .should('be.visible');
        cy.get('@allOrders')
        .find('.ordersReturns_row__xmSNR').as('firstOrder')
        .first()
        cy.get('@firstOrder')
        .first()
        .find('.ordersReturns_value__J5CwI').eq(0).as('orderNumber')
        cy.get('@orderNumber').then(($number) => {
            const orderNumber = $number.text() ;

            cy.get('@firstOrder')
            .find('a')
            .first()
            .click();
    
            cy.url().should('contain', 'https://miamaya.cubesdev.rs/profil/porudzbina');
    
            cy.get('.order_title__BG3w2').as('pageTitle')
            .contains('Pregled porudžbine')
            .should('be.visible')
            cy.get('.order_orderNumber__Gm5ie').then(($number2) => {

                const orderNumber2 = $number2.text();

                assert.equal(orderNumber, orderNumber2);

            });
            
           
        });

        cy.get('a[href="/profil/nalog/porudzbine-povrati"]').as('backButton')
        .should('be.visible')
        cy.get('.order_productsWrapper__fXqcn').as('orderedProducts')
        .should('be.visible');




    });

    // it('TC04-Porudzbine i povrati-testing the receipt functionality', () => {

    //     cy.login();
    //     cy.get('[data-test="profilePopup"]')
    //     .should('contain.text', 'Uros Rasic');
    //     cy.get('a[href="/profil/nalog/porudzbine-povrati"]').contains('Porudžbine i povrati')
    //     .click();
        
    //     cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/porudzbine-povrati');

    //     cy.get('.subpage_title__cD39_').as('pageTitle')
    //     .contains('Porudžbine i povrati')
    //     .should('be.visible')
    //     cy.get('.ordersReturns_body__R5Ylz').as('allOrders')
    //     .should('be.visible');
    //     cy.get('@allOrders')
    //     .find('.ordersReturns_row__xmSNR').eq(0).as('firstOrder')
    //     .find('a')
    //     .first()
    //     .click();

        

    //     cy.get('a').contains('Preuzmi fiskalni račun')
    //     .invoke('attr', 'target', '_self')
    //     .scrollIntoView()
    //     .click();

       

        

        

        

    // });

    it('TC05-testing "Adrese" link- should take us to valid page', () => {

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/adrese"]').contains('Adrese')
        .click();
        
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/adrese');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Adrese')
        .should('be.visible')
        cy.get('.addresses_addresses__qbEOu').as('listOfAddresses')
        .should('be.visible')
       

    });

    it('TC06-testing-adrese- adding/deleting new address', () => {

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/adrese"]').contains('Adrese')
        .click();
        
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/adrese');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Adrese')
        .should('be.visible')

        cy.get('.addresses_icon__5e_1Q').as('addNewAddress')
        .scrollIntoView()
        .click();
        cy.get('.addressProfileForm_formWrapper__PNRpv').as('newAddressForm')
        .should('be.visible')
        cy.get('input[id="first_name"]').type('Marko')
        cy.get('input[id="last_name"]').type('Markovic')
        cy.get('input[id="street"]').type('Gospodara Vucica')
        cy.get('input[id="street_number"]').type('25')
        cy.get('input[id="floor_number"]').type('3')
        cy.get('input[id="flat_number"]').type('15')
        cy.get('.css-19bb58m').as('cityDropDown');
        cy.get('@cityDropDown')
        // .focus()
        .type('Beograd')
        cy.wait(2000);
        cy.contains('Beograd (Novi Beograd) (11070)')
        .click();
        cy.get('input[id="country"]').type('Srbija')
        cy.get('input[id="phone_number"]').type('0665005562')
        cy.get('input[id="email"]').type('urke@example.com').as('newAddressEmail')
        cy.get('button[type="button"]')
        .contains('Sačuvaj promene')
        .click();

       cy.get('.toaster_wrapper__EK31l')
        .contains('Podaci su ažurirani')
        .should('be.visible');
        
        
        cy.get('.addresses_singleAddressData__Je5_G')
        .contains('Gospodara Vucica 25 15/3')
        .should('exist')
        .as('addedAddress')
            cy.get('.addresses_delete__o6bYX')
            .eq(1)
            .should('exist')
        .scrollIntoView()
        .click({ force: true});
        cy.get('.warningModal_modalInner__5HJFv')
        .should('be.visible');
        cy.contains('Da li ste sigurni da želite da obrišete adresu?')
        .should('be.visible');
        cy.contains('Prihvati')
        .click();

        cy.get('.toaster_wrapper__EK31l')
        .contains('Podaci su ažurirani')
        .should('be.visible');

        cy.get('@addedAddress')
        .should('not.exist');
        
    });

    it('TC07-testing adrese-should not be able to add more than 3 new addresses', () => {

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/adrese"]').contains('Adrese')
        .click();
        
        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/adrese');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Adrese')
        .should('be.visible')

        function addThreeAddressesMaximum() {

            
                cy.get('.addresses_addresses__qbEOu').as('addressList')
            .find('.addresses_singleAddressData__Je5_G')
            .then(($addresses) => {

                const addressCount = $addresses.length;

                if(addressCount == 3) {
                    return;
                }

                cy.get('.addresses_icon__5e_1Q').as('addNewAddress')
            .should('be.visible')
            .scrollIntoView()
            .click();

            cy.get('.addressProfileForm_formWrapper__PNRpv').as('newAddressForm')
        .should('be.visible')
        cy.get('input[id="first_name"]').type('Marko')
        cy.get('input[id="last_name"]').type('Markovic')
        cy.get('input[id="street"]').type('Gospodara Vucica')
        cy.get('input[id="street_number"]').type('25')
        cy.get('input[id="floor_number"]').type('3')
        cy.get('input[id="flat_number"]').type('15')
        cy.get('.css-19bb58m').as('cityDropDown');
        cy.get('@cityDropDown')
        // .focus()
        .type('Beograd')
        cy.wait(2000);
        cy.contains('Beograd (Novi Beograd) (11070)')
        .click();
        cy.get('input[id="country"]').type('Srbija')
        cy.get('input[id="phone_number"]').type('0665005562')
        cy.get('input[id="email"]').type('urke@example.com').as('newAddressEmail')
        cy.get('button[type="button"]')
        .contains('Sačuvaj promene')
        .click();

       cy.get('.toaster_wrapper__EK31l')
        .contains('Podaci su ažurirani')
        .should('be.visible');

        

            
        

        cy.wait(1000)
        addThreeAddressesMaximum();

        
                });
            

            

        }

        addThreeAddressesMaximum();

        cy.get('.addresses_addresses__qbEOu')
        .find('.addresses_singleAddressData__Je5_G')
        .should('have.length', 3)

        cy.get('.addresses_icon__5e_1Q')
        .should('not.exist');

        cy.get('div.addresses_singleAddressData__Je5_G:nth-child(2) > span:nth-child(8)')
        .click();
        cy.get('.warningModal_modalInner__5HJFv')
        .should('be.visible');
        cy.contains('Da li ste sigurni da želite da obrišete adresu?')
        .should('be.visible');
        cy.contains('Prihvati')
        .click();
        cy.reload();
        cy.wait(2000)
        cy.get('div.addresses_singleAddressData__Je5_G:nth-child(2) > span:nth-child(8)')
        .click();
        cy.wait(1000)
        cy.get('.warningModal_modalInner__5HJFv')
        .should('be.visible');
        cy.contains('Da li ste sigurni da želite da obrišete adresu?')
        .should('be.visible');
        cy.contains('Prihvati')
        .click();

        cy.get('.addresses_addresses__qbEOu')
        .find('.addresses_singleAddressData__Je5_G')
        .should('have.length', 1);

    });

   

  

    it('TC08-testing podesavanje naloga- link should take us to the right page', () => {

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/podesavanje-naloga"]').contains('Podešavanje naloga')
        .click();

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/podesavanje-naloga');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Podešavanje naloga')
        .should('be.visible');
        cy.get('.settings_personalData__Zid8U').as('licniPodaci')
        .should('be.visible')
        cy.get('.passwordData_passwordData__GS2_b').as('promenaLozinke')
        .should('be.visible');




    });

    it('TC09-testing podesavanje naloga- changing password and logging in with new password', () => {

        let currentPassword = 'majkmc123';
        let newPassword = 'marcelo123';
        let email = 'uros.rasic@cubes.rs';

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/podesavanje-naloga"]').contains('Podešavanje naloga')
        .click();

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/podesavanje-naloga');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Podešavanje naloga')
        .should('be.visible');
        cy.get('.settings_personalData__Zid8U').as('licniPodaci')
        .should('be.visible')
        cy.get('.passwordData_passwordData__GS2_b').as('promenaLozinke')
        .should('be.visible');

        cy.get('.passwordData_action__hHG2g').as('changePasswordButton')
        .scrollIntoView()
        .click();

        cy.get('input[id="current_password"]').type(currentPassword);
        cy.get('input[id="new_password"]').type(newPassword);
        cy.get('input[id="confirm_password"]').type(newPassword);
        cy.get('button[type="button"]')
        .contains('Sačuvaj promene')
        .click();
        cy.contains('Lozinka je uspešno izmenjena!')
        .should('be.visible');

        cy.get('[data-test="userIcon"]')
        .click( { force: true});
        cy.contains('Odjavi se')
        .click( { force: true});
        cy.contains('Uspešno ste se odjavili!')
        .should('be.visible')
        

        //ovde se prijavljujemo sa novom sifrom i proveravamo da li je prijava prosla
        cy.get('[data-test="userIcon"]')
        .click( { force: true});
        cy.get('[data-test="emailLogin"]').type(email);
        cy.get('[data-test="passwordLogin"]').type(newPassword);
        cy.get('[data-test="loginButton"]')
        .click();
        cy.get('.profilePopup_loggedInWindow__ow4pG p') 
        .should('contain.text', 'Uros Rasic'); 

        
        cy.contains('Podešavanje naloga')
        .click();
        cy.get('.passwordData_action__hHG2g').as('changePasswordButton')
        .scrollIntoView()
        .click();

        //ovde vracamo sifru na prvobitno stanje
        cy.get('input[id="current_password"]').type(newPassword);
        cy.get('input[id="new_password"]').type(currentPassword);
        cy.get('input[id="confirm_password"]').type(currentPassword);
        cy.get('button[type="button"]')
        .contains('Sačuvaj promene')
        .click();
        cy.contains('Lozinka je uspešno izmenjena!')
        .should('be.visible');


    });

    it('TC10-testing podesavanje naloga- should not be able to change email', () => {

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/podesavanje-naloga"]').contains('Podešavanje naloga')
        .click();

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/podesavanje-naloga');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Podešavanje naloga')
        .should('be.visible');
        cy.get('.settings_personalData__Zid8U').as('licniPodaci')
        .should('be.visible')
        cy.get('.passwordData_passwordData__GS2_b').as('promenaLozinke')
        .should('be.visible');

        cy.get('.settings_action__vgvYK')
        .click()
        cy.get('input[id="email"]')
        .should('be.disabled');

    });

    it('TC11-testing podesavanje nalog- change phone number', () => {

        let newPhoneNumber = '+381665005563';
        let oldPhoneNumber = '+381665005562';
        
        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/podesavanje-naloga"]').contains('Podešavanje naloga')
        .click();

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/podesavanje-naloga');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Podešavanje naloga')
        .should('be.visible');
        cy.get('.settings_personalData__Zid8U').as('licniPodaci')
        .should('be.visible')
        cy.get('.passwordData_passwordData__GS2_b').as('promenaLozinke')
        .should('be.visible');

        cy.get('.settings_action__vgvYK')
        .click()
        cy.get('input[id="phone_number"]').as('phoneNumberField')
        .clear();
        cy.get('@phoneNumberField').type(newPhoneNumber);
        (cy.get('button[type="button"]').contains('Sačuvaj promene')).as('saveChangesButton')
        .click();
        cy.contains('Podaci su ažurirani')
        .should('be.visible');
        cy.contains(newPhoneNumber)
        .should('be.visible');

        cy.get('.settings_action__vgvYK')
        .click()
        cy.get('@phoneNumberField').clear().type(oldPhoneNumber);
        cy.get('@saveChangesButton')
        .click();
        cy.contains(oldPhoneNumber)
        .should('be.visible')
        

    });

    it('TC12-testing podesavanje naloga- change gender', () => {

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/podesavanje-naloga"]').contains('Podešavanje naloga')
        .click();

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/podesavanje-naloga');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Podešavanje naloga')
        .should('be.visible');
        cy.get('.settings_personalData__Zid8U').as('licniPodaci')
        .should('be.visible')
        cy.get('.passwordData_passwordData__GS2_b').as('promenaLozinke')
        .should('be.visible');
        cy.get('.settings_action__vgvYK')
        .click();

        function changeGender() {// u funkciji changeGender proveravamo da li se promena pola pravilno prenosi. Proveravamo svaki pol po jednom.

            for(let i=0; i<3;i++){// pravimo for petlju pomocu koje ce nam se funkcija izvrsiti samo 3 puta, po jednom za svaki pol(trebalo bi 2 al ok)

            cy.get('[id="select_sex"]')
            .click();

            cy.get('.select2_text__QaoKI').invoke('text').then((text)=>{


                if(text.includes('Muški')) {

                    cy.contains('Ženski')
                    .click();
                    cy.contains('Sačuvaj promene')
                    .click();
                    cy.contains('Ženski')
                    .should('be.visible');
                    
    
                } else if(text.includes('Ženski')) {
    
                    cy.contains('Ostalo')
                    .click();
                    cy.contains('Sačuvaj promene')
                    .click();
                    cy.contains('Ostalo')
                    .should('be.visible');
    
                } else{
                    cy.contains('Muški')
                    .click();
                    cy.contains('Sačuvaj promene')
                    .click();
                    cy.contains('Muški')
                    .should('be.visible');
                }

                cy.get('.settings_action__vgvYK')
                .click();
            });
            
                
            

        }

        }

        changeGender();

    });

    it('TC13- testing podesavanje naloga- changing date of birth', () => {


        let newDateOfBirth = '06/08/2003';
        let oldDateOfBirth = '05/01/2002';

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/podesavanje-naloga"]').contains('Podešavanje naloga')
        .click();

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/podesavanje-naloga');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Podešavanje naloga')
        .should('be.visible');
        cy.get('.settings_personalData__Zid8U').as('licniPodaci')
        .should('be.visible')
        cy.get('.passwordData_passwordData__GS2_b').as('promenaLozinke')
        .should('be.visible');
        cy.get('.settings_action__vgvYK')
        .click();

        cy.get('input[id="date_of_birth"]').clear().type(newDateOfBirth)
        cy.contains('Sačuvaj promene')
        .click();
        cy.contains('Podaci su ažurirani')
        .should('be.visible')
        cy.contains(newDateOfBirth)
        .should('be.visible')

        // ovde vracamo stari datum rodjenja
        cy.get('.settings_action__vgvYK')
        .click();
        cy.get('input[id="date_of_birth"]').clear().type(oldDateOfBirth)
        cy.contains('Sačuvaj promene')
        .click();
        cy.contains('Podaci su ažurirani')
        .should('be.visible')
        cy.contains(oldDateOfBirth)
        .should('be.visible')


    });

    it('TC14-testing podesavanje naloga- changing date of birth with non valid format', () => {

        let nonValidDateOfBirth = '05.01.2002';
        
        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/podesavanje-naloga"]').contains('Podešavanje naloga')
        .click();

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/podesavanje-naloga');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Podešavanje naloga')
        .should('be.visible');
        cy.get('.settings_personalData__Zid8U').as('licniPodaci')
        .should('be.visible')
        cy.get('.passwordData_passwordData__GS2_b').as('promenaLozinke')
        .should('be.visible');
        cy.get('.settings_action__vgvYK')
        .click();

        cy.get('input[id="date_of_birth"]').clear().type(nonValidDateOfBirth);
        cy.contains('Sačuvaj promene')
        .click();
        cy.contains("Datum mora biti u ovom formatu '01/01/2001'")
        .should('be.visible')
        cy.get('.personalDataForm_personalDataForm__rvfOa')
        .should('be.visible');//proveravamo da li je forma jos uvek vidljiva

    });

    it('TC15-testing podesavanje naloga- change name and last name', () => {

        let newName = 'Marko';
        let newLastName = 'Markovic';
        let oldName = 'Uros';
        let oldLastName = 'Rasic';
        
        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/podesavanje-naloga"]').contains('Podešavanje naloga')
        .click();

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/podesavanje-naloga');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Podešavanje naloga')
        .should('be.visible');
        cy.get('.settings_personalData__Zid8U').as('licniPodaci')
        .should('be.visible')
        cy.get('.passwordData_passwordData__GS2_b').as('promenaLozinke')
        .should('be.visible');
        cy.get('.settings_action__vgvYK')
        .click();

        cy.get('input[id="first_name"]').clear().type(newName);
        cy.get('input[id="last_name"]').clear().type(newLastName);
        cy.contains('Sačuvaj promene')
        .click();
        cy.contains('Podaci su ažurirani')
        .should('be.visible');
        cy.contains(newName)
        .should('be.visible')
        cy.contains(newLastName)
        .should('be.visible');

        cy.get('.settings_action__vgvYK')
        .click();
        cy.get('input[id="first_name"]').clear().type(oldName);
        cy.get('input[id="last_name"]').clear().type(oldLastName);
        cy.contains('Sačuvaj promene')
        .click();
        cy.contains('Podaci su ažurirani')
        .should('be.visible');
        cy.contains(oldName, { timeout: 7000})
        .should('be.visible')
        cy.contains(oldLastName)
        .should('be.visible');


    });

    it('TC16-testing podesavanje naloga- should not be able to leave empty name and last name', () => {

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/podesavanje-naloga"]').contains('Podešavanje naloga')
        .click();

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/podesavanje-naloga');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Podešavanje naloga')
        .should('be.visible');
        cy.get('.settings_personalData__Zid8U').as('licniPodaci')
        .should('be.visible')
        cy.get('.passwordData_passwordData__GS2_b').as('promenaLozinke')
        .should('be.visible');
        cy.get('.settings_action__vgvYK')
        .click();

        cy.get('input[id="first_name"]').clear()
        cy.contains('Obavezno polje')
        .should('be.visible')
        cy.get('input[id="last_name"]').clear()
        cy.contains('Obavezno polje')
        .should('be.visible')
        cy.contains('Sačuvaj promene')
        .click()
        cy.get('.personalDataForm_personalDataForm__rvfOa')
        .should('be.visible')// proveravamo da li je forma jos uvek prisutna

    });

    it('TC17-testing podesavanje naloga- "Pravno lice"- should not be able to save changes without company data', () => {

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/podesavanje-naloga"]').contains('Podešavanje naloga')
        .click();

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/podesavanje-naloga');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Podešavanje naloga')
        .should('be.visible');
        cy.get('.settings_personalData__Zid8U').as('licniPodaci')
        .should('be.visible')
        cy.get('.passwordData_passwordData__GS2_b').as('promenaLozinke')
        .should('be.visible');
        cy.get('.settings_action__vgvYK')
        .click();

        cy.contains('Pravno lice')
        .click();
        cy.contains('Sačuvaj promene')
        .click();

        cy.get('.errorMessage:visible').then(($errorMessages) => {

            const visibleErrors = $errorMessages.length;
            assert.equal(visibleErrors, 3);

        cy.contains('Obavezno polje').should('be.visible');
       
        cy.get('.personalDataForm_personalDataForm__rvfOa')//proveravamo da li je forma ostala otvorena kao sto bi trebalo
        .should('be.visible');
        })
        

    });

    it('TC18-testing podesavanje naloga-"Pravno lice"- should not be able to save changes with only company name', () => {

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/podesavanje-naloga"]').contains('Podešavanje naloga')
        .click();

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/podesavanje-naloga');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Podešavanje naloga')
        .should('be.visible');
        cy.get('.settings_personalData__Zid8U').as('licniPodaci')
        .should('be.visible')
        cy.get('.passwordData_passwordData__GS2_b').as('promenaLozinke')
        .should('be.visible');
        cy.get('.settings_action__vgvYK')
        .click();

        cy.contains('Pravno lice')
        .click();
        cy.get('input[id="company_name"]').type('Cubes')
        cy.contains('Sačuvaj promene')
        .click();

        cy.get('.errorMessage:visible').then(($errorMessages)=> {

            const visibleErrors = $errorMessages.length;
            assert.equal(visibleErrors, 2);

            cy.contains('Obavezno polje')
            .should('be.visible')

            cy.get('.personalDataForm_personalDataForm__rvfOa')//proveravamo da li je forma ostala otvorena kao sto bi trebalo
        .should('be.visible');
        })

    });

    it('TC19-testing podesvanje naloga-"Pravno lice"- should not be able to save changes with company name and pib only', ()=> {

        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/podesavanje-naloga"]').contains('Podešavanje naloga')
        .click();

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/podesavanje-naloga');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Podešavanje naloga')
        .should('be.visible');
        cy.get('.settings_personalData__Zid8U').as('licniPodaci')
        .should('be.visible')
        cy.get('.passwordData_passwordData__GS2_b').as('promenaLozinke')
        .should('be.visible');
        cy.get('.settings_action__vgvYK')
        .click();

        cy.contains('Pravno lice')
        .click();
        cy.get('input[id="company_name"]').type('Cubes')
        cy.get('input[id="company_number"]').type('123')
        cy.contains('Sačuvaj promene')
        .click();

        cy.get('.errorMessage:visible').then(($errorMessages)=> {

            const visibleErrors = $errorMessages.length;
            assert.equal(visibleErrors, 1);

            cy.contains('Obavezno polje')
            .should('be.visible')

            cy.get('.personalDataForm_personalDataForm__rvfOa')//proveravamo da li je forma ostala otvorena kao sto bi trebalo
        .should('be.visible');
        })

    });

    it('TC20-testing podesavanje naloga-"Pravno lice"-should be able to save changes with complete company info', ()=> {


        let companyName = 'Cubes';
        let companyNumber = '123';
        let companyRegistrationNumber = '321';
        cy.login();
        cy.get('[data-test="profilePopup"]')
        .should('contain.text', 'Uros Rasic');
        cy.get('a[href="/profil/nalog/podesavanje-naloga"]').contains('Podešavanje naloga')
        .click();

        cy.url().should('eq', 'https://miamaya.cubesdev.rs/profil/nalog/podesavanje-naloga');

        cy.get('.subpage_title__cD39_').as('pageTitle')
        .contains('Podešavanje naloga')
        .should('be.visible');
        cy.get('.settings_personalData__Zid8U').as('licniPodaci')
        .should('be.visible')
        cy.get('.passwordData_passwordData__GS2_b').as('promenaLozinke')
        .should('be.visible');
        cy.get('.settings_action__vgvYK')
        .click();

        cy.contains('Pravno lice')
        .click();
        cy.get('input[id="company_name"]').type(companyName)
        cy.get('input[id="company_number"]').type(companyNumber)
        cy.get('input[id="company_registration_number"]').type(companyRegistrationNumber)
        cy.contains('Sačuvaj promene')
        .click();

        

        cy.contains(companyName).should('be.visible')
        cy.contains(companyNumber).should('be.visible')
        cy.contains(companyRegistrationNumber).should('be.visible')

        cy.get('.settings_action__vgvYK')
        .click();
        
        cy.contains('Fizičko lice')
        .click()
        cy.contains('Sačuvaj promene')
        .click();// ovde smo vratili sa pravnog na fizicko lice

    });


    

})