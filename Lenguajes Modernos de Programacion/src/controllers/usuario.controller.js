
import { db } from '../firebase.js'; // Import the db from firebase.js
//const{db} =require('../firebase.js');

export const getUsuarios=async(req,res)=>{
const userCollection=await db.collection('usuarios').get();

const usuarios=userCollection.docs.map(doc=>({
    id:doc.id,
    ...doc.data()   
}));
res.json(usuarios)


}


export const addUsuario=async(req,res)=>{
   const {nombre,apaterno,amaterno,dirrecion,email}=req.body;
   const userAdded=await db.collection('usuarios').add({nombre,apaterno,amaterno,dirrecion,email});
   res.json({  id:userAdded.id});


}
export const updateUsuario=async(req,res)=>{

    try{
 const {id}=req.params
const datosUpdate=req.body 
await db.collection('usuarios').doc(id).update(datosUpdate);
res.json({
    status:'Usuario actualizado correctamente',
    id,

})

    }catch(error){
        res.status(500).json({error: error.message});
        
    }



}



export const deleteUsuario=async(req,res)=>{

    try{
 const {id}=req.params
const datosUpdate=req.body 
await db.collection('usuarios').doc(id).delete();
res.json({
    status:'Usuario eliminado correctamente',
    id,

})

    }catch(error){
        res.status(500).json({error: error.message});
        
    }



}


