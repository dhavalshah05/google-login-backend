const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorHandlers = require('./handlers/errorHandlers');


// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

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

/** 
 * **********************************
 * START SERVER
 * **********************************
 */
app.set('port', process.env.PORT || 7777);
app.listen(app.get('port'), () => {
    console.log(`Google-Login-Backend is up and running on PORT ${app.get('port')}`);
});