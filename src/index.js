const express = require('express');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const ApiRoutes = require('./routes/index');

const db = require('./models/index');


const setupAndStartServer = async () => {
  const app = express();
  app.use(morgan("combined"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/flightsservice/api', ApiRoutes);

  
  app.listen(PORT, async () => { 
    console.log(`App listening at http://localhost:${PORT}`);
    if(process.env.SYNC_DB) {
      db.sequelize.sync({ alter: true });    

    }
    

  });
}

setupAndStartServer();