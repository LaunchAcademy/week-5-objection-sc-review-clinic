import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Musician } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js"

const musiciansRouter = new express.Router()

musiciansRouter.get("/", async (req, res) => {
  try {
    const musicians = await Musician.query()
    return res.status(200).json({ musicians })
    // return res.status(200).json({ musicians: musicians })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error })
  }
})

musiciansRouter.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const body = req.body
    const cleanedMusicianData = cleanUserInput(body)
    const newMusician = await Musician.query().insertAndFetch(cleanedMusicianData)
    // console.log(newMusician);
    res.status(201).json({ newMusician })
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

export default musiciansRouter