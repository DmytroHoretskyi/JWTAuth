import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { dirname,join } from 'path';
import { fileURLToPath } from 'url';

import sequelize from "./orm/db.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import AuthError from "./errors/authError.js";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
const PORT = 5000;


app.use(json());
app.use(cookieParser());

app.use('/', express.static(join(__dirname, 'public')))
app.use(userRouter);
app.use(authRouter);
app.use('*', (req, res) => {
  res.status(404).json('Not found')
})

app.use((err, req, res, next) => {
  if (err instanceof AuthError){
    res.status(err.status || 500)
        .json({err: err.message || "Server error"})
  }
})

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {console.log("server started")})
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
main();
