const express = require('express');
const firebase = require('firebase');
const auth = require('./middleware/auth');
const Device = require('../models/devices');
const Client = require('../models/clients');
const Station = require('../models/station');
const Manager = require('../models/manager');

const router = express.Router();

router.get('/',auth.isAuthenticated,auth.isManager, (req, res) => {
  res.render('manager/onlineTracking', { title: 'Acompanhamento Online', layout: 'layoutdashboardmanager' });
});

router.get('/user/:id',auth.isAuthenticated,auth.isManager, (req, res) => {
  Station.getById(req.params.id).then((stations) => {
    res.render('manager/onlineTrackingUser', { title: 'Acompanhamento Online', layout: 'layoutdashboardmanager', stations });
  });
});

router.get('/signup',auth.isAuthenticated,auth.isManager, function(req, res, next) {
  res.render('manager/', { title: '' });
});

router.get('/list',auth.isAuthenticated,auth.isManager, (req, res) => {
  const manager = req.session.id_t;
  Station.getByIdm(manager).then((stations) => {
    res.render('manager/onlineTrackingHome', { title: 'Acompanhamento Online', layout: 'layoutdashboardmanager',stations });
  }).catch((error)=> {
    res.redirect('/error');
    console.log(error);
  });
});

router.get('/edit/:id',auth.isAuthenticated,auth.isManager, (req, res) => {
  Station.getById(req.params.id).then((station) => {
    res.render('admin/clientsRegistrationEdit', { title: 'Edição de Perfil', layout: 'layoutdashboardmanager',station });
  });
});

module.exports = router;
