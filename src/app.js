import express from "express";
import session from "express-session";
import { create as createHandlebars } from "express-handlebars";
import __dirname from "./utils.js";
import cors from 'cors';
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import config from "./config/config.js";
import searchRouter from "./routes/search.router.js";
import cathedralRouter from "./routes/secretCathedral.router.js";
import userRouter from "./routes/user.router.js";
import passport from "passport"; 
import { addUserToLocals } from "./config/auth/auth.js";
import demonModel from "./Dao/DB/models/demon.js";

const app = express();
const SERVER_PORT = 8080;

const server = app.listen(SERVER_PORT, () => {
  console.log(`Welcome to the Cathedral of Shadows at ${SERVER_PORT}, where demons learn...`);
});

const hbs = createHandlebars({
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: MongoStore.create({
    mongoUrl: config.mongoUrl,
    ttl: 60
  }),
  secret: 'magatama',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(addUserToLocals)

//Middleware para añadir usuario autenticado al contexto de todas las vistas
app.use((req, res, next) => {
  res.locals.user = req.isAuthenticated() ? req.user : null;
  next();
});

app.use('/api/search', searchRouter);
app.use('/api/cathedral', cathedralRouter);
app.use('/api/user', userRouter);

app.get('/', async (req, res) => {

  try {

    const allDemons = await demonModel.find().lean();

    //Baraja los demonios y selecciona un máximo de 4
    const shuffledDemons = allDemons.sort(() => 0.5 - Math.random());
    const selectedDemons = shuffledDemons.slice(0, 4);

    res.render('index', { demon: selectedDemons });

  } catch (error) {

    console.error('Error al obtener demonios:', error);
    res.status(500).send('Error interno del servidor');

  }
});

app.get('/forbidden', async (req, res) => {
  res.send("No estás autorizado para ejecutar cambios acá.");
  customError(401, "No estás autorizado para ejecutar cambios acá.");
});

const connectMongoDB = async () => {
  try {
    await mongoose.connect(config.mongoUrl);
    console.log("Conectado con exito a MongoDB usando Moongose.");
  } catch (error) {
    console.error("No se pudo conectar a la BD usando Moongose: " + error);
    process.exit();
  }
};
connectMongoDB();