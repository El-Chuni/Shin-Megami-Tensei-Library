import { Router } from "express";
import demonModel from "../Dao/DB/models/demon.js"; 

const router = Router();

// Ruta para la página principal
router.get('/', async (req, res) => {
  res.render('index'); 
});

// Ruta para la búsqueda de personajes
router.get('/results', async (req, res) => {
  const query = req.query.q;

  try {
    const foundDemons = await demonModel.find({ name: { $regex: new RegExp(query, 'i') } });
    res.render('results', { personajes: foundDemons });
  } catch (error) {
    console.error('Error al buscar personajes:', error);
    res.status(500).send('Error interno del servidor');
  }
});

export default router;
