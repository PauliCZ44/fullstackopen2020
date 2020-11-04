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

    describe('and blog exists', function() {
      beforeEach( function() {
        cy.createBlog({
          title: 'Cypress is good',
          author: 'Cypress corp.',
          url: 'www.cypress.io'
        })
      })
      /*
      cy.get('#inputAuthor').type('Cypress corp.')
      cy.get('#inputTitle').type('Cypress is good')
      cy.get('#inputURL').type('www.cypress.io')
      cy.get('#saveBlogBtn').click()
      */
      it('Blog can be viewed', function() {
        cy.contains('by Cypress corp.')
        cy.contains('Cypress is good')
      })
      it('then example', function() {
        cy.get('button').then( buttons => {
          console.log('number of buttons', buttons.length)
        })
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

 */