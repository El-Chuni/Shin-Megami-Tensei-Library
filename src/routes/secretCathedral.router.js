import { Router } from "express";
import multer from "multer";
import fs from 'fs';
import path from "path";
import __dirname from "../utils.js";
import { isAuthenticated } from "../config/auth/auth.js";
import { summonDemons, summonDemonById, createDemon, createManyDemons, modifyDemon, destroyDemon } from "../Dao/DB/demon.service.js";

//Se define el router
const router = Router();

const uploadPath = path.join(__dirname, 'public', 'demon images');

//Verifica si la carpeta existe; si no, la crea
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); 
  },
  filename: function (req, file, cb) {
    //Define el nombre del archivo
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limita el tamaño del archivo a 5MB
});

router.get('/demonCreation', async (req, res) => {
  res.render('demonCreator');
})


//Carga y muestra un producto en particular
router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const summonDemon = await summonDemonById(id);
      res.render('demon', { demon: summonDemon });
    } catch (error) {
      console.error('Error al buscar el demonio:', error);
      res.status(500).send('Error interno del servidor');
    }
});

//Añade un producto al array
router.post('/post', isAuthenticated, upload.single('image'), async (req, res) => {
  try {
    const { name, alignment, race, info } = req.body;
    const image = req.file; 

    const demonData = {
      name,
      alignment,
      race,
      info, 
      image: {
        data: image.buffer, 
        contentType: image.mimetype, 
      },
      imagePath: `/demon images/${image.filename}`,
    };

    const newDemon = await createDemon(demonData);

    res.status(201).json({ message: 'Demonio creado exitosamente', demon: newDemon });
  } catch (error) {
    console.error('Error al crear el demonio:', error);
    res.status(500).send('Error interno del servidor');
  }
});
  
//Se borra un producto especifico por ID
router.delete('/delete/:pid', isAuthenticated, destroyDemon);

//Se actualiza un producto por ID
router.put('/put/:pid', isAuthenticated, upload.array(), modifyDemon);


export default router;