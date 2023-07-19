import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const MusiciansList = props => {
  const [musicians, setMusicians] = useState([])
  
  const getMusicians = async () => {
    const response = await fetch("/api/v1/musicians")
    const musiciansData = await response.json()
    // console.log(musiciansData.musicians)
    setMusicians(musiciansData.musicians)
  }

  useEffect(() => {
    getMusicians()
  }, [])

  const musicianListItems = musicians.map(musician => {
    
    return(
      <li key={musician.id}>
        <Link to={`/musicians/${musician.id}`}>
          {musician.name}
        </Link>
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