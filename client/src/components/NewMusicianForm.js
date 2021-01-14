import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const NewMusicianForm = props => {
  const [newMusician, setNewMusician] = useState({
    name: "",
    vibe: "",
    releasedEPs: "5"
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
            name="name"
            onChange={handleInputChange}
            value={newMusician.name}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="vibe"
            onChange={handleInputChange}
            value={newMusician.vibe}
          />
        </label>

        <label>
          Number of Weird EPs: <output for="price" textContent={newMusician.releasedEPs}>{newMusician.releasedEPs}</output>
          <br></br>

          <input
            type="range"
            name="releasedEPs"
            min="0"
            max="15"
            step="1"
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