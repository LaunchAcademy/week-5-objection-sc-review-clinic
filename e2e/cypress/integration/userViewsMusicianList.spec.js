/// <reference types="cypress" />

context("Musicians Index", () => {
  beforeEach(() => {
    cy.task("db:truncate", "Musician")
    cy.task("db:insert", { modelName: "Musician", json: { name: "Laura Marling", vibe: "folk chill", releasedEPs: "5" } })
    cy.visit("/")
  })

  it("has a heading", () => {
    cy.get("h2")
      .should("have.text", "These Are Like...Pretty Kewl Arteests I guess or whatever")
  })

  it("lists all musicians", () => {
    cy.get(".musicians").find("li").first().should("have.text", "Laura Marling: folk chill")
  })

  // test for link
})
