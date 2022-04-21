import express from "express"

import Musician from "../../../models/Musician.js"

import cleanUserInput from "../../../services/cleanUserInput.js"

import { ValidationError } from "objection"

const musiciansRouter = new express.Router()

musiciansRouter.get("/", async (req, res) => {
  try {
    const musicians = await Musician.query()
    console.log(musicians)

    res.status(200).json({ musicians: musicians })
  } catch (error) {
    res.status(500).json({ errors: error })
  }
})

musiciansRouter.post("/", async (req, res) => {
  try {
    const body = req.body
    // console.log(body)
    const cleanedInput = cleanUserInput(body)
    // console.log(cleanedInput)
    const newMusician = await Musician.query().insertAndFetch(cleanedInput)
    // console.log(newMusician)
    res.status(201).json({ musician: newMusician })
  } catch (error) {
    // console.log(error)
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data })
    } else {
      res.status(500).json({ errors: error })
    }
  }
})

export default musiciansRouter
