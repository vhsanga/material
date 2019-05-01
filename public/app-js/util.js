 "use strict";

 function UTIL(){
 	this.ESPERE='Procesando, espere...'
 	this.ERROR_AJAX_RESULT='Ha sucedido algo inesperado.'
 	this.MENSAJE_TIPO_PROCCESS=1;
 	this.MENSAJE_TIPO_SUCCESS=2;
 	this.MENSAJE_TIPO_WARNING=3;
 	this.MENSAJE_TIPO_ERROR=4;

 }


 UTIL.prototype.mensaje = function(texto, tipo) {
 	texto = "<p style='color: white; font-size: 14px;'>"+texto+"</p>"
	//swal(this.ESPERE);
	var head='';
	var _bgcolor='#F44336';
	var _loaderbg='#2196F3';
	var _icon= 'error';
	var _hideAfter= 8000;
	var _loader= false;
	if(tipo === this.MENSAJE_TIPO_PROCCESS){
		head=""
		_bgcolor='#00BCD4';
		_icon= '';
		texto="<i class='fa fa-spinner fa-spin fa-3x fa-fw' style='color: white;'></i>" +texto;
		_hideAfter= 35000;
		_loader= true;
	}if(tipo === this.MENSAJE_TIPO_SUCCESS){
		head='<b>Correcto</b>'
		_bgcolor='#4caf50';
		_icon= 'success';
		_hideAfter= 5000;
		
	}if(tipo === this.MENSAJE_TIPO_WARNING){
		head='<b>Atención</b>'
		_bgcolor='#FF9800';
		_icon= 'warning';
		
	}if(tipo === this.MENSAJE_TIPO_ERROR){
		head='<b>!Ups! hay un problema </b>'
	}
	$.toast({
			heading: head,
			text: texto,
			position: 'top-right',
			loaderBg:_loaderbg,
			bgColor: _bgcolor,
			icon: _icon,
			hideAfter: _hideAfter, 
			showHideTransition: 'plain',
			stack: 1,
			loader:_loader
		});
};

UTIL.prototype.executarPost = function(url, dataSend, msjExito, callback){
	UTIL.mensaje(UTIL.ESPERE, UTIL.MENSAJE_TIPO_PROCCESS);
	$.post( url,dataSend).done(function( dataRes ) {
		UTIL.mensaje(msjExito, UTIL.MENSAJE_TIPO_SUCCESS);
        callback(dataRes);
    }).fail(function(e) {
      try{
      	   console.error(e);
           UTIL.mensaje(e.statusText,UTIL.MENSAJE_TIPO_ERROR);
       }catch(e){  UTIL.mensaje(this.ERROR_AJAX_RESULT,UTIL.MENSAJE_TIPO_ERROR) }
    });
};


UTIL.prototype.executarGet = function(url,  msjExito, callback){
	UTIL.mensaje(UTIL.ESPERE, UTIL.MENSAJE_TIPO_PROCCESS);
	$.get(url).done(function( dataRes ) {
		UTIL.mensaje(msjExito, UTIL.MENSAJE_TIPO_SUCCESS);
        callback(dataRes);
    }).fail(function(e) {
      try{
      	 console.error(e);
         UTIL.mensaje(e.statusText,UTIL.MENSAJE_TIPO_ERROR);
       }catch(e){  UTIL.mensaje(this.ERROR_AJAX_RESULT,UTIL.MENSAJE_TIPO_ERROR) }
    });
};





 
var UTIL = new UTIL();