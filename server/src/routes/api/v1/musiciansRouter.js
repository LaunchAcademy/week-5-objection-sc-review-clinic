import express from "express"

import { ValidationError } from "objection"

const musiciansRouter = new express.Router()

import Musician from "../../../models/Musician.js"

import cleanUserInput from "../../../services/cleanUserInput.js"

musiciansRouter.get("/", async (req, res) => {
  try {
    const musicians = await Musician.query()
    return res.status(201).json({ musicians })
  } catch(error){
    res.status(500).json({errors: error})
  }
})

musiciansRouter.post("/", async (req, res) => {
  const { body } = req 
  const formData = cleanUserInput(body)
  try {
    const newMusician = await Musician.query().insert(formData)
    return res.status(201).json({ newMusician })
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({errors: error.data})
    }
    return res.status(500).json({errors: error})
  }
})

musiciansRouter.get("/:id", async (req, res) => {
  const id = req.params.id 

  try {
    const musician = await Musician.query().findById(id)
    res.status(200).json({ musician })
  } catch(error) {
    return res.status(500).json({errors: error})
  }
})

export default musiciansRouter