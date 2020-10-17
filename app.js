const app = require('./src/app/express.config');
const mongoose = require('./src/app/db.config');
require('dotenv').config()



// mongodb connect

mongoose.connect();


app.listen(7700, () => {
    console.log('listening on port 7700!!');
});



module.exports = app;
