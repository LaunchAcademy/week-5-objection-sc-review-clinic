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
        return res.status(500).json({ error: error })
    }
})

musiciansRouter.post("/", async (req, res) => {
    const { body } = req 

    const cleanMusician = cleanUserInput(body)

    try {
        await Musician.query().insert(cleanMusician)
        res.status(200).json({})
    } catch (error) {
        if (error instanceof ValidationError){
            res.status(422).json({ errors: error.data })
        } else {
            res.status(500).json({ errors: error })
        }
    }
})

musiciansRouter.get("/:id", async (req, res) => {
    try { 
        const specificMusician = await Musician.query().findById(req.params.id)
        res.status(200).json({ musician: specificMusician })
    } catch(error) {
        res.status(500).json({ errors: error})
    }
})

export default musiciansRouter