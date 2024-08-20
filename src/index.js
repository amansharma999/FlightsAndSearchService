const express = require('express');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');

const ApiRoutes = require('./routes/index');

const db = require('./models/index');


const setupAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api', ApiRoutes);

  
  app.listen(PORT, async () => { 
    console.log(`App listening at http://localhost:${PORT}`);
    if(process.env.SYNC_DB) {
      db.sequelize.sync({ alter: true });    //db.sequelize.sync({ alter: true });  this needs to be done in order to use functions like getAirports.

    }
    

  });
}

setupAndStartServer();