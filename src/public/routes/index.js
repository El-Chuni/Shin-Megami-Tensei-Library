import { Express } from "express";
import demonModel from "../../Dao/DB/models/demon"; 

const router = Express.Router();

// Ruta para la página principal
router.get('/', async (req, res) => {
  res.render('index'); // Renderiza la vista index.handlebars
});

// Ruta para la búsqueda de personajes
router.get('/buscar', async (req, res) => {
  const query = req.query.q;

  try {
    const personajesEncontrados = await demonModel.find({ name: { $regex: new RegExp(query, 'i') } });
    res.render('results', { personajes: personajesEncontrados });
  } catch (error) {
    console.error('Error al buscar personajes:', error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;
