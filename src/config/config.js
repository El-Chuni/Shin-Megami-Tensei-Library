import dotenv from 'dotenv';
import {Command} from 'commander';

const program = new Command(); //Crea la instancia de comandos de commander.

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
program.parse();

console.group("Mode Option: ", program.opts().mode);

const environment = program.opts().mode;

dotenv.config({
    path:environment==="production"?"./src/config/.env.production":"./src/config/.env.development"
});

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWD,
    jwtSecret: process.env.JWT_SECRET
}