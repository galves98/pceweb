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
  Manager.getAll().then((managers) => {
    res.render('client/registerSectors', { title: 'Cadastro de Setores', layout: 'layoutdashboardclientadm', managers});
  })
});

router.post('/signup',auth.isAuthenticated,auth.isClienteADM, function(req, res, next) {
  const ativa = req.body.sector;
  Manager.getById(ativa.idManager).then((gestor) => {
    ativa.manager = gestor.name;
    Sector.create(ativa).then((id) => {
      res.redirect('/sector/list');
    }).catch((error) => {
      res.redirect('/error');
      console.log(error);
    });
  }).catch((error) => {
    res.redirect('/error');
    console.log(error);
  });
});

router.get('/list',auth.isAuthenticated,auth.isClienteADM, (req, res) => {
  Sector.getAll().then((sectors) => {
    res.render('client/sectorslist', { title: 'Lista de Setores', layout: 'layoutdashboardclientadm', sectors });
  }).catch((error)=> {
    res.redirect('/error');
    console.log(error);
  });
});

router.get('/edit/:id',auth.isAuthenticated,auth.isClienteADM, (req, res) => {
  Sector.getById(req.params.id).then((sector) => {
    Manager.getAll().then((managers) => {
      res.render('client/registerSectorsEdit', { title: 'Edição de Setores', layout:'layoutdashboardclientadm',sector,managers });
    }).catch((error) => {
      res.redirect('/error');
      console.log(error);
    });
  });
});

router.post('/delete/:id' , (req,res) => {
  Sector.delete(req.params.id).then((resolve) => {
    res.redirect('sector/list')
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.post('/:id', (req, res) => {
  const sector = req.body.sector;
  console.log(sector);
  Manager.getById(sector.idManager).then((gestor) => {
    sector.manager = gestor.name;
    Sector.update(req.params.id, sector).then(() => {
      res.redirect('/sector/list');
    }).catch((error) => {
      res.redirect('/error');
      console.log(error);
    });
  }).catch((error) => {
    res.redirect('/error');
    console.log(error);
  });
});


module.exports = router;
