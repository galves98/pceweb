const express = require('express');
const firebase = require('firebase');
const auth = require('./middleware/auth');
const Device = require('../models/devices');
const Client = require('../models/clients');
const Station = require('../models/station');
const Manager = require('../models/manager');
const User = require('../models/user');
const Sector = require('../models/sector');


const router = express.Router();

router.get('/signup',auth.isAuthenticated,auth.isClienteADM, function(req, res, next) {
  res.render('client/managerRegistration', { title: 'Cadastro de Gestores', layout: 'layoutdashboardclientadm'});
});

router.get('/list',auth.isAuthenticated,auth.isClienteADM, (req, res) => {
  Manager.getAll().then((managers) => {
    res.render('client/managerList', { title: 'Lista de Gestores',layout: 'layoutdashboardclientadm', managers });
  }).catch((error)=> {
    res.redirect('/error');
    console.log(error);
  });
});

router.get('/edit/:id',auth.isAuthenticated,auth.isClienteADM, (req, res) => {
  Manager.getById(req.params.id).then((manager) => {
    res.render('client/managerRegistrationedit', { title: 'Edição de Perfil', layout:'layoutdashboardclientadm',manager });
  });
});

router.post('/signup',auth.isAuthenticated,auth.isClienteADM, function(req, res, next) {
  const ativa = req.body.manager;
  ativa.type = "Gestor";
  firebase.auth().createUserWithEmailAndPassword(ativa.email, ativa.password).then((userF) => {
    ativa.uid = userF.user.uid;
    var usuario = ativa;
    Manager.create(ativa).then((id) => {
      User.create(usuario).then((id) =>{
        console.log("Usuario deu bom");
      }).catch((error) => {
        console.log(error);
        res.redirect('/error');
      });
      res.redirect('/manager/list');
    }).catch((error) => {
      console.log(error);
    });
  }).catch((error) => {
    res.redirect('/error');
    console.log(error);
  });
});

router.post('/:id',auth.isAuthenticated,auth.isClienteADM, (req, res) => {
  const manager = req.body.manager;
  Manager.update(req.params.id, manager).then(() => {
    res.redirect('/manager/list');
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});
module.exports = router;
