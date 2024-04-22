import { Router } from "express";
import multer from "multer";
import { isAuthenticated } from "../config/auth/auth.js";
import { summonDemons, summonDemonById, createDemon, createManyDemons, modifyDemon, destroyDemon } from "../Dao/DB/demon.service.js";

//Se define el router
const router = Router();

//Aplicamos el multer para que luego se puedan subir arrays en /post y /put
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Lo mismo que /get pero con socket.io
router.get('/', summonDemons);


//Carga y muestra un producto en particular
router.get('/get/:pid', summonDemonById)


//Añade un producto al array
router.post('/post', isAuthenticated, upload.array(), createDemon);
  
//Se borra un producto especifico por ID
router.delete('/delete/:pid', isAuthenticated, destroyDemon);

//Se actualiza un producto por ID
router.put('/put/:pid', isAuthenticated, upload.array(), modifyDemon);


export default router;