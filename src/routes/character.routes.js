import express from "express";
import {
    createCharacter,
    getAllCharacter,
    getCharacterById, 
    updateCharacter,
    deleteCharacter,
} from "../controllers/character.controllers.js";

const routes = express.Router();

routes.get("/" , getAllCharacter);
routes.get("/:id", getCharacterById);
routes.post("/" , createCharacter);
routes.put("/:id" , updateCharacter);
routes.delete("/: id" , deleteCharacter);

export default routes;