// /// <reference types="cypress" />

context("New Musician Form Page", () => {
    beforeEach(() => {
        cy.task("db:truncate", "Musician")
        cy.visit("/musicians/new")
    })

    context("on the new tv musician form page", () => {
        context("when the user fills out the form correctly", () => {
            it("creates a new list item", () => {
                cy.get("#name")
                .type("Olive Klug")
                .should("have.value", "Olive Klug")

                cy.get("#vibe")
                .type("dreamboat who seems retired before she is even 30")
                .should("have.value", "dreamboat who seems retired before she is even 30")

                cy.get("#releasedEPs")
                .type("2")
                .should("have.value", "2")

                cy.get(".new-musician-form")
                .submit()

                cy.location("pathname").should("eq", "/musicians")

                cy.get("li")
                .last()
                .should("have.text", "The Last of Us Part 3")
            })
        })

        context("when the user fills out the form incorrectly", () => {
            it("remains on the new item form page if the form is submitted without a name and displays errors", () => {
                cy.get(".new-musician-form").submit()

                cy.get("h1").should("have.text", "We Have Evidence of a New Best Musician!")

                cy.get(".errors").should("have.text", "Premiere Year: is a required propertyTitle: is a required property")
            })
        })
    }) 
})