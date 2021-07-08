/// <reference types="cypress" />

context("Musician New Page", () => {
  beforeEach(() => {
    cy.task("db:truncate", "Musician")
    cy.visit(`/musicians/new`)
  })

  it("displays the text the correct header", () => {
    cy.get("h2").should("have.text", "So Like Yeah, Let It Out Man, What Beats Do You Have to Drop?")
  })

  it("creates a new list item when the form is submitted correctly", () => {
    cy.get("#name")
      .type("Dodie")
      .should("have.value", "Dodie")

    cy.get("#vibe")
      .type("Depressed British poet that you are constantly rooting for")
      .should("have.value", "Depressed British poet that you are constantly rooting for")
      
    // no need to type for EPs

    cy.get("form")
      .contains("For Sure")
      .click()

    cy.get("h2").should("have.text", "These Are Like...Pretty Kewl Arteests I guess or whatever")

    cy.get(".musicians").find("li").first().should("have.text", "Dodie: Depressed British poet that you are constantly rooting for")
  })
})


