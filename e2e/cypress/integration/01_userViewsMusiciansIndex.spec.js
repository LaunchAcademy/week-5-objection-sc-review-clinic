/// <reference types="cypress" />

context("Musicians Index Page", () => {
  beforeEach(() => {
    cy.task("db:truncate", "Musician")

    cy.task("db:insert", { modelName: "Musician", json: [ 
      { name: "Sammy Rae and the Friends", vibe: "FUN", releasedEPs: "2" },
      { name: "Guilhem Desq", vibe: "mad scientist with a hurdy gurdy", releasedEPs: "3" }
    ]})

    cy.visit(`/musicians`)
  })

  context("when viewing the musicians index page", () => {
    it("the user can see the first and second TV musician", () => {
      cy.get(".musicians")
        .find("li")
        .first()
        .should("have.text", "Sammy Rae and the Friends")


      cy.get(".musicians")
        .find("li")
        .eq(1)
        .should("have.text", "Guilhem Desq")

    })

    it("has a link to the new animal form page", () => {
      cy.contains('Oh, Yeah You Can Add Other Artists').click()
      cy.location('pathname').should('eq', '/musicians/new')
    })

    it("each element is a link to a musician details page", () => {
      cy.contains('Sammy Rae and the Friends').click()
      cy.get("h1").should("have.text", "Info on this musician:")
    })
  })
})