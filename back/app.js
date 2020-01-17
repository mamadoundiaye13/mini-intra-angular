const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const hostname = '0.0.0.0';
const port = 3000;

const mongoose = require('mongoose');

const mongooseParams = {
  useUnifiedTopology : true,
  useNewUrlParser: true,
  useCreateIndex: true
};
mongoose.connect('mongodb://mongo/apinodeipssi', mongooseParams); // docker (mongo = nom du container)
// mongoose.connect('mongodb://localhost:27017/apinodeipssi', mongooseParams); // windows sans docker

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

const moduleRoute = require('./api/routes/moduleRoute');
const userRoute = require('./api/routes/userRoute');
const noteRoute = require('./api/routes/noteRoute');
const sessionRoute = require('./api/routes/sessionRoute');

userRoute(app);
moduleRoute(app);
noteRoute(app);
sessionRoute(app);
app.listen(port, hostname);
