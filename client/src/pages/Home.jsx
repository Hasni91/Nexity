import React, {useState,useEffect} from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Modal_style from "./style/Modal.js";
import {BsTrash,BsFillPencilFill} from "react-icons/bs";
import "./style/Home.css";

const Home = () => {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [allProducts,setAllProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [data,setData] = useState([]);

  useEffect(()=>{
    // recuperer les produits de la base de donné
    const call_api = () => {
    let url = "http://localhost:4242/getProducts";
    axios.get(url)
    .then(function (response) {
      let data = response.data.products
      setAllProducts(data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
    call_api();
  },[allProducts]);
  

  const addProduct = () => {
    
    const regex_void = /([^\s])/;
    
    if(regex_void.test(title) && regex_void.test(description)){
      let url = "http://localhost:4242/addProduct";
      
      axios.post(url, {
        title: title,
        description: description
      })
      .then(function (response) {
        let data = response.data;
        if(data.status == "sucess"){
          setAllProducts([...allProducts,data.product]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      alert("veuillez remplir tous les champs");
    }

    setTitle("");
    setDescription("");
  }

  const deleteProduct = (id) => {
    let url = `http://localhost:4242/removeProduct`;
    let data = {
      id : id
    }
    axios.delete(url,{data})
    .then((response)=>{
      console.log(response);
    })
  }

  const editProduct = (product) => {
    setNewTitle(product.title);
    setNewDescription(product.description);
    setData(product);
    handleOpen();
  }

  const updateProduct = () => {
    if(data.title != newTitle || data.description != newDescription){
      
      let url = `http://localhost:4242/updateProduct`;
      let infos = {
        id : data._id,
        title : newTitle,
        description : newDescription
      }
      axios.put(url,{infos})
      .then((response)=>{
        if(response.data.status == "sucess")
        handleClose();
      })
    }else{
      alert("Aucune modification n'a été apportée");
    }
  }
    // ouverture et fermeture de la modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
  return (
    <div>
        <h1>e-commerce</h1>
        <div className='add_prodects'>
            <h4>Ajoutez un produit</h4>
            <input type="text" placeholder="Nom du produit"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
            <br/>
            <textarea placeholder="Ajoutez une description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
            <br/>
            <button className='btn'
              onClick={()=> addProduct()}
            >Ajouter</button>
        </div>

          {
            allProducts.map((res)=>(
              <div className='products'>
                <h2>{res.title}</h2>
                <p>{res.description}</p>
                <div>
                  <BsFillPencilFill className='icon' color='white'
                    onClick={()=>editProduct(res)}
                  />
                  <BsTrash className='icon' color='#c02c2c'
                    onClick={()=>deleteProduct(res._id)}
                  />
                </div>  
              </div>
            ))
          }

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
          <Box className='modal' sx={Modal_style}>
          <input type="text" placeholder="Nom du produit"
              value={newTitle}
              onChange={(e)=>setNewTitle(e.target.value)}
            />
            <Typography id="modal-modal-description" sx={{mt: 2}}>
              <textarea placeholder="Ajoutez une description"
                value={newDescription}
                onChange={(e)=>setNewDescription(e.target.value)}
              />
              <button className='btn'
              onClick={()=> updateProduct()}
              >Modifier</button>
            </Typography>
          </Box>
        </Modal>
    </div>
  )
}

export default Home;