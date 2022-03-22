import express from 'express';
import config from './config.js';
import cors from 'cors';
import morgan from 'morgan';
import route from './route.js';

// config
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// route
app.use('/api', route);
app.use('*', (req, res) => {
  res.status(404).json({ message: 'route not found' });
});

app.listen(config.port, () => {
  console.log(`listening on ${config.port}`);
});
