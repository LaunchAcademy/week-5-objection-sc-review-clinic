import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const MusiciansShow = props => {
  const [musician, setMusician] = useState({})
  
  const musicianId = props.match.params.id

  const getMusician = async () => {
    const response = await fetch(`/api/v1/musicians/${musicianId}`)

    const parsedMusicianData = await response.json()
    setMusician(parsedMusicianData.musician)
  }

  useEffect(() => {
    getMusician()
  }, [])

  return(
    <>
      <h1>Info on this musician:</h1>
      <h2>{musician.name}</h2>

      <p className="callout">Vibe: {musician.vibe}</p>
      <p>Number of Released EPs (obviously): {musician.releasedEPs}</p>
   
      <Link to="/musicians">Back to that sweet list</Link>
    </>
  )
}

export default MusiciansShow