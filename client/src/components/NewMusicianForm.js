import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const NewMusicianForm = props => {
  const [newMusician, setNewMusician] = useState({
    firstName: "",
    lastName: "",
    releasedEPs: ""
  })
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const addNewMusician = async () => {
    try {
      const response = await fetch("/api/v1/musicians", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newMusician)
      })
      if (!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      } else {
        const body = await response.json()
        console.log("Artist added, alright!", body);
        setShouldRedirect(true)
      }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handleInputChange = event => {
    setNewMusician({
      ...newMusician,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addNewMusician()
  }

  if (shouldRedirect) {
    return <Redirect to="/musicians" />
  }

  return (
    <>
      <h2>So Like Yeah, Let It Out Man, What Beats Do You Have to Drop?</h2>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit} className="callout" >
        <label>
         First Name:
          <input
            type="text"
            name="firstName"
            onChange={handleInputChange}
            value={newMusician.firstName}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            onChange={handleInputChange}
            value={newMusician.lastName}
          />
        </label>

        <label>
          Number of Weird EPs:
          <input
            type="text"
            name="releasedEPs"
            onChange={handleInputChange}
            value={newMusician.releasedEPs}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="For Sure" />
        </div>
      </form>
    </>
  )
}

export default NewMusicianForm