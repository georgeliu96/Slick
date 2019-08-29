describe('Cypress Demo (Auth)', function() {

    it('successfully loads Slick', function() {
        cy.visit('')
    })

    it('should redirect anyone trying to access messages to a sign up page', function(){
        cy.visit('messages')
        cy.get('.session-container').should('contain', 'Sign up')
    })

    it('should allow normal login', function(){
        cy.visit('signin')
        
        // fills in login forms and {enter} submits the form
        cy.get('input[name=username').type('demo')
        cy.get('input[name=password').type('password')
        cy.get('input[name=email').type(`demo@email.com{enter}`)

        // checks the page to contain a certain element
        cy.get('.sidebar')
    })

    
})