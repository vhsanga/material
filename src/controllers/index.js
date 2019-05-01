var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/home', function(req, res, next) {
  res.render('pg/home', {title: 'Sygma Pro', title_:'Bienvenido'});
});

router.post('/crearProducto', function(req, res, next) {
  res.json({id: 5, nombre:'prod5'});
  //res.json({success: false, error: "este error "}, 400); 
});

router.get('/listarProducto', function(req, res, next) {
	var prods=[
		{id:'1', nombre:'prod1'},
		{id:'2', nombre:'prod2'},
		{id:'4', nombre:'prod3'},
	];
	setTimeout(function () {
		res.json(prods);
	}, 3000);
  	
});

module.exports = router;
