import express from "express"

import { ValidationError } from "objection"

const musiciansRouter = new express.Router()

import cleanUserInput from "../../../services/cleanUserInput.js"

import Musician from "../../../models/Musician.js"

musiciansRouter.get("/", async (req, res) => {
  try {
    const musicians = await Musician.query()
    return res.status(200).json({ musicians: musicians })
  } catch(error) {
    return res.status(500).json({ errors: error })
  }
})

musiciansRouter.post("/", async (req, res) => {
  const body = req.body
  const cleanedFormData  = cleanUserInput(body)

  try {
    const newMusician = await Musician.query().insertAndFetch(cleanedFormData)
    return res.status(201).json({ newMusician: newMusician })
  } catch(error) {
    if (error instanceof ValidationError){
      return res.status(422).json({errors: error.data})
    }
    return res.status(500).json({ errors: error})
  }
})

export default musiciansRouter