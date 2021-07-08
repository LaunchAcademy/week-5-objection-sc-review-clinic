import express from "express"
import { ValidationError } from "objection"

import { Musician } from "../../../models/index.js"

import cleanUserInput from "../../../services/cleanUserInput.js"
import convertDataTypesForModel from "../../../services/convertDataTypesForModel.js"

const musiciansRouter = new express.Router()

musiciansRouter.get("/", async (req, res) => {
  const musicians = await Musician.query()
  res.status("200").json({ musicians })
})

// musiciansRouter.get("/:id", async (req, res) => {

// })

musiciansRouter.post("/", async (req, res) => {
  const newMusicianData = req.body
  const cleanedFormData = cleanUserInput(newMusicianData)

  try {
    await Musician.query().insert({ cleanedFormData })
    return res.status(200).json({})
  } catch(error) {
    if (error instanceof ValidationError){
      console.log(error.data)
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})



export default musiciansRouter