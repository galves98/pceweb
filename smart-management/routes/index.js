const express = require('express');
const firebase = require('firebase');
const auth = require('./middleware/auth');
const Device = require('../models/devices');
const Client = require('../models/clients');
const Station = require('../models/station');
const Manager = require('../models/manager');
const User = require('../models/user');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login', layout: 'layout'});
});

/* GET dashboard page. */
router.get('/dashboard',auth.isAuthenticated,(req, res) => {
  console.log(req.session);
  res.render('dashboard', { title: 'Home' });
});


/* POST Login */
router.post('/login', (req, res) => {
  const user = req.body.user;
    // var erros = [];
    // if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
    // erros.push ({texto: "Email Inválido"})
    //}
    //if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
    //   erros.push ({texto: "Senha Inválida"})
    //  }
    //if(erros.length > 0){
    //console.log('PASSOU POR AQUI')
    //res.redirect('/');
    //} else
    //{
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((userID) => {
    User.getByUid(userID.user.uid).then((currentLogged) => {
      if (userID) {
        req.session.userUid =currentLogged.uid;
        req.session.email = currentLogged.email;
        req.session.type = currentLogged.type;
        req.session.id_t = currentLogged.id_t;
        console.log(req.session.type);
        console.log(req.session);
        console.log('-------------------------------------------');
        if(currentLogged.type == "Gestor"){
          console.log(currentLogged);
          res.redirect('/station/list');
          console.log('---------------entrou-------------------');
        }
        if(currentLogged.type == "ClienteADM"){
          res.redirect('/manager/list');
        }
        if(currentLogged.type == "ADM"){
          res.redirect('/client/list');
        }
      }
      }).catch((error)=>{
        console.log(error);
        console.log('------QQQQQQQ--------');
        res.redirect('/error');
      });

    }).catch((error) => {
      switch (error.code) {
         case 'auth/wrong-password':
           req.flash('danger', 'Senha incorreta.');
           break;
         case 'auth/user-not-found':
           req.flash('danger', 'Email não cadastrado.');
           break;
         case 'auth/network-request-failed':
           req.flash('danger', 'Falha na internet. Verifique sua conexão de rede.');
           break;
         default:
           req.flash('danger', 'Erro indefinido.');
         }
   console.log(`Error Code: ${error.code}`);
   console.log(`Error Message: ${error.message}`);
   res.redirect('/');
  });
});


//res.render('login', { title: 'Login', layout: 'layout', erros: erros});
//{{#each erros}}
 //   <div class='alert alert-danger'>{{texto}}</div>
 // {{else}}
  //{{/each}}

router.get('/forgotPassword', (req, res) => {
  res.render('forgotPassword', {title:'Esqueci Minha Senha',layout:'layout'});
});

router.post('/forgotPassword', (req, res) => {
  const emailAddress = req.body.user;
  console.log(emailAddress);
  firebase.auth().sendPasswordResetEmail(emailAddress.email).then(function() {
    res.redirect('/');
    req.flash('success', 'Email enviado');
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

// GET /logout
router.get('/logout', (req, res, next) => {
  firebase.auth().signOut().then(() => {
      // delete req.session.fullName;
      // delete req.session.userId;
      delete req.session;
      res.redirect('/');
    }).catch((error) => {
      console.log(error);
      res.redirect('/error');
    });
  });

module.exports = router;
