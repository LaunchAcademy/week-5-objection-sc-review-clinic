import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Musician } from "../../../models/index.js"

import cleanUserInput from "./../../../services/cleanUserInput.js"

const musiciansRouter = new express.Router()


musiciansRouter.get("/", async (req, res) => {
    // get the musicians using Objection
    const musicianObjects = await Musician.query()
    // console.log(musicianObjects)

    // send back those musicians
    return res.json({ musicians: musicianObjects })
})

musiciansRouter.post("/", async (req, res) => {
    console.log(req.body)
    // get the data into the database 
    const cleanedBody = cleanUserInput(req.body)

    try {
        const persistedMusician = await Musician.query().insertAndFetch(cleanedBody)
    
        // send the persisted musician back so that we can redirect to their show page
        res.json({ musician: persistedMusician})
    } catch(error) {
        if (error instanceof ValidationError){
            return res.status(422).json({ errors: error.data })
        }

        return res.status(500).json({ errors: error })
    }
    // sad paths
   
})

musiciansRouter.get("/:id", async (req, res) => {
    // console.log(req.params.id)
    try {
        const musician = await Musician.query().findById(req.params.id)
        res.status(200).json({ musician })

    } catch(error) {
        return res.status(500).json({ errors: error })
    }
   
})

export default musiciansRouter