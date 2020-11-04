const { default: login } = require('../../src/services/login')

describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')   // reset the content of DB
    const user = {
      name: 'Pavel Test',
      username: 'Pauli4',
      password: 'heslo'
    }
    const user2 = {
      name: 'Pavel Test',
      username: 'Pauli2',
      password: 'heslo'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)   // create the user
    cy.request('POST', 'http://localhost:3001/api/users/', user2)   // create the user
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


      it('Blog can be liked and likes are increased by one', function() {

        cy.contains('Cypress is good by Cypress corp').parent().parent().parent()
          .find('.t_DetailsBtn').click()
        cy.contains('Likes: 0')   //0 likes at start

        cy.contains('Cypress is good by Cypress corp').parent().parent().parent()
          .find('.t_LikeBtn').click()
        cy.contains('Likes: 1')    //1 like after click
        cy.contains('you liked "Cypress is good" by Cypress corp.')
      })


      it('Blog can be deleted by user who created it', function() {
        cy.contains('Cypress is good by Cypress corp').parent().parent().parent()
          .find('.t_DetailsBtn').click()

        cy.contains('Cypress is good by Cypress corp').parent().parent().parent()
          .find('.t_DelBtn').click()
        cy.contains('Blog was deleted!')
      })

      it('when logged in as user2 - Blog can not be deleted by another user', function() {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('http://localhost:3000')  //page reload for apply the local strage deletion
        cy.login('Pauli2', 'heslo')
        cy.contains('Cypress is good by Cypress corp').parent().parent().parent()
          .find('.t_DetailsBtn').click()

        cy.contains('You can not delete this blog. This was created by')
      })


      it.only('Blogs are sorted by likes', function() {
        cy.createBlog({
          title: 'Cypress is good2',
          author: 'Cypress corp',
          url: 'www.cypress.io',
          likes: 1
        })
        cy.createBlog({
          title: 'Cypress is good3',
          author: 'Cypress corp.2',
          url: 'www.cypress.io',
          likes: 7
        })
        cy.createBlog({
          title: 'Cypress is good4',
          author: 'Cypress corp.2',
          url: 'www.cypress.io',
          likes: 6
        })

        cy.get('.t_DetailsBtn').click({ multiple: true })
        let likes = []
        cy.get('.t_likesCount').then(like => {
          console.log(like)
          console.log('Like length', like.length)
          cy.wrap(like[0]).contains(7).then(content => likes.push(content.content)) //asi nefunguje protože likes je na konci prázdné
          cy.wrap(like[1]).contains(6)                                              // ale test projde díky ručnímu porovnání
          cy.wrap(like[2]).contains(1)
          cy.wrap(like[3]).contains(0)
        }).then( () => {
          console.log(likes)
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

      it('then example', function() {
        cy.get('button').then( buttons => {
          console.log('number of buttons', buttons.length)
        })
      })

 */