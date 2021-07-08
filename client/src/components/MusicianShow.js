import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const MusiciansShow = props => {
  const [musician, setMusician] = useState([])
  
  const getMusician = async () => {
    const id = props.match.params.id
    console.log("FETCHING")
    try {
      const response = await fetch(`/api/v1/musicians/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const musicianData = await response.json()
      setMusician(musicianData.musician)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getMusician()
  }, [])

  return(
    <>
      <h2>Stuff for: {musician.name}</h2>

      <p className="callout">Vibe: {musician.vibe}</p>
      <br></br>
      <p className="eps">Number of Released EPs (obviously): {musician.releasedEPs}</p>
   
      <Link className="home-link" to="/musicians">Back to that sweet list</Link>
    </>
  )
}

export default MusiciansShow