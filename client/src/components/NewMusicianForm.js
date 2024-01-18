import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const NewMusicianForm = (props) => {
  const [newMusician, setNewMusician] = useState({
    name: "",
    vibe: "",
    releasedEPs: "5",
  })
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState({
    status: false,
    newMusicianId: null,
  })

  const addNewMusician = async () => {
    try {
      const response = await fetch("/api/v1/musicians", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newMusician),
      })
      const body = await response.json()
      if (!response.ok) {
        if (response.status === 422) {
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        console.log("Artist added, alright!")
        console.log(body)
        // debugger
        setShouldRedirect({
          status: true,
          newMusicianId: body.musician.id,
        })
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleInputChange = (event) => {
    setNewMusician({
      ...newMusician,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addNewMusician()
  }

  if (shouldRedirect.status) {
    return <Redirect to={`/musicians/${shouldRedirect.newMusicianId}`} />
  }

  return (
    <>
      <h2>So Like Yeah, Let It Out Man, What Beats Do You Have to Drop?</h2>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit} className="callout new-musician-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange}
            value={newMusician.name}
          />
        </label>

        <label>
          Vibe:
          <input
            type="text"
            name="vibe"
            id="vibe"
            onChange={handleInputChange}
            value={newMusician.vibe}
          />
        </label>

        <label>
          Number of Weird EPs: <output htmlFor="price">{newMusician.releasedEPs}</output>
          <br></br>
          <input
            type="range"
            name="releasedEPs"
            min="0"
            max="15"
            step="1"
            id="releasedEPs"
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
