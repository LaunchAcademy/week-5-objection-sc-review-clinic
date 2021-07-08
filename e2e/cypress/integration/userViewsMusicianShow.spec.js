/// <reference types="cypress" />

context("Musician Show Page", () => {
  beforeEach(() => {
    cy.task("db:truncate", "Musician")
    cy.task("db:insert", {
      modelName: "Musician",
      json: { name: "Dodie", vibe: "Depressed British poet that you are constantly rooting for", releasedEPs: "8" }
    }).then(musician => {
      cy.visit(`/musicians/${musician.id}`)
    })
  })

  it("shows the name of the musician", () => {
    cy.get("h2").should("have.text", "Stuff for: Dodie")
  })

  it("shows the vibe of the musician", () => {
    cy.get("p").first().should("have.text", "Vibe: Depressed British poet that you are constantly rooting for")
  })

  it("shows the released EPs for the musician", () => {
    cy.get(".eps").should("have.text", "Number of Released EPs (obviously): 8")
  })

  it("clicking on the musicians link returns the user to the musician list page", () => {
    cy.get(".home-link").click()
    cy.get("h2")
      .should("have.text", "These Are Like...Pretty Kewl Arteests I guess or whatever")
  })
})