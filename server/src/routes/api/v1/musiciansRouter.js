import express from "express"
import { ValidationError } from "objection"

import Musician from "../../../models/Musician.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

// import { Musician } from "../../../models/index.js"

const musiciansRouter = new express.Router()

musiciansRouter.get("/", async (req, res) => {
  try {
    const arrayOfMusicians = await Musician.query()
    console.log(arrayOfMusicians);
    return res.status(200).json({ musicians: arrayOfMusicians })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err })
  }
})

musiciansRouter.get("/:id", async (req, res) => {
  try {
    const musicianId = req.params.id
    const musician = await Musician.query().findById(musicianId)
    return res.status(200).json({ musician: musician })
  } catch (err) {
    return res.status(404).json({ errors: err })
  }
})

musiciansRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const cleanedData = cleanUserInput(req.body)

    // if (req.body.name.trim() !== "") {
    const newMusician = await Musician.query().insertAndFetch(cleanedData)
    return res.status(201).json({ musician: newMusician })
    // }

  } catch (err) {
    console.log(err);
    console.log(err.data);
    if (err instanceof ValidationError) {
      return res.status(422).json({ errors: err.data })
    }
    return res.status(500).json({ error: err })
  }
})

export default musiciansRouter