describe('miamaya nosto testing', { scrollBehavior: 'center'}, function() {

    let nostoEmail = 'mihail.antonijevic@cubes.rs';
    let nostoPassword = 'Mihail12345';



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
        cy.visit('/')
        cy.turnOffPopup();
        cy.contains('Dozvoli sve').should('exist')
        cy.contains('Dozvoli sve').click({ force: true});
        

    });

    it('TC01-Nosto search testing - compare prices', () => {
      const searchParams = 'ma';
      const frontEndPrices = [];//inicijalizujemo prazan niz u koji cemo ubacivati cene sa fronta jednu po jednu
    
      const extractPrice = (text) => {
        const beforeComma = text.split(',')[0]; // uzimamo sve pre zareza da bi se poklapalo sa nostom(iz nekog razloga u cypress browseru nema decimala)
        const noDots = beforeComma.replace(/\./g, ''); // uklanjamo tačke
        const numericOnly = noDots.replace(/[^\d]/g, ''); // uklanjamo sve što nije broj
        return parseInt(numericOnly, 10);
      };
      
    
      cy.get('.headerMiddle_searchIcon__A_ZLQ').eq(0).click({ force: true });//search dugme
      cy.get('input[id="search_input"]').type(searchParams);//ubacujemo parametre
      cy.wait(4000);
    
      cy.get('.headerSearch_wrapperInner__tfUc4 article',)
      //eachujemo svaki artikal, iz njega izvlacimo text cene
        .each(($article) => {
          cy.wrap($article)
            .find('[data-test="productCurrentPrice"]')
            .invoke('text')
            .then((priceText) => {
              //ubacujemo cenu u niz i ujedno je sredjujemo pomocu extractPrice funkcije
              frontEndPrices.push(extractPrice(priceText));
            });
        })
        .then(() => {
          const frontEndPricesLength = frontEndPrices.length;// izvacimo duzinu niza sa fronta u konstantu
    
          cy.visit('https://my.nosto.com/auth/login');
    //prelazak na nosto
          cy.origin(
            'https://my.nosto.com',
            {
              //prenosimo potrebne varijable kao argumente da bi mogli da ih koristimo u origin-u
              args: {
                nostoEmail,
                nostoPassword,
                searchParams,
                frontEndPrices,
                frontEndPricesLength,
              },
            },
            ({ nostoEmail, nostoPassword, searchParams, frontEndPrices, frontEndPricesLength }) => {
              const extractPrice = (text) => {
                return parseInt(text.replace(/[^\d]/g, ''), 10);// ovde samo uklanjamo sve sto nema broj
              };
    
              cy.get('[id="username"]').type(nostoEmail);
              cy.get('[id="password"]').type(nostoPassword);
              cy.get('[id="signin"]').click();
              cy.contains('Miamaya Test').click();
    
              cy.url().should('eq', 'https://my.nosto.com/admin/hfatfyf6/dashboard');
    
              cy.contains('Product Experience Cloud', { timeout: 5000 }).click();
              cy.contains('Search', { timeout: 7000 }).click();
              cy.contains('Rules', { timeout: 7000 }).click();
              cy.contains('General rule', { timeout: 7000 }).click();
    
              cy.wait(2000)
              cy.get('.content-wrapper > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(2)').scrollIntoView().type(searchParams);
              cy.wait(2000);
    
              const backEndPrices = [];//inicijalizujemo prazan niz u koji cemo svrstavati nosto cene jednu po jednu
    
              cy.get('.grid .product-preview')//iz liste proizvoda gadajmo pojedinacni product
                .each(($product, index) => {
                  if (index < frontEndPricesLength) {//ovo radimo jer u nostu izbacuje vise proizvoda nego na frontu
                    cy.wrap($product)
                      .find('.product-price') 
                      .invoke('text')
                      .then((priceText) => {
                        backEndPrices.push(extractPrice(priceText));
                      });
                  }
                })
                .then(() => {
                  //logujemo sve cene i u cypress konzolu i u browser
                  cy.log('Front End Prices:', JSON.stringify(frontEndPrices));
                  cy.log('Back End Prices:', JSON.stringify(backEndPrices));
                  console.log('Front End Prices:', frontEndPrices);
                  console.log('Back End Prices:', backEndPrices);
                  
                  //
                  frontEndPrices.forEach((frontendPrice, index) => {
                    const backendPrice = backEndPrices[index];
                    expect(backendPrice, `Price mismatch at index ${index}`).to.eq(frontendPrice);
                  });
                });
            }
          );
        });
    });
    
    
      
           
            });

            
        


        

    





