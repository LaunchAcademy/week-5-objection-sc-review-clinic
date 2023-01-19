/// <reference types="cypress" />

context("Musicians Index Page", () => {
    beforeEach(() => {
        let musicianId
        cy.task("db:truncate", "Musician" )
        cy.task("db:insert", { modelName: "Musician", json: { name: "Olive Klug", releasedEPs: "2", vibe: "good musician" } })
        

        cy.task("db:find", { modelName: "Musician", conditions: { name: "Olive Klug" } }).then((musicians) => {
            musicianId = musicians[0].id
            // has to be in the callback to get access to a JS variable
            cy.visit(`/musicians/${musicianId}`)
        })
    })

    context("when viewing the musician details page", () => {
        it("the user can see each of the details regarding that musician", () => {
            cy.get("h2").should("include.text", "Olive Klug")
        })

        it("the page has a link to the new Musician index page", () => {
            cy.contains('Back to that sweet list').click()
            cy.location('pathname').should('eq', '/musicians')
        })
    })
})
