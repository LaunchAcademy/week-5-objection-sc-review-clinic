## Todo
* DONE reskin for musicians, commit/branch for SC review reference
* evaluate instructions for minor differences to make, commit
* generate finished code for codebase => branch commit 
* remove code for new base

## Bonus todo
* study up on cypress tests 


## things to note
* spend some time on the uniqueness 
* they get confused on DB level validations, just the distinction 
* add a whole blurb on the uniqueness index
* MAYBE consider not providing seeder code
* take some time to read and poke around the cypress stuff

Let's track obscure musicians! Feel free to update the seeder to include your own favorite obscure artists. Is this a shameless way for us to talk about musicians that we feel deserve more notoriety, or that are especially near and dear to our hearts...? 

Yes. Yes it's exactly that. 

## Getting Started

```sh
yarn install
createdb obscure_musicians_development
yarn run dev
```

### Core Criteria

Your React front-end has been built out for you -- you should not need to change any of that code in order to finish the assignment. But React is cool, and we HAVE had to get familiar with some newer concepts lately. So review the provided code and then update the backend server to fulfill the following user stories.

Make sure to read to the last acceptance criteria to decide on show or index.

#### List musicians

```no-highlight
As someone in need of validation by my peers
I want everyone to see a list of artists they are missing out on
So that they can feel ashamed of not having heard of them before and feign interest
```

Acceptance Criteria:

- When navigating to <http://localhost:3000/musicians>, there should be a header on the page, and a list of names for artists 
- A Link should exist on the page that points to the "new artist" form page. But like whatever.

Implementation Details:

- This React page should consume data from a backend api in our `musiciansRouter`. 
- Create a new migration for our rad artists. Each musician should have a **required** string of "name", an **optional** text field for "vibe", and an **optional** integer of "releasedEPs" (an EP is like a mini album). Name should also be unique.

#### Create a musician

```no-highlight
As someone who needs to know that the world knows that I like cool but obscure artists
I want to be able to add a new musician to my list
So that...you love me...they will love me once they know I continuously dig up fresh beats
```

Acceptance Criteria:

- When navigating to <http://localhost:3000/musicians/new>, there should be a form on the page to add a new musician
- When I fill in all required information, the form should submit successfully, redirect me back to the show page, and I should see my new musician's info on the list. The `MusicianShow` component should be rendered on this page. Or like...redirect them to the index page. **See what the crowd wants. Their hunger is insatiable.
- If I fail to fill in a required field, I should remain on the page with my form filled out and errors that indicate what I filled out incorrectly

Implementation Details:

- When the form is submitted and a POST fetch is sent to `/api/v1/musicians` to persist that cool new note master
- Add validations to your model to fulfill the following requirements: data type validation for each field, and "name" and "number of released eps" should be required.
- Add the proper API endpoint for a POST request to `/api/v1/musicians`. If the musician is valid, persist it and respond with the a 201 status. If the musician is invalid, respond with the errors and a `422 Unprocessable Entity` status. If any other server error occurs, respond with a `500 Internal Server Error` status.
