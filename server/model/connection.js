const mongoose = require("mongoose");
require('dotenv').config();
const url = process.env.MONGOOSE_URL;

const options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect(url, options,        
 function(err){
    err ? console.log("connection a la bdd échoue") : console.log("connection a la bdd réussie");
 }
);

module.exports = mongoose;