import Character from "../models/character.model.js";

const validacionesCharacter = async (data, isUpdate = false, id = null) => {
  const errors = [];

  if (!data.name || data.name.trim() === "") errors.push("Precisamos del nombre");

  if (!Number.isInteger(data.ki)) errors.push("Obligatoriamente el ki debe ser un número entero");

  if (!data.race) errors.push("Campo de raza es obligatoria");

  if (!["Male", "Female"].includes(data.gender)) errors.push("Géneros admitidos: Male o Female");

  if (!data.description || typeof data.description !== "string") errors.push("La descripción tiene que contener texto");

  const exist = await Character.findOne({ where: { name: data.name } });
  if (exist && (!isUpdate || exist.id != id)) {
    errors.push("Ya tenemos un personaje con ese mismo nombre");
  }

  return errors;
};

// Obtener todos los personajes
export const getAllCharacter = async (req, res) => {
  try {
    const allCharacters = await Character.findAll();
    res.json(allCharacters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener personaje por ID
export const getCharacterById = async (req, res) => {
  try {
    const character = await Character.findByPk(req.params.id);
    if (!character) return res.status(404).json({ error: "Personaje no encontrado" });
    res.json(character);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear personaje
export const createCharacter = async (req, res) => {
  const errors = await validacionesCharacter(req.body);
  if (errors.length) return res.status(400).json({ errors });

  try {
    const newChar = await Character.create(req.body);
    res.status(201).json(newChar);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// Actualizar personaje
export const updateCharacter = async (req, res) => {
  const character = await Character.findByPk(req.params.id);
  if (!character) return res.status(404).json({ error: "Personaje no encontrado" });

  const errors = await validacionesCharacter(req.body, true, req.params.id);
  if (errors.length) return res.status(400).json({ errors });

  try {
    await character.update(req.body);
    res.json(character);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar personaje
export const deleteCharacter = async (req, res) => {
  const character = await Character.findByPk(req.params.id);
  if (!character) return res.status(404).json({ error: "Personaje no encontrado" });

  try {
    await character.destroy();
    res.json({ message: "Personaje eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
