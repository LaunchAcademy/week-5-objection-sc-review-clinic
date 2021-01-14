import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const MusiciansList = props => {
  const [musicians, setMusicians] = useState([])
  
  const getMusicians = async () => {
    try {
      const response = await fetch("/api/v1/musicians")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const musicianData = await response.json()
      setMusicians(musicianData.musicians)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getMusicians()
  }, [])

  const musicianListItems = musicians.map(musician => {
    return(
      <li key={musician.id}>
        {musician.title} in {musician.location}
      </li>
    )
  })

  return(
    <>
      <h2>These Are Like...Pretty Kewl Arteests I guess or whatever</h2>
      <ul className="musicians">
        {musicianListItems}
      </ul>
      <Link to="/musicians/new">Oh, Yeah You Can Add Other Artists</Link>
    </>
  )
}

export default MusiciansList