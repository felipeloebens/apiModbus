const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const app = express();

// SETANDO VARIÁVEIS DA APLICAÇÃO
app.set('port', process.env.PORT || config.get('server.port'));

// MIDDLEWARES
app.use(bodyParser.json());

// add routes to app
const modbusRoutes = require("./api/routes/modbusRoutes");
app.use(modbusRoutes);

module.exports = app;