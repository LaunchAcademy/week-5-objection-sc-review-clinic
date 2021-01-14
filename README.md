## Todo
* reskin for musicians, commit/branch for SC review reference
* evaluate instructions for minor differences to make, commit
* generate finished code for codebase => branch commit 
* remove code for new base

## Bonus todo
* study up on cypress tests 


## things to note
* spend some time on the uniqueness 
* they get confused on DB level validations, just the distinction 
* add a whole blurb on the uniqueness index

Let's track obscure musicians! Feel free to update the seeder to include your own favorite obscure artists. Is this a shameless way for us to talk about musicians that we feel deserve more notoriety, or that are especially near and dear to our hearts...? 

Yes. Yes it's exactly that. 

## Getting Started

```sh
yarn install
createdb obscure_musicians_development
yarn run dev
```

## Instructions

### Meets Expectations

Your React front-end has been built out for you -- you should not need to change any of that code in order to finish the assignment. But React is cool, and we HAVE had to get familiar with some newer concepts lately. So review the provided code and then update the backend server to fulfill the following user stories.

#### List musicians

```no-highlight
As someone in need of validation by my peers
I want everyone to see a list of artists they are missing out on
So that they can feel ashamed of not having heard of them before and feign interest
```

Acceptance Criteria:

- When navigating to <http://localhost:3000/musicians>, there should be a header on the page, and a list of names for artists 
- A Link should exist on the page that points to the "new artist" form page

Implementation Details:

- This page should consume data from a backend api in our `musiciansRouter`. 
- Create a new migration for our rad artists. Each musician should have a **required** string of "title", a **required** string of "location", and an **optional** integer of "length" (in days). **Only worry about database-level validations for now.**
- Remember to migrate!
- Add the necessary API endpoint inside of the `musiciansRouter` for a GET request to `/api/v1/musicians`. Set up your endpoint such that the existing React code is able to successfully render the musicians to the page.
- We've provided a Seeder - feel free to run it once you've configured your database, using `yarn run db:seed` from within your `server` directory.

#### Create an musician

```no-highlight
As a person seeking musician
I want to be able to add a new musician to my list
So that I can bring my dreams of travel to reality
```

Acceptance Criteria:

- When navigating to <http://localhost:3000/musicians/new>, there should be a form on the page to add a new musician
- When I fill in all required information, the form should submit successfully, redirect me back to the index page, and I should see my new musician in the list
- If I fail to fill in required information, I should remain on the page with my form filled out and errors that indicate what I filled out incorrectly

Implementation Details:

- When the form is submitted and a POST fetch is sent to `/api/v1/musicians`, the new musician should either be persisted and returned, or errors should be returned.
- Add validations to your model to fulfill the following requirements: data type validation for each field, and "title" and "location" should be required.
- Add the proper API endpoint for a POST request to `/api/v1/musicians`. If the musician is valid, persist it and respond with the new musician record and a `201 Created` status. If the musician is invalid, respond with the errors and a `422 Unprocessable Entity` status. If any other server error occurs, respond with a `500 Internal Server Error` status.

As always, `et submit` once you are done with Meets Expectations.

