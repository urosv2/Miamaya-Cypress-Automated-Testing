describe('Retry-ability Session', { scrollBehavior: 'center'},function() {


  let testMessage = 'Test123123';
  let testName = 'Uros';
  let testLastName = 'Rasic';
  let testEmail = 'uros.rasic@cubes.rs';
  let testPhoneNumber = '0664553321'; 
  let nonValidEmail = 'uros.rasic@';
  let nonValidEmail2 = 'uros.rasic@c';

  before(function() {
    
      Cypress.on('uncaught:exception', (err, runnable) => {
                      return false
                   })
        
      
      
      

      });

  beforeEach(function(){
      cy.viewport(1400,1000) //1280,720
      cy.visit('')
      // cy.turnOffPopup();
      cy.contains('Dozvoli sve').should('exist')
      cy.contains('Dozvoli sve').click();

     


  });

  it('TC01-footer- testing "O nama" link, should take us to about us page', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > div:nth-child(1) > a:nth-child(1)').as('aboutUsLink');
    cy.get('@aboutUsLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/o-nama');

      cy.get('.about_us_page_title___NLHa').as('aboutUsTitle');
      cy.get('@aboutUsTitle')
      .contains('O Nama')
      .should('be.visible');

      cy.get('.about_us_page_content__7b4uV').as('aboutUsDescription');
      cy.get('@aboutUsDescription')
      .contains('Kompanija MiaMara više od 25 godina na srpsko modno tržište ekskluzivno donosi vodeće svetske brendove.')
      .should('be.visible')
    

  });

  it('TC02-footer- testing "Kontakt" link- should take us to contact page and open a submit form', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > a:nth-child(1)').as('kontaktLink');
    cy.get('@kontaktLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kontakt');

    cy.get('.contactSection_title__ABrZ2').as('kontaktNaslov');
    cy.get('@kontaktNaslov')
    .contains('Kontakt')
    .should('be.visible')

    cy.get('input[id="first_name"]').as('nameField')
    .scrollIntoView()
    .should('be.visible')
    cy.get('input[id="last_name"]').as('lastNameField')
    .should('be.visible')
    cy.get('input[id="email"]').as('emailField')
    .should('be.visible')
    cy.get('input[id="phone_number"]').as('phoneNumberField')
    .should('be.visible')
    cy.get('.contactUsForm_textarea__nVLpc').as('sendMessage')
    .should('be.visible')
    cy.get('button[type="button"]')
    .contains('Pošaljite')
    .should('be.visible')

    
  });

  it('TC03-footer-kontakt- send button not clickable with emtpy form', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > a:nth-child(1)').as('kontaktLink');
    cy.get('@kontaktLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kontakt');

    cy.get('.contactSection_title__ABrZ2').as('kontaktNaslov');
    cy.get('@kontaktNaslov')
    .contains('Kontakt')
    .should('be.visible')

    cy.get('button[type="button"]').as('sendButton');
    cy.get('@sendButton')
    .should('be.disabled')



  });

  it('TC04-footer-kontakt- should not send message with empty form', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > a:nth-child(1)').as('kontaktLink');
    cy.get('@kontaktLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kontakt');

    cy.get('.contactSection_title__ABrZ2').as('kontaktNaslov');
    cy.get('@kontaktNaslov')
    .contains('Kontakt')
    .should('be.visible');

    cy.get('.contactUsForm_textarea__nVLpc').as('sendMessage')
    cy.get('@sendMessage')
    .scrollIntoView()
    .type(testMessage);

    cy.get('button[type="button"]').as('sendButton');
    cy.get('@sendButton')
    .should('be.disabled');



  });

  it('TC05-footer-kontakt- should not send message with name only', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > a:nth-child(1)').as('kontaktLink');
    cy.get('@kontaktLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kontakt');

    cy.get('.contactSection_title__ABrZ2').as('kontaktNaslov');
    cy.get('@kontaktNaslov')
    .contains('Kontakt')
    .should('be.visible');

    cy.get('input[id="first_name"]').as('nameField');
    cy.get('@nameField')
    .scrollIntoView({ force: true})
    .type(testName);

    cy.get('.contactUsForm_textarea__nVLpc').as('sendMessage')
    cy.get('@sendMessage')
    .scrollIntoView()
    .type(testMessage);

    cy.get('button[type="button"]').as('sendButton');
    cy.get('@sendButton')
    .should('be.disabled');


  });

  it('TC06-footer-kontakt- should not send message with last name only', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > a:nth-child(1)').as('kontaktLink');
    cy.get('@kontaktLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kontakt');

    cy.get('.contactSection_title__ABrZ2').as('kontaktNaslov');
    cy.get('@kontaktNaslov')
    .contains('Kontakt')
    .should('be.visible');

    cy.get('input[id="last_name"]').as('lastNameField');
    cy.get('@lastNameField')
    .scrollIntoView()
    .type(testLastName);

    cy.get('.contactUsForm_textarea__nVLpc').as('sendMessage')
    cy.get('@sendMessage')
    .scrollIntoView()
    .type(testMessage);

    cy.get('button[type="button"]').as('sendButton');
    cy.get('@sendButton')
    .should('be.disabled');


  });

  it('TC07-footer-kontakt- should not send message with email only', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > a:nth-child(1)').as('kontaktLink');
    cy.get('@kontaktLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kontakt');

    cy.get('.contactSection_title__ABrZ2').as('kontaktNaslov');
    cy.get('@kontaktNaslov')
    .contains('Kontakt')
    .should('be.visible');

    cy.get('input[id="email"]').as('emailField');
    cy.get('@emailField')
    .scrollIntoView()
    .type(testEmail);

    cy.get('.contactUsForm_textarea__nVLpc').as('sendMessage')
    cy.get('@sendMessage')
    .scrollIntoView()
    .type(testMessage);

    cy.get('button[type="button"]').as('sendButton');
    cy.get('@sendButton')
    .should('be.disabled');
  });

  it('TC08-footer-kontakt- should not send message with phone number only', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > a:nth-child(1)').as('kontaktLink');
    cy.get('@kontaktLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kontakt');

    cy.get('.contactSection_title__ABrZ2').as('kontaktNaslov');
    cy.get('@kontaktNaslov')
    .contains('Kontakt')
    .should('be.visible');

    cy.get('input[id="phone_number"]').as('phoneNumberField');
    cy.get('@phoneNumberField')
    .scrollIntoView()
    .type(testPhoneNumber);

    cy.get('.contactUsForm_textarea__nVLpc').as('sendMessage')
    cy.get('@sendMessage')
    .scrollIntoView()
    .type(testMessage);

    cy.get('button[type="button"]').as('sendButton');
    cy.get('@sendButton')
    .should('be.disabled');

  });

  it('TC09-footer-kontakt- should not be clickable with empty strings', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > a:nth-child(1)').as('kontaktLink');
    cy.get('@kontaktLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kontakt');

    cy.get('.contactSection_title__ABrZ2').as('kontaktNaslov');
    cy.get('@kontaktNaslov')
    .contains('Kontakt')
    .should('be.visible');

    cy.get('input[id="first_name"]').type(' ')
    cy.get('div.input_error__g1FJt:nth-child(1) > p:nth-child(4)')
    .contains('Obavezno polje').should('be.visible');
    cy.get('input[id="last_name"]').type(' ')
    cy.get('div.input_formGroup__xlGGZ:nth-child(2) > p:nth-child(4)')
    .contains('Obavezno polje').should('be.visible');
    cy.get('input[id="email"]').type(' ')
    cy.get('div.input_formGroup__xlGGZ:nth-child(3) > p:nth-child(4)')
    .contains('Obavezno polje').should('be.visible');
    cy.get('input[id="phone_number"]').type(' ')
    cy.get('div.input_formGroup__xlGGZ:nth-child(4) > p:nth-child(4)')
    .contains('Telefon mora biti u ispravnom formatu (+3816...)').should('be.visible');
    cy.get('.contactUsForm_textarea__nVLpc').as('sendMessage')
    cy.get('@sendMessage')
    .scrollIntoView()
    .type(' ')
    cy.get('p.errorMessage:nth-child(3)')
    .contains('Obavezno polje').should('be.visible');

    cy.get('button[type="button"]')
    .contains('Pošaljite')
    .should('be.disabled');


  });

  it('TC10-footer-kontakt-should not send message with non valid email', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > a:nth-child(1)').as('kontaktLink');
    cy.get('@kontaktLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kontakt');

    cy.get('.contactSection_title__ABrZ2').as('kontaktNaslov');
    cy.get('@kontaktNaslov')
    .contains('Kontakt')
    .should('be.visible');

    cy.get('input[id="first_name"]').type(testName);
    cy.get('input[id="last_name"]').type(testLastName);
    cy.get('input[id="email"]').type(nonValidEmail);
    cy.get('.errorMessage')
    .contains('Neispravan format email adrese.')
    .should('be.visible');
    cy.get('input[id="phone_number"]').type(testPhoneNumber)
    cy.get('.contactUsForm_textarea__nVLpc').as('sendMessage')
    cy.get('@sendMessage')
    .scrollIntoView()
    .type(testMessage)

    cy.get('button[type="button"]')
    .contains('Pošaljite')
    .should('be.disabled');

  });

  it('TC11-footer-kontakt-should not send message with non valid email (2)', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > a:nth-child(1)').as('kontaktLink');
    cy.get('@kontaktLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kontakt');

    cy.get('.contactSection_title__ABrZ2').as('kontaktNaslov');
    cy.get('@kontaktNaslov')
    .contains('Kontakt')
    .should('be.visible');

    cy.get('input[id="first_name"]').type(testName);
    cy.get('input[id="last_name"]').type(testLastName);
    cy.get('input[id="email"]').type(nonValidEmail2);
    cy.get('input[id="phone_number"]').type(testPhoneNumber)
    cy.get('.contactUsForm_textarea__nVLpc').as('sendMessage')
    cy.get('@sendMessage')
    .scrollIntoView()
    .type(testMessage)

    cy.get('button[type="button"]')
    .contains('Pošaljite')
    .click();

    cy.get('.toaster_wrapper__EK31l')
    .contains('Poruka nije poslata')
    .should('be.visible');

  });

  it('TC12-footer-kontakt- successful message send', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > a:nth-child(1)').as('kontaktLink');
    cy.get('@kontaktLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kontakt');

    cy.get('.contactSection_title__ABrZ2').as('kontaktNaslov');
    cy.get('@kontaktNaslov')
    .contains('Kontakt')
    .should('be.visible');

    cy.get('input[id="first_name"]').type(testName);
    cy.get('input[id="last_name"]').type(testLastName);
    cy.get('input[id="email"]').type(testEmail);
    cy.get('input[id="phone_number"]').type(testPhoneNumber)
    cy.get('.contactUsForm_textarea__nVLpc').as('sendMessage')
    cy.get('@sendMessage')
    .scrollIntoView()
    .type(testMessage)

    cy.get('button[type="button"]')
    .contains('Pošaljite')
    .click();

    cy.get('.toaster_wrapper__EK31l')
    .contains('Poruka je uspešno poslata')
    .should('be.visible');


  });

  it('TC13-footer- testing "Lokacije" link- should open locations page', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(1) > ul:nth-child(2) > li:nth-child(3) > div:nth-child(1) > a:nth-child(1)').as('locationsLink');
    cy.get('@locationsLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/lokacije');

    cy.get('.locations-page_title__GX_NP').as('pageTitle')
    .contains('Lokacije')
    .should('be.visible')

    cy.get('.locations-page_storeWrapper__DWwIs').as('locationsList')
    .should('be.visible');
  
  });

  it('TC14-footer-lokacije- checking the location link', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(1) > ul:nth-child(2) > li:nth-child(3) > div:nth-child(1) > a:nth-child(1)').as('locationsLink');
    cy.get('@locationsLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/lokacije');

    cy.get('.locations-page_title__GX_NP').as('pageTitle')
    .contains('Lokacije')
    .should('be.visible')

    cy.get('.locations-page_storeWrapper__DWwIs').as('locationsList')
    .should('be.visible');

    cy.get('@locationsList')
    .find('.location_location__1k_i_').first()
    .find('a').as('locationLink')
    .contains('Knez Mihailova 2 - 11000 Beograd')
    .should('have.attr', 'href').and('include', 'https://maps.app.goo.gl/nyqhVdwrxtLHuVgA7');
    
    

  });

  it('TC15-footer- checking instagram link', () => {

    
    cy.get('a[href="https://www.instagram.com/miamayabeograd/?hl=en"]')
    .invoke('removeAttr', 'target')
    .click();

    cy.origin('https://www.instagram.com', () => {

      cy.get('svg[aria-label="Instagram"]')
    .should('be.visible')

    })
    
  });

  it('TC16-footer-checking facebook link', () => {

    cy.get('a[href="https://www.facebook.com/miamayabeograd"]')
    .invoke('removeAttr', 'target')
    .click();

    cy.origin('https://www.facebook.com/miamayabeograd', () => {

    })

  });

  // it('TC17-footer- checking youtube link', () => {

  //   cy.clearCookies();
  //   cy.clearLocalStorage();

  //   cy.get('a[href="https://www.youtube.com/@miamayabeograd"]')
  //   .invoke('removeAttr', 'target')
  //   .click()
  //   .get('.dynamic-text-view-model-wiz__h1 > span:nth-child(1)').should('be.visible')

  //   cy.url().should('include', 'https://www.youtube.com/@miamayabeograd');
  // });

  it('TC18-footer- checking linkedIn link', () => {

    cy.get('a[href="https://rs.linkedin.com/company/miamara"]')
    .invoke('removeAttr', 'target')
    .click();

    cy.origin('https://rs.linkedin.com/company/miamara', () => {

    });

  });

  it('TC19-footer- testing "Uslovi koriscenja" link-should take us to terms of use', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(2) > ul:nth-child(2) > li:nth-child(1) > div:nth-child(1) > a:nth-child(1)').as('termsOfUseLink');
    cy.get('@termsOfUseLink')
    .scrollIntoView()
    .click()

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/uslovi-koris%C4%87enja')

    cy.get('.terms_of_use_page_title__sVBIw').as('termsOfUseTitle')
    .should('be.visible')
    cy.get('.terms_of_use_page_description__OGfFr').as('pageDescription')
    .should('be.visible');

  });

  it('TC20-footer-testing "Politika privatnosti" link-should take us to privacy policy page', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(2) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > a:nth-child(1)').as('privacyPolicy');
    cy.get('@privacyPolicy')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/politika-privatnosti')

    cy.get('.privacy_policy_page_title__b4jUQ').as('privacyPolicyTitlePage')
    .should('be.visible')
    cy.get('.privacy_policy_page_pageWrapper__0ZBmq').as('privacyPolicyContent')
    .should('be.visible')


  });

  it('TC21-footer-testing "Politika kolacica"link-should take us to cookie policy page', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(2) > ul:nth-child(2) > li:nth-child(3) > div:nth-child(1) > a:nth-child(1)').as('cookiePolicy');
    cy.get('@cookiePolicy')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/politika-kola%C4%8Di%C4%87a')

    cy.get('.cookies_policy_page_title__tdIj7').as('cookiePolicyPageTitle')
    .should('be.visible')
    cy.get('.cookies_policy_page_content__BZREb').as('cookiePolicyContent')
    .should('be.visible')


  });

  it('TC21-footer-testing "Reklamacije" link-should take us to reklamacije page', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(2) > ul:nth-child(2) > li:nth-child(4) > div:nth-child(1) > a:nth-child(1)').as('Reklamacije');
    cy.get('@Reklamacije')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/reklamacije')

    cy.get('.simple_page_title__UV_Yw').as('reklamacijePageTitle')
    .should('be.visible')
    cy.get('.simple_page_content__yA2Pj').as('reklamacijeContent')
    .should('be.visible')

  });

  it('TC22-footer- testing "Kako kupiti"-link-should take us to separate page', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(3) > ul:nth-child(2) > li:nth-child(1) > div:nth-child(1) > a:nth-child(1)').as('kakoKupiti');
    cy.get('@kakoKupiti')
    .scrollIntoView()
    .click()

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kako-kupiti')

    cy.get('.simple_page_title__UV_Yw').as('kakoKupitiPageTitle')
    .contains('Kako kupiti')
    .should('be.visible')
    cy.get('.simple_page_content__yA2Pj').as('kakoKupitiContent')
    .should('be.visible');

  });

  it('TC23-footer-testing "Brendovi"link- should take us to brands page', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(4) > ul:nth-child(2) > li:nth-child(1) > div:nth-child(1) > a:nth-child(1)').as('brandsLink');
    cy.get('@brandsLink')
    .scrollIntoView()
    .click()

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/brendovi')

    cy.get('.brands_page_title__KTmHT').as('brandsPageTitle')
    .contains('BRENDOVI')
    .should('be.visible');
    cy.get('.brands_page_description__pD1VD').as('brandsPageDescription')
    .contains('U slavnom carstvu vrhunske mode, MiaMara stoji kao svetionik izvrsnosti, ponosno vodeći na tržištu već četvrt veka')
    .should('be.visible')

  });

  it('TC24-footer-testing "Odeca" link- should take us to clothes page on click', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(4) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > a:nth-child(2)').as('odecaLink');
    cy.get('@odecaLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kategorija/odeca')

    cy.get('.pageTitle').as('odecaPageTitle')
    .contains('Odeća')
    .should('be.visible')
    cy.get('.recomendedFilters_recomendedFilters__tdbpl').as('recommendedFilteri')
    cy.get('@recommendedFilteri')
    .find('.filters_section_recomendedFilterItem__lO7uv').as('majiceFilter')
    .contains('Majice').should('be.visible')
    cy.get('@recommendedFilteri')
    .find('.filters_section_recomendedFilterItem__lO7uv').as('HaljineFilter')
    .contains('Haljine').should('be.visible')

  });

  it('TC25-footer-odeca- checking "Majice" drop down link', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(4) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > div:nth-child(1) > svg:nth-child(1)').as('odecaDropDown');
    cy.get('@odecaDropDown')
    .scrollIntoView()
    .click()

    cy.get('a[href="/kategorija/odeca/majice"]')
    .contains('Majice')
    .click({ force: true})

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kategorija/odeca/majice')

    cy.get('.pageTitle').as('majicePageTitle')
    .contains('Majice')
    .should('be.visible')
    cy.get('.pageDescription').as('majicePageDescription')
    .contains('Majica je nezaobilazan odevni all seasons komad. Savršene su za kombinovanje sa blejzerima za poslovne prilike, uz džins i pa...')
    .should('be.visible')
  });

  it('TC26-footer-odeca-checking "Bluze" drop down link', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(4) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > div:nth-child(1) > svg:nth-child(1)').as('odecaDropDown');
    cy.get('@odecaDropDown')
    .scrollIntoView()
    .click()

    cy.get('a[href="/kategorija/odeca/bluze"]')
    .contains('Bluze')
    .click({ force: true})
    
    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kategorija/odeca/bluze');

    cy.get('.pageTitle').as('bluzePageTitle')
    .contains('Bluze')
    .should('be.visible')
    cy.get('.pageDescription').as('majicePageDescription')
    .contains('Bluze su modni komad koji će istaći Vaš autentičan i istančan stil. Možete se odlučiti za suptilne nijanse u skladu sa Vašim ...')
    .should('be.visible');

  });

  // it('TC27-footer-odeca-checking "Rolke" drop down link', () => {

  //   cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(4) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > div:nth-child(1) > svg:nth-child(1)').as('odecaDropDown');
  //   cy.get('@odecaDropDown')
  //   .scrollIntoView()
  //   .click()

  //   cy.get('a[href="/kategorija/odeca/rolke"]')
  //   .contains('Rolke')
  //   .click({ force: true})
    
  //   cy.url().should('eq', 'https://miamaya.cubesdev.rs/kategorija/odeca/rolke');

  //   cy.get('.pageTitle').as('rolkePageTitle')
  //   .contains('Rolke')
  //   .should('be.visible')
  //   cy.get('.pageDescription').as('rolkePageDescription')
  //   .contains('Rolka je jedan od najtraženiji komada garderobe tokom jesenjih dana. Sofisticirana sa uskom turtle kragnom uz suknju klasično...')
  //   .should('be.visible');

  // });  Test zakomentarisan zato sto je skinut link za rolke sa sajta

  it('TC28-footer-testing "Obuca" link-should take us to footwear page', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(4) > ul:nth-child(2) > li:nth-child(3) > div:nth-child(1) > a:nth-child(2)').as('obucaLink')
    cy.get('@obucaLink')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kategorija/obuca');

    cy.get('.pageTitle').as('obucaPageTitle')
    .contains('Obuća')
    .should('be.visible');
    cy.get('.recomendedFilters_recomendedFilters__tdbpl').as('recommendedFilteri')
    cy.get('@recommendedFilteri')
    .find('.filters_section_recomendedFilterItem__lO7uv').as('cizmeFilter')
    .contains('Čizme').should('be.visible')
    cy.get('@recommendedFilteri')
    .find('.filters_section_recomendedFilterItem__lO7uv').as('cipeleFilter')
    .contains('Cipele').should('be.visible')
    

  });

  it('TC29-footer-obuca-checking "Cipele" drop down link', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(4) > ul:nth-child(2) > li:nth-child(3) > div:nth-child(1) > div:nth-child(1) > svg:nth-child(1)').as('obucaDropDown')
    cy.get('@obucaDropDown')
    .scrollIntoView()
    .click()

    cy.get('a[href="/kategorija/obuca/cipele"]')
    .contains('Cipele')
    .click({ force: true})

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kategorija/obuca/cipele');

    cy.get('.pageTitle').as('cipelePageTitle')
    .contains('Cipele')
    .should('be.visible')
    cy.get('.pageDescription').as('cipelePageDescription')
    .contains('Dame znaju da samo uz prave cipele njihov modni stil može biti jedinstven. Izaberite ravne cipele ležernog stila za casual vi...')
    .should('be.visible')

  });

  it('TC30-footer-obuca-checking "Sandale" drop down link', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(4) > ul:nth-child(2) > li:nth-child(3) > div:nth-child(1) > div:nth-child(1) > svg:nth-child(1)').as('obucaDropDown')
    cy.get('@obucaDropDown')
    .scrollIntoView()
    .click()

    cy.get('a[href="/kategorija/obuca/sandale"]')
    .contains('Sandale')
    .click({ force: true})

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kategorija/obuca/sandale');

    cy.get('.pageTitle').as('sandalePageTitle')
    .contains('Sandale')
    .should('be.visible')
    cy.get('.pageDescription').as('sandalePageDescription')
    .contains('Sa letom dolazi i sezona sandala. Možete odabrati modele koji odgovaraju ležernom, svakodnevnom stilu, kao i one ženstvenije ...')
    .should('be.visible')


  });

  it('TC31-footer-obuca-checking "Patike" drop down link', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(4) > ul:nth-child(2) > li:nth-child(3) > div:nth-child(1) > div:nth-child(1) > svg:nth-child(1)').as('obucaDropDown')
    cy.get('@obucaDropDown')
    .scrollIntoView()
    .click()

    cy.get('a[href="/kategorija/obuca/patike"]')
    .contains('Patike')
    .click({ force: true})

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kategorija/obuca/patike');

    cy.get('.pageTitle').as('patikePageTitle')
    .contains('Patike')
    .should('be.visible')
    cy.get('.pageDescription').as('patikePageDescription')
    .contains('Ženske patike iz MiaMaya Fashion Concept Store asortimana su nezaobilazan komad u kolekciji svake moderne dame, bez obzira n...')
    .should('be.visible')

  });

  it('TC32-footer-testing "Aksesoari" link-should take us to accessories page on click', () => {

    cy.get('a[href="/kategorija/aksesoari"]').as('aksesoariLink');
    cy.get('@aksesoariLink')
    .contains('Aksesoari')
    .scrollIntoView()
    .click();

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kategorija/aksesoari');

    cy.get('.pageTitle').as('aksesoariPageTitle')
    .contains('Aksesoari')
    .should('be.visible')
    cy.get('.recomendedFilters_recomendedFilters__tdbpl').as('recommendedFilteri');
    cy.get('@recommendedFilteri')
    .find('.filters_section_recomendedFilterItem__lO7uv').as('NakitFilter')
    .contains('Nakit').should('be.visible')
    cy.get('@recommendedFilteri')
    .find('.filters_section_recomendedFilterItem__lO7uv').as('kapeFilter')
    .contains('Kape').should('be.visible')

  });

  // it('TC33-footer-aksesoari-checking "Ogrlice" dropdown link', () => {

  //   cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(4) > ul:nth-child(2) > li:nth-child(4) > div:nth-child(1) > div:nth-child(1) > svg:nth-child(1)').as('aksesoariDropDown');
  //   cy.get('@aksesoariDropDown')
  //   .scrollIntoView()
  //   .click()

  //   cy.get('a[href="/kategorija/aksesoari/ogrlica"]')
  //   .contains('Ogrlice')
  //   .click({ force: true});

  //   cy.url().should('eq', 'https://miamaya.cubesdev.rs/kategorija/aksesoari/ogrlica');

  //   cy.get('.pageTitle').as('ogrlicePageTitle')
  //   .contains('Ogrlica')
  //   .should('be.visible')
  //   cy.get('.pageDescription')
  //   .contains('Savršeni statement komad koji će i casual kombinaciju učiniti posebnom. Ogrlice, predstavljaju posebnu kategoriju aksesoara k...')
  //   .should('be.visible')

  // });  Test zakomentarisan zato sto je skinut link za ogrlice sa sajta

  it('TC34-footer-aksesoari-checking "Kape" dropdown link', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(4) > ul:nth-child(2) > li:nth-child(4) > div:nth-child(1) > div:nth-child(1) > svg:nth-child(1)').as('aksesoariDropDown');
    cy.get('@aksesoariDropDown')
    .scrollIntoView()
    .click()

    cy.get('a[href="/kategorija/aksesoari/kape"]')
    .contains('Kape')
    .click({ force: true});

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kategorija/aksesoari/kape');

    cy.get('.pageTitle').as('kapePagetitle')
    .contains('Kape')
    .should('be.visible')
    cy.get('.pageDescription').as('kapePageDescription')
    .contains('Bilo da želite zaštitu od kiše, snega ili sunca, kape su šik aksesoar, dovoljan da vas zaštite, ali i daju notu mističnosti v...')
    .should('be.visible')

  });

  it('TC35-footer-aksesoari-checking "Marame" dropdown link', () => {

    cy.get('li.footerBottom_footerMenuItem__pyMgX:nth-child(4) > ul:nth-child(2) > li:nth-child(4) > div:nth-child(1) > div:nth-child(1) > svg:nth-child(1)').as('aksesoariDropDown');
    cy.get('@aksesoariDropDown')
    .scrollIntoView()
    .click()

    cy.get('a[href="/kategorija/aksesoari/esarpe-i-marame"]')
    .contains('Marame')
    .click({ force: true});

    cy.url().should('eq', 'https://miamaya.cubesdev.rs/kategorija/aksesoari/esarpe-i-marame');

    cy.get('.pageTitle').as('maramePageTitle')
    .contains('marame')
    .should('be.visible')
    cy.get('.pageDescription').as('maramePageDescription')
    .contains('Marame - aksesoar koji će oplemeniti svaku modnu kombinaciju. Čak i najjednostavniji outfit će dobiti svoju sofisticiranu not...')
    .should('be.visible')


  });

 

});

