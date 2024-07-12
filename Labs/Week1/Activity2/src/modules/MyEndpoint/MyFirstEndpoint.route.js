import express from "express"
import { traerUsuarios } from "./MyFirstEndpoint.Controller.js";
import { logger } from "./MyFirstEndpoint.middleware.js";


export const router = express.Router();

router
    .get("/",traerUsuarios)

    