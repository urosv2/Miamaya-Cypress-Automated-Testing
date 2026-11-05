describe('checkout testing', () => {

  // let hasNextPage = true;

  let firstName = 'Uros';
  let lastName = 'Rasic';
  let company = 'Cubes';
  let companyRegistrationNumber = '123';
  let companyNumber = '132';
  let gmail = 'urosrasic2002@gmail.com';
  let phoneNumber = '0665005562';
  let streetName = 'Dositeja Obradovica';
  let streetNumber = '8';




  before(function () {

    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })



  });

  beforeEach(function () {
    cy.viewport(1400, 1000) //1280,720
    cy.visit('')
    // cy.turnOffPopup();
    cy.contains('Dozvoli sve').should('exist')
    cy.contains('Dozvoli sve').click({ force :true});
    



  });

  it('TC01-izbacivanje proizvoda iz checkouta', () => {

    cy.chooseProductByTitle();  
      
    

    cy.login();// pozivamo custom login metodu

    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .contains('Dodaj u korpu')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .contains('Pogledaj korpu')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');



    cy.get('[data-test="cartShortcutButton"]').as('checkoutButton')
    cy.wait(2000)
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]',)
      .should('be.visible');
    // cy.wait(5000);


    cy.get('.orderOverview_overviewInfo__Iix_I')
      .find('[data-test="removeProduct"]')
      .click();

    cy.get('.emptyData_emptyCart__ronMS ').as('emptyBasket');
    cy.get('@emptyBasket')
      .contains('Tvoja korpa je prazna. Poruči proizvode:')
      .should('be.visible');

    cy.get('.linkUrl_black__7yFrV').as('productsPageLink');
    cy.get('@productsPageLink')
      .contains('Ovde')
      .should('be.visible');





  });

  it('TC02- checkout bug-izmeni,odbaci izmeni-should not crash', () => {

    cy.chooseProductByTitle();

    cy.login();



    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .contains('Dodaj u korpu')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .contains('Pogledaj korpu')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');



    cy.get('[data-test="cartShortcutButton"]').as('checkoutButton');
    cy.wait(2000);
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');
    // cy.wait(5000);

    // cy.window().then((win) => {
    //   win.scrollTo = () => { };
    // });

    cy.get('[data-test="editAddress"]')
      .should('be.visible')
      .scrollIntoView()
      .click({ force: true });

    // cy.wait(3000)
    cy.contains('Pravno lice')
      .should('be.visible')
      .click({ force: true });

    cy.contains('Odbaci promene')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="editAddress"]')
      .scrollIntoView()
      .click({ force: true });



  });


  it('TC03-checkout-kupovina proizvoda preko paketomata kao fizicko lice', () => {



    cy.chooseProductByTitle();
      
      cy.login();

      // u sledecem kodu proveravamo da li se cena single proizvoda pravilno prenosi u korpu i checkout
    cy.get('[data-test="productInfoCurrentPrice"]').as('productPrice')
    cy.get('@productPrice').then(($productPrice) => {// ovde pravimo 'objekat' od trenutne cene proizvoda

      let price = $productPrice.text().trim()// ovde se od celokupnog elementa izdvaja text i trimuje od neportrebnih razmaka
      price = price.replace(',', '.');//zamenjujemo zareze sa tackom
      price = parseFloat(price);//string u float

      cy.get('[data-test="chooseSize"]')
        .scrollIntoView()
        .click({ force: true });

      cy.get('[data-test="size"]')
        .first()
        .scrollIntoView()
        .click({ force: true });

      cy.get('[data-test="productInfoCartButton"]')
        .contains('Dodaj u korpu')
        .scrollIntoView()
        .click({ force: true });
      cy.get('[data-test="cartShortcutButton"]')
        .contains('Pogledaj korpu')
        .click();
      cy.get('[data-test="cartProduct"]').should('be.visible');
      cy.get('.desktopCartProduct_totalPrice__BiNWh').then(($totalPay) => {

        let price2 = $totalPay.contents().text().trim();// ukupan iznos u korpi ima odvojene spanove za cenu i decimale pa ovim gadjamo samo prvi span
        price2 = parseFloat(price2);



        assert.equal(price, price2); // proveravamo da li se cena pravilno prenosi u korpu

        cy.get('button[type="button"]').as('checkoutButton');
        cy.wait(2000);
        cy.get('@checkoutButton')
          .contains('Produži na checkout')
          .scrollIntoView()
          .click({ force: true });
        cy.wait(2000)

        cy.get('section[id="checkout_section"]')
          .should('be.visible');

        cy.get('[id="select_delivery"]')
          .click();
        // cy.wait(2000);
        cy.get('[data-test="PreuzimanjeNaPaketomatu"]')
        .should('be.visible')
          .click();
        cy.contains('Izaberite paketomat')
          .click({ force: true });


        cy.contains('Sačuvaj promene')
          .click();
        cy.wait(2000);

        cy.get('.orderOverview_overviewInfo__Iix_I').as('pregledPorudzbine')
          .should('be.visible')
          .find('[data-test="articlePriceTotal"]').eq(1).as('cenaDostave')
          .should('be.visible')
        cy.get('@cenaDostave')
          .contains('490,00')
          .should('be.visible')

        cy.get('@pregledPorudzbine')
          .find('[data-test="articlePriceTotal"]').eq(0).as('cenaProizvoda')
        cy.get('@cenaProizvoda').then(($productPrice2) => {

          let basketValue = $productPrice2.text().trim()
          basketValue = parseFloat(basketValue);

          assert.equal(price2, basketValue); // proveravamo da li se cena pravilno prenosi iz korpe u checkout
        })

      })

      // cy.get('[data-test="OnlinePlacanjeWspay"]')
      //   .click();

      cy.get('[data-test="privacyPolicy"]')
        .click();
      // cy.wait(2000);

      cy.get('[data-test="confirmOrder"]')
        .should('be.visible')
        .click({force: true});
      cy.wait(2000);

      cy.origin('https://form.wspay.biz', () => {
        cy.get('.footer-text', {timeout: 10000})
          .contains('Pošto ste uneli podatke o kartici, molimo Vas da kliknete na Plati i sačekate da sistem obradi informaciju. U slučaju da ste prijavljeni na servise Mastercard SecureCode ili Verified by Visa, možda će biti potrebno da unesete dodatne informacije u vezi sa svojim identitetom (lozinka ili neke druge informacije) na zahtev Vaše banke. U slučaju da ne znate predmetnu lozinku ili drugu informaciju, molimo Vas da kontaktirate svoju banku.')
          .should('be.visible');
      });

    })





  });

  it('TC04-checkout-kupovina proizvoda preko paketomata kao pravno lice', () => {

    cy.chooseProductByTitle();

    cy.login();

    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');

    cy.get('button[type="button"]').as('checkoutButton');
    cy.wait(2000);
    cy.get('@checkoutButton')
      .should('be.visible')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');

    cy.get('[id="select_delivery"]')
      .click();
    // cy.wait(2000);
    cy.get('[data-test="PreuzimanjeNaPaketomatu"]')
    .should('be.visible')
      .click();
    cy.contains('Izaberite paketomat')
      .click({ force: true });


    cy.contains('Sačuvaj promene')
      .click();

    
      cy.contains('Izmeni')
      .should('be.visible')
      .scrollIntoView()
      .click({ force: true });

   cy.contains('Pravno lice')
      .click();

    cy.get('input[id="first_name"]').type(firstName)
    cy.get('input[id="last_name"]').type(lastName)
    cy.get('input[id="company_name"]').type(company);
    cy.get('input[id="company_registration_number"]').type(companyRegistrationNumber)
    cy.get('input[id="company_number"]').type(companyNumber)
    cy.contains('Sačuvaj promene')
    .click();

    //   cy.get('[data-test="PlacanjePouzecem"]')
    //   .click();

    //  cy.get('[data-test="OnlinePlacanjeWspay"]')
    //     .click();

    cy.get('[data-test="privacyPolicy"]')
      .click();
      cy.wait(2000)

    cy.get('[data-test="confirmOrder"]', {timeout: 7000})
      .click({force: true});
    cy.wait(5000);

    cy.origin('https://form.wspay.biz', () => {
      cy.get('.footer-text', {timeout: 10000})
        .contains('Pošto ste uneli podatke o kartici, molimo Vas da kliknete na Plati i sačekate da sistem obradi informaciju. U slučaju da ste prijavljeni na servise Mastercard SecureCode ili Verified by Visa, možda će biti potrebno da unesete dodatne informacije u vezi sa svojim identitetom (lozinka ili neke druge informacije) na zahtev Vaše banke. U slučaju da ne znate predmetnu lozinku ili drugu informaciju, molimo Vas da kontaktirate svoju banku.')
        .should('be.visible');
    });




  });

  it('TC05-checkout-paketomat order with different billing address', () => {

    cy.chooseProductByTitle();

    cy.login();

    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');

    cy.get('button[type="button"]').as('checkoutButton');
    cy.wait(2000);
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');

    cy.get('[id="select_delivery"]')
      .click();
    cy.get('[data-test="PreuzimanjeNaPaketomatu"]', { timeout:7000})
      .click();
      cy.wait(2000);
   cy.contains('Izaberite paketomat')
      .click({ force: true });


    cy.contains('Sačuvaj promene', { timeout: 7000})
      .click();

    //   cy.get('[data-test="PlacanjePouzecem"]')
    //   .click();

    cy.get('.payment_fakeCheckbox__Cbaeg')//odcheckiramo da su nam podaci za naplatu i dostavu isti
      .click({ force: true });

    cy.get('.select2_selectBtn__aC6dN')
      .contains('Uros - Ustanicka 17, Beograd (Novi Beograd)')
      .should('be.visible');
    cy.get('p.addressInfo_userInfo__ahgQy:nth-child(1)')
      .contains('Ime i prezime: Uros Rasic')
      .should('be.visible');
    cy.get('p.addressInfo_userInfo__ahgQy:nth-child(2)')
      .contains('Kontakt telefon:')
      .should('be.visible');
    cy.get('p.addressInfo_userInfo__ahgQy:nth-child(3)')
      .contains('E-mail:')
      .should('be.visible');
    cy.get('p.addressInfo_userInfo__ahgQy:nth-child(4)')
      .contains('Ulica i broj:')
      .should('be.visible');
    cy.get('p.addressInfo_userInfo__ahgQy:nth-child(5)')
      .contains('Mesto:')
      .should('be.visible');

    // cy.get('[data-test="OnlinePlacanjeWspay"]')
    //     .click();

    cy.get('[data-test="privacyPolicy"]')
      .click();
    cy.wait(1000);

    cy.get('[data-test="confirmOrder"]')
      .click();
    cy.wait(5000);



    cy.origin('https://form.wspay.biz', () => {
      cy.get('.footer-text')
        .contains('Pošto ste uneli podatke o kartici, molimo Vas da kliknete na Plati i sačekate da sistem obradi informaciju. U slučaju da ste prijavljeni na servise Mastercard SecureCode ili Verified by Visa, možda će biti potrebno da unesete dodatne informacije u vezi sa svojim identitetom (lozinka ili neke druge informacije) na zahtev Vaše banke. U slučaju da ne znate predmetnu lozinku ili drugu informaciju, molimo Vas da kontaktirate svoju banku.')
        .should('be.visible');
    });
  });

  it('TC06-checkout-paketomat order with different billing address-dodaj novu adresu', () => {

    cy.chooseProductByTitle();

    cy.login();

    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');

    cy.get('button[type="button"]').as('checkoutButton');
    cy.wait(2000);
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');

    cy.get('[id="select_delivery"]')
      .click();
    cy.wait(2000);
    cy.get('[data-test="PreuzimanjeNaPaketomatu"]')
      .click();
    cy.contains('Izaberite paketomat')
      .click({ force: true });


    cy.contains('Sačuvaj promene')
      .click();

    //   cy.get('[data-test="PlacanjePouzecem"]')
    //   .click();

    cy.get('.payment_fakeCheckbox__Cbaeg')//checkbox da podaci za naplatu i dostavu nisu isti
      .click({ force: true });

    cy.contains('Dodaj adresu')
      .click();

    cy.get('[data-test="firstNameAddressForm"]')
      .type(firstName);
    cy.get('[data-test="lastNameAddressForm"]')
      .type(lastName);
    cy.get('[data-test="emailAddressForm"]')
      .type(gmail);
    cy.get('[data-test="phoneNumberAddressForm"]')
      .type(phoneNumber);
    cy.get('[data-test="streetAddressForm"]')
      .type(streetName);
    cy.get('[data-test="streetNumberAddressForm"]')
      .type(streetNumber);
    cy.get('input[id="react-select-4-input"]').as('cityDropDown');
    cy.get('@cityDropDown')
      .focus()
      .type('Beograd (Novi Beograd) (11070)')
      .should('have.value', 'Beograd (Novi Beograd) (11070)')
    cy.wait(4000)//nakon unosa grada cekamo da se ta opcija u drop down-u prikaze
    cy.get('@cityDropDown').type('{enter}');//kada nam se prikazala opcija dodajemo komandu za klik na enter
    cy.wait(2000);

    //  cy.get('[data-test="OnlinePlacanjeWspay"]')
    //     .click();


    cy.get('[data-test="privacyPolicy"]')
      .click();
    cy.wait(1000);

    cy.get('[data-test="confirmOrder"]', {timeout: 7000})
      .click();
    cy.wait(5000);



    cy.origin('https://form.wspay.biz', () => {
      cy.get('.footer-text')
        .contains('Pošto ste uneli podatke o kartici, molimo Vas da kliknete na Plati i sačekate da sistem obradi informaciju. U slučaju da ste prijavljeni na servise Mastercard SecureCode ili Verified by Visa, možda će biti potrebno da unesete dodatne informacije u vezi sa svojim identitetom (lozinka ili neke druge informacije) na zahtev Vaše banke. U slučaju da ne znate predmetnu lozinku ili drugu informaciju, molimo Vas da kontaktirate svoju banku.')
        .should('be.visible');
    });



  });

  it('TC07-checkout-paketomat order with instant pay("IPS skeniraj")', () => {

    cy.chooseProductByTitle();

    cy.login();

    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');


    cy.get('button[type="button"]').as('checkoutButton');
    cy.wait(2000);
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');

    cy.get('[id="select_delivery"]')
      .click();
    cy.wait(2000);
    cy.get('[data-test="PreuzimanjeNaPaketomatu"]')
      .click();
    cy.contains('Izaberite paketomat')
      .click({ force: true });


    cy.contains('Sačuvaj promene')
      .click();
    cy.wait(2000);

    cy.get('[data-test="InstantPlaćanjeIPSSkeniraj"]')
      .click({ force: true });

    cy.get('[data-test="privacyPolicy"]')
      .click();
    cy.wait(1000);

    cy.get('[data-test="confirmOrder"]')
      .click({ force: true});
    cy.wait(5000);



    cy.origin('https://form.wspay.biz', () => {
      cy.get('.footer-text')
        .contains('Pošto ste uneli podatke o kartici, molimo Vas da kliknete na Plati i sačekate da sistem obradi informaciju. U slučaju da ste prijavljeni na servise Mastercard SecureCode ili Verified by Visa, možda će biti potrebno da unesete dodatne informacije u vezi sa svojim identitetom (lozinka ili neke druge informacije) na zahtev Vaše banke. U slučaju da ne znate predmetnu lozinku ili drugu informaciju, molimo Vas da kontaktirate svoju banku.')
        .should('be.visible');
    });

  });

  it('TC08-checkout-paketomat order without checking terms of use- should not go through', () => {

    cy.chooseProductByTitle();

    cy.login();

    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');

    cy.get('button[type="button"]').as('checkoutButton');
    cy.wait(2000);
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');

    cy.get('[id="select_delivery"]')
      .click();
    cy.wait(2000);
    cy.get('[data-test="PreuzimanjeNaPaketomatu"]')
      .click();
    cy.contains('Izaberite paketomat')
      .click({ force: true });


    cy.contains('Sačuvaj promene')
      .click(); 

    cy.get('[data-test="confirmOrder"]')
      .click();
    cy.wait(1000);

    cy.get('.errorMessage')
      .contains('Obavezno polje')
      .should('be.visible');

    
    cy.contains('Unesite podatke i čekirajte uslove korišćenja!')
      .should('be.visible');

    cy.url().should('include', 'https://miamaya.cubesdev.rs/shop/checkout/');


  });

  it('TC09-checkout-paketomat order without choosing a paketomat', () => {

    cy.chooseProductByTitle();

    cy.login();

    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');

    cy.get('button[type="button"]').as('checkoutButton');
    cy.wait(2000);
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');


    cy.get('[id="select_delivery"]')
      .click();
    cy.wait(2000);
    cy.get('[data-test="PreuzimanjeNaPaketomatu"]')
      .click();

    cy.get('[data-test="privacyPolicy"]')
      .click();

    cy.get('[data-test="confirmOrder"]')
      .click();

   
      cy.contains('Morate odabrati paketomat')
      .should('be.visible');

      //cy.get('.go2072408551') selektor za gresku ispod
    cy.contains('Unesite podatke i čekirajte uslove korišćenja!')
      .should('be.visible');

    cy.url().should('include', 'https://miamaya.cubesdev.rs/shop/checkout/');


  });

  it('TC10-checkout-order by delivery to address', () => {



    cy.chooseProductByTitle();



    
    cy.login();


    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');

    cy.get('button[type="button"]').as('checkoutButton');
    cy.wait(2000);
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');
      cy.wait(5000)

    cy.get('.delivery_deliveryTypeText__yB2bk ').as('cenaDostave');
    cy.get('@cenaDostave')
      .contains('+ 500 RSD')
      .should('be.visible')

    cy.get('.orderOverview_overviewInfo__Iix_I')
      .find('[data-test="articlePriceTotal"]',{ timeout: 7000}).eq(1).as('uracunataCenaDostave');
    cy.get('@uracunataCenaDostave',{ timeout: 7000})
      .contains('500,00')
      .should('be.visible')

    cy.get('[data-test="PlaćanjePouzećem+390RSD"]')
      .click();



    cy.get('[data-test="privacyPolicy"]')
      .click();

    cy.get('[data-test="confirmOrder"]')
      .click();

    cy.get('.orderProductList_title__MFBWU',{ timeout: 7000}).as('pregledPorudzbine');
    cy.get('@pregledPorudzbine')
      .contains('Pregled porudžbine')
      .should('be.visible');

    cy.get('.thank_you_page_orderNumberText__9X3Kx').as('thankYouForYourOrderText')
    cy.get('@thankYouForYourOrderText')
      .invoke('text')
      .then((text) => {
        const trimmedText = text.trim();
        expect(trimmedText).to.match(/^Vaša porudžbina #\d+ je uspešno realizovana\.$/)
      });

    cy.get('@thankYouForYourOrderText')
      .should('be.visible');


    cy.get('.thank_you_page_description__pyAoo').as('thankYouPageDescription');
    cy.get('@thankYouPageDescription')
      .contains('O daljim fazama procesuiranja porudžbine obaveštavaćemo vas putem e-mail poruka')
      .should('be.visible');

    cy.get('.thank_you_page_title__y4W0z').as('thankYouPageTitle');
    cy.get('@thankYouPageTitle')
      .contains('Hvala')
      .should('be.visible');

  });

  it('TC11-checkout-order by delivery to address with online payment(with card)', () => {

    cy.chooseProductByTitle();

    cy.login();

    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');

    cy.get('button[type="button"]').as('checkoutButton');
    cy.wait(3000);
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');

    cy.get('[data-test="PlaćanjePlatnomKarticom"]')
      .click();
    cy.wait(1000);

    cy.get('.delivery_deliveryTypeText__yB2bk ').as('cenaDostave');
    cy.get('@cenaDostave')
      .contains('+ 500 RSD')
      .should('be.visible')

    cy.get('.orderOverview_overviewInfo__Iix_I')
      .find('[data-test="articlePriceTotal"]').eq(1).as('uracunataCenaDostave');
    cy.get('@uracunataCenaDostave')
      .contains('500,00')
      .should('be.visible');
    cy.wait(1000);

    cy.get('[data-test="privacyPolicy"]')
      .click();
    cy.wait(1000);

    cy.get('[data-test="confirmOrder"]').as('confirmCheckoutButton')
    cy.wait(1000);
    cy.get('@confirmCheckoutButton')
      .contains('Potvrdite kupovinu')
      .click();
    cy.wait(1000);

    cy.origin('https://form.wspay.biz', () => {
      cy.get('.footer-text')
        .contains('Pošto ste uneli podatke o kartici, molimo Vas da kliknete na Plati i sačekate da sistem obradi informaciju. U slučaju da ste prijavljeni na servise Mastercard SecureCode ili Verified by Visa, možda će biti potrebno da unesete dodatne informacije u vezi sa svojim identitetom (lozinka ili neke druge informacije) na zahtev Vaše banke. U slučaju da ne znate predmetnu lozinku ili drugu informaciju, molimo Vas da kontaktirate svoju banku.')
        .should('be.visible');
    });



  });

  it('TC12-checkout-order by delivery to address with online payment(IPS skeniraj)', () => {

    cy.chooseProductByTitle();

    cy.login();

    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(1000);

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');


    cy.get('button[type="button"]').as('checkoutButton');
    cy.wait(3000);
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');

    cy.get('[data-test="InstantPlaćanjeIPSSkeniraj"]')
      .click();
    cy.wait(1000);

    cy.get('.delivery_deliveryTypeText__yB2bk ').as('cenaDostave');
    cy.get('@cenaDostave')
      .contains('+ 500 RSD')
      .should('be.visible');

    cy.get('.orderOverview_overviewInfo__Iix_I')
      .find('[data-test="articlePriceTotal"]').eq(1).as('uracunataCenaDostave');
    cy.get('@uracunataCenaDostave')
      .contains('500,00')
      .should('be.visible')
    cy.wait(1000);

    cy.get('[data-test="privacyPolicy"]')
      .click();
    cy.wait(1000);

    cy.get('[data-test="confirmOrder"]')
      .click();
    cy.wait(2000);

    cy.origin('https://form.wspay.biz', () => {
      cy.get('.footer-text')
        .contains('Pošto ste uneli podatke o kartici, molimo Vas da kliknete na Plati i sačekate da sistem obradi informaciju. U slučaju da ste prijavljeni na servise Mastercard SecureCode ili Verified by Visa, možda će biti potrebno da unesete dodatne informacije u vezi sa svojim identitetom (lozinka ili neke druge informacije) na zahtev Vaše banke. U slučaju da ne znate predmetnu lozinku ili drugu informaciju, molimo Vas da kontaktirate svoju banku.')
        .should('be.visible');
    });

  });

  it('TC13-checkout-order by delivery to address with different billing info-dodaj novu adresu', () => {

    cy.chooseProductByTitle();


    cy.login();

    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');


    cy.get('button[type="button"]').as('checkoutButton');
    cy.wait(2000);
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');

    cy.get('.delivery_deliveryTypeText__yB2bk ').as('cenaDostave');
    cy.get('@cenaDostave')
      .contains('+ 500 RSD')
      .should('be.visible');

    cy.get('.orderOverview_overviewInfo__Iix_I')
      .find('[data-test="articlePriceTotal"]').eq(1).as('uracunataCenaDostave');
    cy.get('@uracunataCenaDostave')
      .contains('500,00')// ovde pada test zbog baga na staging-u (iz nekog razloga u zbiru cene pise 790 dostava umesto 490)
      .should('be.visible')

    cy.get('[data-test="PlaćanjePouzećem+390RSD"]')
      .click();

    cy.get('.payment_fakeCheckbox__Cbaeg')//checkbox da podaci za naplatu i dostavu nisu isti
      .click({ force: true });

    cy.get('.deliveryAddressCourier_radioGroup__os_YP > label:nth-child(2) > span:nth-child(2)').as('addAddress');
    cy.get('@addAddress')
      .eq(1)
      .click();

    cy.get('[data-test="firstNameAddressForm"]')
      .type(firstName);
    cy.get('[data-test="lastNameAddressForm"]')
      .type(lastName);
    cy.get('[data-test="emailAddressForm"]')
      .type(gmail);
    cy.get('[data-test="phoneNumberAddressForm"]')
      .type(phoneNumber);
    cy.get('[data-test="streetAddressForm"]')
      .type(streetName);
    cy.get('[data-test="streetNumberAddressForm"]')
      .type(streetNumber);
    cy.get('input[id="react-select-4-input"]').as('cityDropDown');
    cy.get('@cityDropDown')
      .focus()
      .type('Beograd (Novi Beograd) (11070)')
      .should('have.value', 'Beograd (Novi Beograd) (11070)')
    cy.wait(2000)
    cy.get('@cityDropDown').type('{enter}');
    cy.wait(2000);


    cy.get('[data-test="privacyPolicy"]')
      .click();
    cy.wait(1000);

    cy.get('[data-test="confirmOrder"]')
      .click();

    cy.get('.orderProductList_title__MFBWU').as('pregledPorudzbine');
    cy.get('@pregledPorudzbine')
      .contains('Pregled porudžbine')
      .should('be.visible');

    cy.get('.thank_you_page_orderNumberText__9X3Kx').as('thankYouForYourOrderText')
    cy.get('@thankYouForYourOrderText')
      .invoke('text')
      .then((text) => {
        const trimmedText = text.trim();
        expect(trimmedText).to.match(/^Vaša porudžbina #\d+ je uspešno realizovana\.$/)
      });

    cy.get('@thankYouForYourOrderText')
      .should('be.visible');


    cy.get('.thank_you_page_description__pyAoo').as('thankYouPageDescription');
    cy.get('@thankYouPageDescription')
      .contains('O daljim fazama procesuiranja porudžbine obaveštavaćemo vas putem e-mail poruka')
      .should('be.visible');

    cy.get('.thank_you_page_title__y4W0z').as('thankYouPageTitle');
    cy.get('@thankYouPageTitle')
      .contains('Hvala')
      .should('be.visible');

  });

  it('TC14-checkout-order by delivery to address with express delivery', () => {

     cy.chooseProductByTitle();

    cy.login();

    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');


    cy.get('button[type="button"]').as('checkoutButton');
    cy.wait(2000);
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');

    cy.get('.delivery_fakeRadio__CweDH').eq(1).as('expressDeliveryRadioButton');
    cy.get('@expressDeliveryRadioButton')
      .click();

    cy.get('.delivery_deliveryTypeText__yB2bk ').as('cenaDostave');
    cy.get('@cenaDostave')
      .contains('+ 2000 RSD')
      .should('be.visible');
      cy.wait(2000);

    cy.get('.orderOverview_overviewInfo__Iix_I')
      .find('[data-test="articlePriceTotal"]').eq(1).as('uracunataCenaDostave');
    cy.get('@uracunataCenaDostave')
      .contains('2.000,00')
      .should('be.visible');
    cy.wait(2000);

    cy.get('[data-test="PlaćanjePouzećem+390RSD"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="privacyPolicy"]')
      .click();

    cy.get('[data-test="confirmOrder"]')
      .click();
      cy.wait(5000)



    cy.get('.orderProductList_title__MFBWU', { timeout: 7000}).as('pregledPorudzbine');
    cy.get('@pregledPorudzbine')
      .contains('Pregled porudžbine')
      .should('be.visible');

    cy.get('.thank_you_page_orderNumberText__9X3Kx').as('thankYouForYourOrderText')
    cy.get('@thankYouForYourOrderText')
      .invoke('text')
      .then((text) => {
        const trimmedText = text.trim();
        expect(trimmedText).to.match(/^Vaša porudžbina #\d+ je uspešno realizovana\.$/)
      });

    cy.get('@thankYouForYourOrderText')
      .should('be.visible');


    cy.get('.thank_you_page_description__pyAoo').as('thankYouPageDescription');
    cy.get('@thankYouPageDescription')
      .contains('O daljim fazama procesuiranja porudžbine obaveštavaćemo vas putem e-mail poruka')
      .should('be.visible');

    cy.get('.thank_you_page_title__y4W0z').as('thankYouPageTitle');
    cy.get('@thankYouPageTitle')
      .contains('Hvala')
      .should('be.visible');






  });

  it('TC15-checkout- order by self pickup with card', () => {

    cy.chooseProductByTitle();

    cy.login();

    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');


    cy.get('button[type="button"]').as('checkoutButton');
    cy.wait(2000);
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');
    cy.wait(1000)

    cy.get('[id="select_delivery"]')
      .click();
    cy.get('[data-test="PreuzimanjeURadnji"]')
      .click();
    cy.wait(1000)

    cy.get('button[type="button"]').as('izaberiteRadnjuButton')
    cy.get('@izaberiteRadnjuButton')
      .contains('Izaberite radnju')
      .click()
    cy.get('.storeLocationsPopup_buttonsWrapper__BSGWQ > button:nth-child(2)').as('confirmShop');
    cy.get('@confirmShop').click();
    cy.wait(1000)

    cy.get('[data-test="PlaćanjePlatnomKarticom"]')
        .click();

    cy.get('[data-test="privacyPolicy"]')
      .click();
    cy.wait(1000)


    cy.get('[data-test="confirmOrder"]')
      .click();
    cy.wait(5000);

    cy.origin('https://form.wspay.biz', () => {
      cy.get('.footer-text')
        .contains('Pošto ste uneli podatke o kartici, molimo Vas da kliknete na Plati i sačekate da sistem obradi informaciju. U slučaju da ste prijavljeni na servise Mastercard SecureCode ili Verified by Visa, možda će biti potrebno da unesete dodatne informacije u vezi sa svojim identitetom (lozinka ili neke druge informacije) na zahtev Vaše banke. U slučaju da ne znate predmetnu lozinku ili drugu informaciju, molimo Vas da kontaktirate svoju banku.')
        .should('be.visible');
    });


  });

  it('TC16-checkout- order by self pickup with IPS skeniraj', () => {

    cy.chooseProductByTitle();

    cy.login();

    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .click({ force: true });
    cy.get('[data-test="cartProduct"]').should('be.visible');


    cy.get('button[type="button"]').as('checkoutButton');
    cy.wait(2000);
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');

    cy.get('[id="select_delivery"]')
      .click();
    cy.get('[data-test="PreuzimanjeURadnji"]')
      .click();
    cy.wait(1000)

    cy.get('button[type="button"]').as('izaberiteRadnjuButton')
    cy.get('@izaberiteRadnjuButton')
      .contains('Izaberite radnju')
      .click()
    cy.get('.storeLocationsPopup_buttonsWrapper__BSGWQ > button:nth-child(2)').as('confirmShop');
    cy.get('@confirmShop').click();
    cy.wait(1000)

    cy.get('[data-test="InstantPlaćanjeIPSSkeniraj"]')
      .click();

    cy.get('[data-test="privacyPolicy"]')
      .click();
    cy.wait(1000)


    cy.get('[data-test="confirmOrder"]', {timeout: 7000})
      .click();
    cy.wait(5000);

    cy.origin('https://form.wspay.biz', () => {
      cy.get('.footer-text')
        .contains('Pošto ste uneli podatke o kartici, molimo Vas da kliknete na Plati i sačekate da sistem obradi informaciju. U slučaju da ste prijavljeni na servise Mastercard SecureCode ili Verified by Visa, možda će biti potrebno da unesete dodatne informacije u vezi sa svojim identitetom (lozinka ili neke druge informacije) na zahtev Vaše banke. U slučaju da ne znate predmetnu lozinku ili drugu informaciju, molimo Vas da kontaktirate svoju banku.')
        .should('be.visible');
    });


  });

  it('TC17- order by self pickup- change shop', () => {

    cy.chooseProductByTitle();

    cy.login();

    cy.get('[data-test="chooseSize"]')
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="size"]')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('[data-test="productInfoCartButton"]')
      .scrollIntoView()
      .click({ force: true });
    cy.get('[data-test="cartShortcutButton"]')
      .click();
    cy.get('[data-test="cartProduct"]').should('be.visible');


    cy.get('button[type="button"]').as('checkoutButton');
    cy.wait(2000);
    cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .scrollIntoView()
      .click({ force: true });
    cy.wait(2000)

    cy.get('section[id="checkout_section"]')
      .should('be.visible');
      cy.wait(5000);

    cy.get('[id="select_delivery"]')
      .click();
    cy.get('[data-test="PreuzimanjeURadnji"]')
      .click();
    cy.wait(1000)

    cy.contains('Izaberite radnju')
      .click()
    cy.contains('Potvrdi')
    .click();
    cy.wait(1000);

    cy.contains('Promenite radnju')
      .click()

    cy.get('.selectedStore_fakeRadio__Glcnk ').eq(1).as('changeStore');
    cy.get('@changeStore')
      .click();
    cy.contains('Sačuvaj promene', {timeout: 7000})
      .click();

    cy.get('[data-test="privacyPolicy"]')
      .click();
    cy.wait(2000)


    cy.get('[data-test="confirmOrder"]', {timeout: 7000})
      .click();
    cy.wait(5000);

    cy.origin('https://form.wspay.biz', () => {
      cy.get('.footer-text')
        .contains('Pošto ste uneli podatke o kartici, molimo Vas da kliknete na Plati i sačekate da sistem obradi informaciju. U slučaju da ste prijavljeni na servise Mastercard SecureCode ili Verified by Visa, možda će biti potrebno da unesete dodatne informacije u vezi sa svojim identitetom (lozinka ili neke druge informacije) na zahtev Vaše banke. U slučaju da ne znate predmetnu lozinku ili drugu informaciju, molimo Vas da kontaktirate svoju banku.')
        .should('be.visible');
    });


  });








});