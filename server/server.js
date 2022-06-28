require('dotenv').config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
let cors = require('cors');
let ProductsModel = require("./model/prodects");

app.use(cors());
app.use(express.json());

app.post('/addProduct', async (req, res) => {

    const regex_void = /([^\s])/;

    if(regex_void.test(req.body.title) &&  regex_void.test(req.body.description)){;
        let newProduct = new ProductsModel({
            title : req.body.title,
            description : req.body.description,
            data : [{
                key : null,
                value : null
            }]
        });

        let product = await newProduct.save();
        res.json({status : "sucess",product : product})
    }
    else res.json({status : "error", messageError : "tous les champs ne sont pas remplis"})
});

app.get("/getProducts", async (req,res) => {
    let products = await ProductsModel.find();
    console.log(products);
    res.json({products:products});
});

app.delete('/removeProduct', async (req,res) => {
    await ProductsModel.deleteOne({ _id : req.body.id});
});

app.put('/updateProduct', async (req,res) => {
    let data = req.body.infos;
    let product = await ProductsModel.findOne({_id : data.id});

    await product.updateOne({ title: data.title});
    await product.updateOne({ description : data.description });

    let newproduct = await ProductsModel.findOne({_id : data.id});
    console.log(newproduct.title);

    if(newproduct.title != product.title || newproduct.description != product.description){
        res.json({status:"sucess"});
    }
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})