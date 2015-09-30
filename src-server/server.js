import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import requireDir from 'require-dir';
import mongoose from 'mongoose';

// Create a basic express application
const app = express();

// Set express up to automatically parse incoming JSON requests
// into the request object
app.use(bodyParser.json());

// Set up static content paths
app.use('/jspm_packages', express.static(`${__dirname}/../jspm_packages`));
app.use('/dist-client', express.static(`${__dirname}/../dist-client`));
app.use('/assets', express.static(`${__dirname}/../assets`));

// Any request without a path should render index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../index.html`));
});

// Any request to /config.js should render the root config.js
app.get('/config.js', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../config.js`));
});

// Store the app globally for convenience
global.app = app;

// Include and run all files in the ./services folder
requireDir('services');

// Connect to the database server
mongoose.connect('mongodb://localhost:27017/bookcollection');

// If there's an error connecting to the database,
// log the error and quit
mongoose.connection.on('error', err => {
  console.error(`ERROR CONNECTING TO MONGO: ${err}`);
  process.exit(0);
});

// Once we have successfully connected...
mongoose.connection.on('connected', () => {
  console.log(`Connected to mongo, starting webserver`);
  let server = null;

  // Start the web server
  server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Server listening at http://${host}:${port}`);
  });
});
