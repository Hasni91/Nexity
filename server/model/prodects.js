const mongoose = require("./connection");


const prodectsSchema = mongoose.Schema({
    title : String,
    description : String,
    data : [{
        key : String,
        value: String
    }]
});

const ProdectsModel = mongoose.model("prodects",prodectsSchema);

module.exports = ProdectsModel;