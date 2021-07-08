import express from "express"

import Musician from "../../../models/Musician.js"

import cleanUserInput from "../../../services/cleanUserInput.js"

const musiciansRouter = new express.Router()

musiciansRouter.get("/", async (req, res) => {

})

musiciansRouter.get("/:id", async (req, res) => {

})

musiciansRouter.post("/", async (req, res) => {

})



export default musiciansRouter