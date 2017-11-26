const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorHandlers = require('./handlers/errorHandlers');


/** 
 * **********************************
 * INIT APP AND MIDDLEWARES
 * **********************************
 */
let app = express();
// app middleware configurations
app.use(bodyParser.json());


/** 
 * **********************************
 * ROUTES
 * **********************************
 */
app.use('/', routes);

// error handling routes
app.use(errorHandlers.notFound);
app.use(errorHandlers.devErrors);


// export app
module.exports = app;

