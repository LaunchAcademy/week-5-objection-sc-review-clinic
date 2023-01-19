import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Musician } from "../../../models/index.js"

import cleanUserInput from "./../../../services/cleanUserInput.js"

const musiciansRouter = new express.Router()

musiciansRouter.get("/", async (req, res) => {
    try {
        const musicians = await Musician.query()
        return res.json({ musicians })
    } catch (error) {
        return res.status(500).json({error: error})
    }
})

musiciansRouter.post("/", async (req, res) => {
    try {
        const { body } = req

        const cleanedMusician = cleanUserInput(body)

        const newMusician = await Musician.query().insertAndFetch(cleanedMusician)

        return res.status(201).json({ musician: newMusician })
    } catch(error){
        if (error instanceof ValidationError){
            console.log(error.data)
            return res.status(422).json({errors: error.data })
        }

        return res.status(500).json({ errors: error })
    }
})

musiciansRouter.get("/:id", async (req, res) => {
    try {
        const musician = await Musician.query().findById(req.params.id)
        return res.status(200).json({ musician })
    } catch(error){
        return res.status(500).json({errors: error})
    }
   
})

export default musiciansRouter