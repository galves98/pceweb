const express = require('express');
const firebase = require('firebase');
const auth = require('./middleware/auth');
const Device = require('../models/devices');
const Client = require('../models/clients');
const Station = require('../models/station');
const Manager = require('../models/manager');

const router = express.Router();

router.get('/signup',auth.isAuthenticated,auth.isManager, (req, res) => {
  res.render('manager/registerWorkStation', { title: 'Cadastro Estação de Trabalho', layout: 'layoutdashboardmanager' });
});

router.get('/',auth.isAuthenticated,auth.isManager, (req, res) => {
  res.render('manager/registerWorkStationHome', { title: 'Cadastro Estação de Trabalho', layout: 'layoutdashboardmanager' });
});

router.get('/list',auth.isAuthenticated,auth.isManager, (req, res) => {
const idm = req.session.id_t;
  Station.getByIdm(idm).then((stations) => {
    // console.log(stations);
    res.render('manager/registerWorkStationHome', { title: 'Lista de Estações de Trabalho', layout: 'layoutdashboardmanager', stations });
  }).catch((error)=> {
    res.redirect('/error');
    console.log(error);
  });
});


router.get('/movimentation/:id',auth.isAuthenticated,auth.isManager, (req, res) => {
  Device.getById(req.params.id).then((device) => {
    Client.getById(device.client).then((client) => {
      console.log(client);
      res.render('admin/deviceMove', { title: 'Movimentação de Aparelhos', layout: 'layoutdashboardmanager', device, client });
    });
  });
});

router.get('/edit/:id',auth.isAuthenticated,auth.isManager, (req, res) => {
  Station.getById(req.params.id).then((station) => {
    console.log(station);
    Manager.getById(station.manager).then((manager) => {
      console.log(manager);
    res.render('manager/registerWorkStationEdit', { title: 'Edição da Estação de Trabalho', layout: 'layoutdashboardmanager',station, manager });
    });
  });
});

router.post('/signup', function(req, res, next){
  const ativa = req.body.station;
  ativa.id_m = req.session.id_t;
  Station.create(ativa).then((id) => {
    res.redirect('/station/list');
    }).catch((error) =>{
      console.log(error);
  });
});

router.post('/delete/:id' , (req,res) => {
  Station.delete(req.params.id).then((resolve) => {
    res.redirect('/station/list');
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.post('/:id',(req, res) => {
  const station = req.body.station;
  const stationId = req.params.id;
  Station.getById(req.params.id).then((oldStation) => {
    Manager.removeStation(oldStation.manager, stationId).catch((error) => {
      console.log(error);
      res.redirect('/error');
    });
    Manager.getByCodManager(station.codManager).then((manager) => {
      station.manager = manager;
      delete manager.codManager;
      Manager.addStation(manager, stationId).catch((error) => {
        console.log(error);
        res.redirect('/error');
      });
      Station.update(req.params.id, station).then(() => {
        res.redirect('/station/list');
      }).catch((error) => {
        console.log(error);
        res.redirect('/error');
      });
    });
  });
});

module.exports = router;
