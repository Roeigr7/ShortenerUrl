import express from 'express';
import config from 'config';
import db from './db';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import shortRoutes from './routes/short.routes';
import bodyParser from 'body-parser';
const fs = require('fs');

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(cors({ origin: config.get('corsOrigin'), credentials: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//apiDocs
app.get('/', (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data: any) => {
    if (err) return res.status(400).json({ error: err });
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

//routes
app.use('/', shortRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);

///config and middlewares
const port = config.get('port');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(morgan('dev'));

//routes middlewares
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'not authorized , please login' });
  }
});
app.use('/uploads', express.static('uploads'));

///404 not found page
app.use('/api/notfound', (req, res, next) => {
  res.sendFile(__dirname + '/404.html');
});

app.listen(4000, () => {
  console.log(`app listen at http://localhost:${port}`);
  db();
});
