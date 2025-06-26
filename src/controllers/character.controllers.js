
import character from "../models/character.model.js";

const validacionesCharacter = async (data, isUpdte = false, id = null) => {
    const errors = [];
    if (!data.name || data.name.trim() === "" ) errors.push("Precisamos del nombre");

    if (!Number.isInteger(data.ki)) errors.push("Obligatoriamente el ki debe ser un número entero");

    if(!data.race)errors.push("Campo de raza es obligatoria");

    if(!["Male" , "Female"].includes(data.gender)) errors.push("Géneros admitidos: Male o Female");

    if(!data.description && typeof data.description !== String) errors.push("La descripción tiene que conteter texto");

    const exist = await character.findOne({where: {name:data.name}});
    if (exist && (!isUpdte || exist.id !=id)){
        errors.push("Ya tenemos un personaje con ese mismo nombre");
    }

    return errors;
} 

export const getAllCharacter = async (req, res) => {
    try {
        const character = await character.findAll();
        res.json(character);

    } catch (error) {
        res.status(500).json ({error:err.message});
    }
}

export const getCharacterById = async (req, res) => {
    try {
        const character = await character.by.pk(req.params.id);
        if (!character) return res.status(404).json({error:"Personaje no encontrado"});
        res.json(character)
    } catch (error) {
        res.status(500).json ({error:err.message})};
}

export const createCharacter = async (req, res) => {
    const errors = await validateCharacter (req.body);
    if(errors.length) return res.status(400).json({errores});

    try {
        const newChar = await character.create(req.body);
        res.status(201).json(newChar);
    } catch (error) {
        res.status(500).json({ error: err.message});
    }
}

export const updateCharacter = async (req, res) => {
    const character = await CharacterData.findByPK(req.params.id);
    if (!character) return res.status(404).json({ error: "Personaje no encontrado"});

    const errors = await validateCharacter(req.body, true, req.params.id);
    if (errors.length) return res.status(400).json({ errors});

    try {
        await character.update(req.body);
        res.json(character);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

export const deleteCharacter = async (req, res) => {
    const character = await CharacterData.findByPK(req.params.id);
    if (!character) return res.status(404).json({ error: "Personaje no encontrado"});

    try {
      await character.destroy();
        res.json({ message: "Personaje eliminado"});
       
    } catch (error) {
        res.status(500).json({ error: err.message });
        
    }
};