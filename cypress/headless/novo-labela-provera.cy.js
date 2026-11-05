describe('Retry-ability Session', { scrollBehavior: 'center'},function() {

    before(function() {
      
        Cypress.on('uncaught:exception', (err, runnable) => {
                        return false
                     })
          
        
        
        

        
    
        
        

        
        
    });

    beforeEach(function(){
        cy.viewport(1400,1000) //1280,720
        cy.visit('')
        cy.contains('Dozvoli sve').should('exist')
        cy.contains('Dozvoli sve').click();
       


    });

    it.only('TC01 - u kategoriji novo svi proizvodi treba imati novo labelu', () => {
    
        cy.get('a[data-test="headerMenuItem1"]').contains('NOVO').click();
      
        
        const processPage1 = (pageNumber = 1) => {
          
          cy.get('.productList_productList__u7f1O article[data-test="single-product"]').should('have.length.greaterThan', 0)

          cy.get('.productList_productList__u7f1O article[data-test="single-product"]').each(($article, index, $list) => {
            // cy.wrap($article)//.scrollIntoView();
             cy.wait(50)
            // cy.log(`Checking product ${index + 1} of ${$list.length}`);
      
            
            cy.wrap($article)
              .find('.productArticle_label__TjXUL ').as('labele');
              cy.get('@labele')
              .should('exist') 
              .then(($labels) => {
                
                const hasNovoLabel = [...$labels].some((label) => label.textContent.includes('Novo'));
                expect(hasNovoLabel).to.be.true; 
              });
            
      
            
            cy.wrap($article)
              .find('.productArticle_label__TjXUL ')
              .filter((_, label) => label.textContent.includes('Novo')) 
              .should('have.css', 'color', 'rgb(252, 140, 126)'); 
          });
        
      
          
          cy.get('a.pagination_nextPage__gyN4I')
          .scrollIntoView()
            .then(($nextPage) => {
              if ($nextPage.is(':visible')) {
                cy.wrap($nextPage).click( { force: true});
                cy.wait(1000)
                processPage1(pageNumber + 1);
              } else {
              }
            });
        };
      
        
        processPage1();
    
    
        // const processPage2 = () => {
          
        //   cy.get('.productList_productList__u7f1O article[data-test="single-product"]').each(($article, index, $list) => {
        //     cy.wrap($article)//.scrollIntoView();
        //     cy.wait(500)
        //     cy.log(`Checking product ${index + 1} of ${$list.length}`);
      
            
        //     cy.wrap($article)
        //       .find('.product_label__s4EEn') 
        //       .should('exist') 
        //       .then(($labels) => {
                
        //         const hasNovoLabel = [...$labels].some((label) => label.textContent.includes('Novo'));
        //         expect(hasNovoLabel).to.be.true; 
        //       });
            
      
            
        //     cy.wrap($article)
        //       .find('.product_label__s4EEn')
        //       .filter((_, label) => label.textContent.includes('Novo')) 
        //       .should('have.css', 'color', 'rgb(252, 140, 126)'); 
        //   });
      
          
        //   cy.get('a.pagination_nextPage__gyN4I')
        //   .scrollIntoView()
        //     .then(($nextPage) => {
        //       if ($nextPage.is(':visible')) {
        //         cy.log('Navigating to the next page...');
        //         cy.wrap($nextPage).click( { force: true});
        //         cy.wait(2000)
        //       } else {
        //         cy.log('No more pages, test finished');
        //       }
        //     });
        // };
      
        
        //  processPage2();
    
        // const processPage3 = () => {
          
        //   cy.get('.productList_productList__u7f1O article[data-test="single-product"]').each(($article, index, $list) => {
        //     cy.wrap($article).scrollIntoView();
        //     cy.wait(500)
        //     cy.log(`Checking product ${index + 1} of ${$list.length}`);
      
            
        //     cy.wrap($article)
        //       .find('.product_label__s4EEn') 
        //       .should('exist') 
        //       .then(($labels) => {
                
        //         const hasNovoLabel = [...$labels].some((label) => label.textContent.includes('Novo'));
        //         expect(hasNovoLabel).to.be.true; 
        //       });
      
            
        //     cy.wrap($article)
        //       .find('.product_label__s4EEn')
        //       .filter((_, label) => label.textContent.includes('Novo')) 
        //       .should('have.css', 'color', 'rgb(252, 140, 126)'); 
        //   });
      
          
        //   cy.get('a.pagination_nextPage__gyN4I')
        //   .scrollIntoView()
        //     .then(($nextPage) => {
        //       if ($nextPage.is(':visible')) {
        //         cy.log('Navigating to the next page...');
        //         cy.wrap($nextPage).click( { force: true});
        //         cy.wait(1000)
        //       } else {
        //         cy.log('No more pages, test finished');
        //       }
        //     });
        // };
      
        
        // processPage3();
    
        // const processPage4 = () => {
          
        //   cy.get('.productList_productList__u7f1O article[data-test="single-product"]').each(($article, index, $list) => {
        //     cy.wrap($article).scrollIntoView();
        //     cy.wait(500)
        //     cy.log(`Checking product ${index + 1} of ${$list.length}`);
      
            
        //     cy.wrap($article)
        //       .find('.product_label__s4EEn') 
        //       .should('exist') 
        //       .then(($labels) => {
                
        //         const hasNovoLabel = [...$labels].some((label) => label.textContent.includes('Novo'));
        //         expect(hasNovoLabel).to.be.true; 
        //       });
      
            
        //     cy.wrap($article)
        //       .find('.product_label__s4EEn')
        //       .filter((_, label) => label.textContent.includes('Novo')) 
        //       .should('have.css', 'color', 'rgb(252, 140, 126)'); 
        //   });
      
          
        //   cy.get('a.pagination_nextPage__gyN4I')
        //   .scrollIntoView()
        //     .then(($nextPage) => {
        //       if ($nextPage.is(':visible')) {
        //         cy.log('Navigating to the next page...');
        //         cy.wrap($nextPage).click( { force: true});
        //         cy.wait(1000)
        //       } else {
        //         cy.log('No more pages, test finished');
        //       }
        //     });
        // };
      
        
        // processPage4();
      });
      

});



