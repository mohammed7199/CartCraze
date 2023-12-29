require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ConfigureDB = require('./config/DB');
const route = require('./config/route');
const path = require('path');

const port = 4040;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/BackEnd/Uploads', express.static(path.join(__dirname, 'Uploads')));

const startServer = async () => {
  try {
    await ConfigureDB();
    app.use('/', route);

    app.listen(port, () => {
      console.log(`Server is running on port, ${port}`);
    });
  } catch (error) {
    console.error(`OOPS!, ${error}`);
  }
};

startServer();