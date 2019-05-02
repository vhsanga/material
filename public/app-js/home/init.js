$(function(){



	$("#callAjaxError").click(function (event){
		/*UTIL.executarGet("/listarProducto","Se han obtenido la lista de productos",function (dataRes) {
			 console.log('dataRes', dataRes);
		});*/
		UTIL.formAJson('formEjemplo');
	});
	$("#callAjaxSuccess").click(function (event){
		UTIL.executarPost("/crearProducto",{},"Se ha creado el producto",function (dataRes) {
			 console.log('dataRes', dataRes);
		});
	});
	$("#callAjaxInfo").click(function (event){
		UTIL.mensaje(UTIL.ESPERE, UTIL.MENSAJE_TIPO_PROCCESS);
	});
	$("#callAjaxWarn").click(function (event){
		UTIL.mensaje("esta es una alertta", UTIL.MENSAJE_TIPO_WARNING);
	});
});