const express = require('express');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');
const CityRepository = require('./repository/city-repository');

const setupAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
    const repo = new CityRepository();
    repo.createCity({ name: 'Mumbai' });
  });
}

setupAndStartServer();