import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import requireDir from 'require-dir';
import mongoose from 'mongoose';

global.app = express();

global.app.use(bodyParser.json());

global.app.use('/jspm_packages', express.static(`${__dirname}/../jspm_packages`));
global.app.use('/dist-client', express.static(`${__dirname}/../dist-client`));
global.app.use('/assets', express.static(`${__dirname}/../assets`));

global.app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../index.html`));
});

global.app.get('/config.js', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../config.js`));
});

requireDir('services');

mongoose.connection.on('error', err => {
  console.error(`ERROR CONNECTING TO MONGO: ${err}`);
});

mongoose.connection.on('connected', () => {
  const server = global.app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server listening at http://${host}:${port}`);
  });
});

mongoose.connect('mongodb://localhost:27017/bookcollection');
