import express from 'express';
import { getUsuarios, addUsuario,updateUsuario,deleteUsuario } from '../controllers/usuario.controller.js';

//const express= require('express');
const router=express.Router();
//const {getUsuarios, addUsuario} = require('../controllers/usuario.controller.js');
//Funciones para controlador

router.get('/',getUsuarios);
router.put('/:id',updateUsuario);
router.delete('/:id',deleteUsuario);
router.post('/',addUsuario);

export default router;
