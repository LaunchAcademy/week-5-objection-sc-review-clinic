import express from "express"

import { ValidationError } from "objection"

import Musician from "../../../models/Musician.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const musiciansRouter = new express.Router()

musiciansRouter.get("/", async (req, res) => {
  try {
    const musicians = await Musician.query()
    return res.status(200).json({ musicians: musicians })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

musiciansRouter.get("/:banana", async (req, res) => {
  try {
    const musicianId = req.params.banana
    const foundMusician = await Musician.query().findById(musicianId)
    return res.status(200).json({ musician: foundMusician })
  } catch (error) {
    return res.status(404).json({ errors: error })
  }
})

musiciansRouter.post("/", async (req, res) => {
  try {
    const formData = req.body
    console.log(formData)
    const cleanedFormData = cleanUserInput(formData)
    console.log(cleanedFormData)

    const newMusician = await Musician.query().insertAndFetch(cleanedFormData)
    console.log(newMusician)

    return res.status(201).json({ musician: newMusician })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      // 422
      console.log(error.data)
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default musiciansRouter
