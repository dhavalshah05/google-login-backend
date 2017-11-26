const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });


/** 
 * **********************************
 * MONGOOSE CONFIGURATION
 * **********************************
 */
mongoose.connect(process.env.DATABASE_URL, { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error ----> ${err.message}`);
});


/** 
 * **********************************
 * START SERVER
 * **********************************
 */
const app = require('./app');

app.set('port', process.env.PORT || 7777);
app.listen(app.get('port'), () => {
    console.log(`Google-Login-Backend is up and running on PORT ${app.get('port')}`);
});