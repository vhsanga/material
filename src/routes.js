'use strict';



module.exports = function (app) {
	var indexRouter = require('./controllers/index');
	app.use('/', indexRouter);

}

