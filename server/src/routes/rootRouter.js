import express from "express"
import musiciansRouter from "./api/v1/musiciansRouter.js"
import clientRouter from "./clientRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/musicians", musiciansRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
