describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')   // reset the content of DB
    const user = {
      name: 'Pavel Test',
      username: 'Pauli4',
      password: 'heslo'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)   // login the use
  })

  it('Login form is shown - front page can be opened ', function() {
    cy.contains('BLOGS APP')
    cy.contains('Log in to application please')
  })

  describe('Login', function() {


    it('succeeds with correct credentials - Can login with Pauli4 heslo', function() {
      cy.get('#username').type('Pauli4')    //find element with id username
      cy.get('#password').type('heslo')
      cy.get('#login-btn').click()
      cy.contains('You were logged in')
    })


    it('Can not be logged in without credentials', function() {
      cy.contains('Login').click()
      cy.contains('Wrong credentials')
    })


    it('fails with wrong credentials - Can NOT be logged in with BAD credentials', function() {
      cy.get('#username').type('Pauli4')    //find element with id username
      cy.get('#password').type('wrongPassword')
      cy.contains('Login').click()

      cy.get('#messageComp')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')  //msg is red
        .and('have.css', 'border-color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'none none none solid') //msg have red border on the LEFT side only

      cy.get('html').should('not.contain', 'Logged as Pauli4. Welcome back!' )

    })
  })

  //==================================== WHEN LOGGED IN ============================== //

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login('Pauli4', 'heslo')

    /*//// MOVED TO COMMAND cy.login(username, password)/*
      cy.get('#username').type('Pauli4')
      cy.get('#password').type('heslo')
      cy.get('#login-btn').click()
    */
    })

    it('Blog can be added via form', function () {
      cy.get('.addBlog-Btn').click()
      cy.get('#inputAuthor').type('Cypress corp.')
      cy.get('#inputTitle').type('E2E test with cypress')
      cy.get('#inputURL').type('www.cypress.io')
      cy.get('#saveBlogBtn').click()


      cy.contains('Cypress corp.')
      cy.contains('E2E test with cypress')
      cy.contains('Blog "E2E test with cypress" was added')
    })

    describe('and blog exists', function() {
      beforeEach( function() {
        cy.createBlog({
          title: 'Cypress is good',
          author: 'Cypress corp.',
          url: 'www.cypress.io'
        })
      })
      /*

      */
      it('Blog can be viewed', function() {
        cy.contains('by Cypress corp.')
        cy.contains('Cypress is good')
      })


      it.only('Blog can be liked and likes are increased by one', function() {
        
        cy.contains('Cypress is good by Cypress corp').parent().parent().parent()
          .find('.t_DetailsBtn').click()
        cy.contains('Likes: 0')   //0 likes at start

        cy.contains('Cypress is good by Cypress corp').parent().parent().parent()
          .find('.t_LikeBtn').click()
        cy.contains('Likes: 1')    //1 like after click
        cy.contains('you liked "Cypress is good" by Cypress corp.')
      })
    })

  })


})


/* NOTES
 it.only  ==> runs only one test (ex. that is beign developed)

it.only('other of those can be made important', function () {
  cy.contains('second note').parent().find('button').as('theButton')   .as saves the element as @...
  cy.get('@theButton').click()
  cy.get('@theButton').should('contain', 'make not important')
})


npm run test:e2e  run in CLI

cypress run --config video=false

      it('then example', function() {
        cy.get('button').then( buttons => {
          console.log('number of buttons', buttons.length)
        })
      })

 */