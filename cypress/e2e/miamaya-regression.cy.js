describe('checkout testing', { scrollBehavior: 'center'},() => {

  let newsletterNonValidEmail = 'uros.rasic@';
  let newsletterBadFormatEmail = 'uros.rasic@fsfs';
  let newsletterExistingEmail = 'uros.rasic@cubes.rs';
  


    

    before(function() {
      
        Cypress.on('uncaught:exception', (err, runnable) => {
                        return false
                     })
          
        
        });

    beforeEach(function(){
        cy.viewport(1400,1000) //1280,720
        cy.visit('', { failOnStatusCode: false});
        cy.turnOffPopup();
        cy.contains('Dozvoli sve').should('exist')
        cy.contains('Dozvoli sve').click({ force: true});
       


    });

  


  it('TC03- dodavanje proizvoda u wish list', () => {

    cy.chooseProductByTitle();

    cy.login();

    cy.wait(2000);

    cy.get('.productInfo_titleWishlistWrapper__ksnOV')
   .find('.productInfo_sku__sqsTf').first().then(($sku)=>{// stavljamo sku proizvoda iz single product view-a kao konstantu

      const productSku = $sku.text();

      cy.get('[data-test="wishListButton"]')
  .scrollIntoView()
  .click({ force: true});

  cy.get('[data-test="heartIcon"]')
  .click();

  cy.get('.wishlist_product__8Zuk7')
  .click();

  cy.get('.productInfo_sku__sqsTf').then(($listSku)=>{// sada uzimamo sku istog proizvoda iz wish liste radi provere

    const productSku2 = $listSku.text();

    assert.equal(productSku, productSku2);// proveravamo da li se u wish listi nalazi taj proizvod koji smo dodali
  
  cy.wait(1000)

  cy.get('[data-test="wishListButton"]')
  .click();

  cy.contains('Izbačeno iz liste želja.')
  .should('be.visible');// kada smo potvrdili identitet proizvoda, izbacujemo ga iz wish liste


  })
  
  

    })

  

  //cy.get('span[class="product_wishlistButton__emMyR"]')
  //.scrollIntoView()
  //.click({ force: true});


  });

  it('TC04- isprobavanje vodica za velicine', () => {

   cy.chooseProductByTitle();


  cy.get('[data-test="sizeGuide"]')
  .scrollIntoView()
  .click({ force: true})
  cy.get('.sizeGuide_sizeGuideWindow__7XsEz')
  .should('be.visible');







  });

  it('TC05-checkout', () => {

    
    

   cy.chooseProductByTitle();

     cy.login();
      
    cy.get('.select_selectBtn__PU0g1').as('izaberiVelicinuButton');
      cy.get('@izaberiVelicinuButton')
      .scrollIntoView()
      .contains('Izaberite veličinu')
      .click({ force: true });
      
      cy.get('.select_selectContent__vo485 .select_selectItem__jmrF1')
      .filter('[data-test]')
      .first()
      .scrollIntoView()
      .click({ force: true});

      cy.get('[data-test="productInfoCartButton"]')
      .contains('Dodaj u korpu')
      .scrollIntoView()
      .click({ force: true});
      cy.get('[data-test="cartShortcutButton"]')
      .contains('Pogledaj korpu')
      .click();
      cy.get('[data-test="cartProduct"]').should('be.visible');
     

      

      cy.get('[data-test="cartShortcutButton"]').as('checkoutButton');
      cy.wait(2000);
      cy.get('@checkoutButton')
      .contains('Produži na checkout')
      .should('be.visible')
      .scrollIntoView()
      .click({ force: true})

      cy.get('section[id="checkout_section"]')
      .should('be.visible');
      


  });

  it('TC06- dodavanje proizvoda u korpu iz wish liste', () => {

    let firstImageSrc; //pravimo varijablu u koju cemu ubaciti sliku iz product view-a kako bismo poredili sa wish listom

    cy.visit('https://miamaya.cubesdev.rs/kategorija/odeca/majice');

    cy.get('[data-test="productList"]')
    .find('[data-test="single-product"]').eq(0)
    .click();

    cy.login();
    cy.wait(2000)

    cy.get('img[src="https://miamaya.cubesdev.rs/storage/thumbs/768/103930A189-M28_0.jpg')
    .invoke('attr', 'src')
    .then((src)=>{
      firstImageSrc = src;
    })

  cy.get('[data-test="wishListButton"]')
  .scrollIntoView()
  .click({ force: true});

  cy.get('[data-test="heartIcon"]').as('wishlistButton')
  .click({ force: true});
  cy.get('[data-test="single-product"]')
  .first()
  .should('be.visible');

  cy.wait(2000)

  cy.get('.select_selectBtn__PU0g1').as('izaberiVelicinuButton');
      cy.get('@izaberiVelicinuButton')
      .scrollIntoView()
      .contains('Izaberite veličinu')
      .click({ force: true });
      
      cy.get('.select_selectContent__vo485 .select_selectItem__jmrF1')
      .filter('[data-test]')
      .first()
      .scrollIntoView()
      .click({ force: true});

      cy.get('[data-test="productInfoCartButton"]')
      .click();

      cy.get('[data-test="cartShortcutButton"]').as('pogledajKorpu');
      cy.get('@pogledajKorpu')
      .click();

      cy.get('img[src="https://miamaya.cubesdev.rs/storage/thumbs/768/103930A189-M28_0.jpg"]')
      .invoke('attr', 'src')
      .then((secondImageSrc)=>{

        expect(secondImageSrc).to.eq(firstImageSrc);

      });

      cy.get('@wishlistButton')
      .click()
      cy.get('[data-test="addRemoveToWishList"]')
      .click()
      cy.contains('Vaša lista želja je prazna! Za inspiraciju, pogledajte nove artikle.')
      .should('be.visible');

  });

  it('TC07- newsletter- submit praznog polja', () => {

    cy.get('button[type="button"]')
    .contains('PRIJAVITE SE')
    .scrollIntoView()
    .should('be.disabled');

  });

  it('TC08- newsletter- submit praznog stringa', () => {

    cy.get('input[id="mauticform_input_newsletterforma_email"]').as('newsLetterEmail');
    cy.get('@newsLetterEmail')
    .type(' ');
    cy.get('button[type="button"]')
    .contains('PRIJAVITE SE')
    .should('be.disabled')

  });

  it('TC09- newsletter- submit nevalidnog emaila', () => {

    cy.get('input[id="mauticform_input_newsletterforma_email"]').as('newsLetterEmail');
    cy.get('@newsLetterEmail')
    .type(newsletterNonValidEmail)
    cy.get('.newsletterForm_fakeCheckbox__lMXQh').as('privacyPolicy')
    .click();
    cy.get('button[type="button"]')
    .contains('PRIJAVITE SE')
    .should('be.disabled');

  });

  it('TC10- newsletter- submit emaila u losem foratu', () => {

    cy.get('input[id="mauticform_input_newsletterforma_email"]').as('newsLetterEmail');
    cy.get('@newsLetterEmail')
    .type(newsletterBadFormatEmail)
    cy.get('.newsletterForm_fakeCheckbox__lMXQh').as('privacyPolicy')
    .click();
    cy.get('button[type="button"]')
    .contains('PRIJAVITE SE')
    .click()
    cy.contains('The email is invalid.', {timeout: 7000})
    .should('be.visible')
    // cy.get('.toaster_content__1QX8C')
    // .contains('Neispravan format e-maila')
    // .should('be.visible');

  });

  // it('TC10- newsletter- submit postojeceg emaila', () => {

  //   cy.get('input[id="mauticform_input_newsletterforma_email"]').as('newsLetterEmail');
  //   cy.get('@newsLetterEmail')
  //   .type(newsletterExistingEmail);
  //   cy.get('.newsletterForm_fakeCheckbox__lMXQh').as('privacyPolicy')
  //   .click();
  //   cy.get('button[type="button"]')
  //   .contains('PRIJAVITE SE')
  //   .click();
  //   cy.get('.toaster_content__1QX8C')
  //   .contains('Već ste pretplaćeni sa ovim mailom.')
  //   .should('be.visible');

  // });

  // it('TC11- newsletter- uspesan submit', () => {

  //   //obavljamo ceo test unutar custom komande koja nam generise email
  //   cy.generateRandomEmail().then((email) => {
  //     cy.get('input[id="mauticform_input_newsletterforma_email"]').as('newsLetterEmail');
  //   cy.get('@newsLetterEmail')
  //   .type(email);
  //   cy.get('.newsletterForm_fakeCheckbox__lMXQh').as('privacyPolicy')
  //   .click();
  //   cy.get('button[type="button"]')
  //   .contains('PRIJAVITE SE') 
  //   .click();
  //   cy.get('.toaster_content__1QX8C')
  //   .contains('Uspešno ste se pretplatili preko email-a!')
  //   .should('be.visible')

  //   })
    
    
    
  // });


//   it('TC12- proveravanje popusta- should calculate correctly', () => {

//     cy.get('[data-test="headerMenuItem1"]')  
//     .contains('sale')
//     .click()

//     cy.get('[data-test="productList"]')
//     .find('[data-test="single-product"]').eq(0)
//     .click()

//     cy.get('[data-test="productInfoCurrentPrice"]').as('discountPrice');
//     cy.get('@discountPrice').then(($discountPrice)=>{

//       let finalPrice = $discountPrice.text().trim();
//       finalPrice = finalPrice.replace(',', '.');
//       finalPrice = parseFloat(finalPrice)

//       cy.get('[data-test="productInfoOldPrice"]').as('price');
//       cy.get('@price').then(($price)=> {

//         let originalPrice = $price.text().trim();
//         originalPrice = originalPrice.replace(',', '.');
//         originalPrice = parseFloat(originalPrice);

//         cy.get('.priceWrapper_percentageDiscount__iLEDh').invoke('text').then((text)=> {

//           const discount = parseInt(text.match(/\d+/)[0], 10); // posto je tekstualni prikaz popusta 51%, ovim uklanjamo sve simbole iz teksta i ostavljamo samo broj
//           expect(discount).to.eq(51);


//           cons
//       })

//     })


//   })

  
  
// });

it('TC13- proveravanje updejta kolicine u korpi(povecavanje i smanjivanje)', () => {

  cy.chooseProductByTitle();

  
        cy.login();

        cy.get('.select_selectBtn__PU0g1')
        .scrollIntoView()
        .contains('Izaberite veličinu')
        .click({ force: true });
        
        cy.get('.select_selectContent__vo485 .select_selectItem__jmrF1')
        .filter('[data-test]')
        .first()
        .scrollIntoView()
        .click({ force: true});

        cy.get('[data-test="productInfoCurrentPrice"]').as('price')
        cy.get('@price').then(($price)=> {

          let firstPrice = $price.text().trim();
          firstPrice = firstPrice.replace('.', '');
          firstPrice = firstPrice.replace(',', '.');
          firstPrice = parseFloat(firstPrice);

          cy.get('[data-test="productInfoCartButton"]')
        .contains('Dodaj u korpu')
        .scrollIntoView()
        .click({ force: true});
        cy.get('[data-test="cartShortcutButton"]')
        .contains('Pogledaj korpu')
        .click();
        cy.get('[data-test="cartProduct"]').should('be.visible');


          cy.get('[data-test="plusCart"]', {timeout: 7000}).eq(1).as('addAmount')
          .click();

          cy.wait(2000)

          cy.get('.desktopCartProduct_totalPrice__BiNWh').then(($totalPrice)=> {

            let increasedPrice = $totalPrice.contents().text();
            increasedPrice = increasedPrice.replace('.', '')
            increasedPrice = parseFloat(increasedPrice);

            

             assert.equal(increasedPrice, firstPrice*2)


           

            
          })

          cy.get('[data-test="minusCart"]',{ timeout: 7000}).eq(0).as('removeAmount')
          .click({ force: true})
          cy.wait(2000)

          cy.get('.desktopCartProduct_totalPrice__BiNWh').then(($totalPrice2)=> {

            let decreasedPrice = $totalPrice2.contents().text().trim();
            decreasedPrice = decreasedPrice.replace('.', '');
            decreasedPrice = parseFloat(decreasedPrice);

            assert.equal(decreasedPrice, firstPrice)
          })

        

          


        })
  
        



});

it('TC14- izbacivanje prozivoda iz korpe', () => {

  cy.chooseProductByTitle();

      cy.login();

      cy.get('.select_selectBtn__PU0g1')
      .scrollIntoView()
      .contains('Izaberite veličinu')
      .click({ force: true });
      
      cy.get('.select_selectContent__vo485 .select_selectItem__jmrF1')
      .filter('[data-test]')
      .first()
      .scrollIntoView()
      .click({ force: true});

      cy.get('[data-test="productInfoCartButton"]').as('dodajUKorpu')
      .click()
      cy.get('[data-test="cartShortcutButton"]').as('pogledajKorpu')
      .click()

      cy.get('[data-test="cartProduct"]').should('be.visible');

      cy.get('.desktopCartProduct_removeFromCartText__P2th8').contains('Ukloni')
      .click()

      

});

it('TC15- ubacivanje proizvoda u wish list iz korpe', () => {

  cy.chooseProductByTitle();


      cy.login();

      cy.get('.select_selectBtn__PU0g1')
      .scrollIntoView()
      .contains('Izaberite veličinu')
      .click({ force: true });
      
      cy.get('.select_selectContent__vo485 .select_selectItem__jmrF1')
      .filter('[data-test]')
      .first()
      .scrollIntoView()
      .click({ force: true});

      cy.get('[data-test="productInfoCartButton"]').as('dodajUKorpu')
      .click()
      cy.get('[data-test="cartShortcutButton"]').as('pogledajKorpu')
      .click()

      cy.wait(1000)

      cy.window().then((win) => {
        win.onscroll = null;
      });

      cy.document().then((doc) => {
        doc.body.style.position = 'fixed';
      });

      cy.wait(1000)

      cy.get('.desktopCartProduct_heartIcon__gLliH').as('moveToWishList')
      cy.get('@moveToWishList')
      .find('.desktopCartProduct_wishlistText__4y_Ya')
      .scrollIntoView()
      .click({ force: true})

      // cy.get('.toaster_wrapper__EK31l')
      // .contains('Dodato u listu želja.')
      // .should('be.visible')
      

      cy.get('[data-test="heartIcon"]')
      .click()

      cy.get('[data-test="single-product"]')
      .should('be.visible')

      cy.get('[data-test="addRemoveToWishList"]')
      .click();

      cy.get('.toaster_wrapper__EK31l')
      .contains('Izbačeno iz liste želja.')
      .should('be.visible')
      cy.get('.emptyData_description__Uz_Zw')
      .contains('Vaša lista želja je prazna! ')
      .should('be.visible')
      cy.get('a[href="/proizvodi"]').contains('NOVO')
      .should('be.visible')






  

});

it('TC16-Promena product view-a', () => {
 
  cy.get('[data-test="headerMenuItem1"]')
      .contains('ODEĆA')
      .click();
      cy.wait(2000)
 

  // cuvamo vrednost inicijalne klase product liste radi poredjenja
  cy.get('[data-test="productList"]').then(($productList) => {
    const initialClass = $productList.attr('class');
    
    //kliknemo na button za promenu view-a
    cy.get('[id="Group 11546"]')
      .click({ force: true});
    
    // proveravamo da li se klasa promenila(ako jeste, to znaci da se promenio view u product listi)
    cy.get('[data-test="productList"]').then(($newProductList) => {
      const newClass = $newProductList.attr('class');
      expect(newClass).not.to.equal(initialClass);

      //kliknemo na button za defaultni product view
      cy.get('[id="Group 11547"]')
      .click({ force: true});

      
    });
    
  
});



});

it('TC17-Sortiranje proizvoda po rastucoj ceni', () => {

  cy.get('[data-test="headerMenuItem1"]')
  .contains('ODEĆA')
  .click();

  cy.contains('Najnovije').as('najnovije')
  .click()
  cy.contains('Cena rastuća')
  .click()//sortiramo proizvode po rastucoj ceni

  cy.get('.select_text__E2sB_').should('contain', 'Cena rastuća');

  //iniciramo za sada prazan niz cena u koji cemo da svrstavamo sve cene na stranici
  const prices = [];

  //u listi proizvoda nalazimo artikle i for each petljom prolazimo kroz njih kao individualne elemente
  cy.get('[data-test="productList"] article[data-test="single-product"]').each(($element) =>{

    cy.wrap($element)
    .find('[data-test="productCurrentPrice"]')
    //uzimamo propert elementa, u ovom slucaju tekst(koji je u ovom slucaju cena) i for each-ujemo i njih 
    .invoke('text')
    .then(($priceText)=>{

      //uvodimo varijablu kojoj dodeljujemo vrednost teksta koji smo izvukli u prethodnom koduj
      let productPrice = $priceText

      //'uklanjamo' tacke tako sto ih zamenjujemo praznim stringom radi preciznijeg parsiranja teksta u broj
       productPrice = productPrice.replace('.', '');
      
      //koristimo parseFloat da bi pretvorili tekst u float
      productPrice = parseFloat(productPrice);
     
      // ubacujemo cenu na kraj niza
      prices.push(productPrice);


    });

  }).then(() => {
    //klasicna for petlja kojom izvrsavamo kod koji sleduje dok ne dodjemo do kraja niza(u ovom slucaju liste prozivoda)
    for(let i = 1; i<prices.length; i++){

      //
      expect(prices[i]).to.be.at.least(prices[i - 1], `Price at index ${i} (${prices[i]}) is equal or larger than previous (${prices[i - 1]})`);
    }

  });

 

});

it('TC18-Sortiranje proizvoda po opadajucoj ceni', () => {
   
  cy.get('[data-test="headerMenuItem1"]')
  .contains('ODEĆA')
  .click();

  cy.contains('Najnovije').as('najnovije')
  .click()
  cy.contains('Cena opadajuća')
  .click()

  cy.get('.select_text__E2sB_').should('contain', 'Cena opadajuća');

  const prices = [];

  cy.get('[data-test="productList"] article[data-test="single-product"]').each(($element) =>{

    cy.wrap($element)
    .find('[data-test="productCurrentPrice"]')
    .invoke('text')
    .then(($priceText)=>{
      let productPrice = $priceText

      productPrice = productPrice.replace('.', '')
      productPrice = productPrice.replace('.', '')
      
      
      productPrice = parseFloat(productPrice);
     

      prices.push(productPrice);


    });

  }).then(() => {
    for(let i = 1; i<prices.length; i++){

      expect(prices[i]).to.be.at.most(prices[i - 1], `Price at index ${i} (${prices[i]}) is equal or less than previous (${prices[i - 1]})`);
    }

  });
  

});




});


