import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import routes from './routes/v1';
import cors from 'cors';
import 'dotenv/config';
const app = express();

// middleware
// enable cors
app.use(cors());
app.options('*', cors());

// parse json request body
app.use(bodyParser.json());

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use('/api', routes);

// Port
const port = config.port || 3000;

// Server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
