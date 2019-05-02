 "use strict";

 function UTIL(){
 	this.ESPERE='Procesando, espere...'
 	this.ERROR_AJAX_RESULT='Ha sucedido algo inesperado.'
 	this.MENSAJE_TIPO_PROCCESS=1;
 	this.MENSAJE_TIPO_SUCCESS=2;
 	this.MENSAJE_TIPO_WARNING=3;
 	this.MENSAJE_TIPO_ERROR=4;

 }


 UTIL.prototype.mensaje = function(texto, tipo, maximo=1) {
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
		stack: maximo,
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


UTIL.prototype.formAJson = function(idFormHtml, validar=true){ 
	/* idFormHtml = id del formulario que desamos deserialziar
	*  todos los componentes que se desa deserializar debe tener un 'name' que sera el KEY del json
	*  todos los componente a deseralizar deben ser de la clase css '_formJSON'  
	*  en caso de 'validar' =true, se debe hacer el proceso de validacion de campos
	*  'required'  es el tag que sirve para definir si el campo es obligatorio
	*  'requiredMessage' es el mensaje de alerta en caso de ser campo obligatorio
	*/
	var items= document.getElementById(idFormHtml).getElementsByClassName('_formJSON');

	if(validar){
		var mensaje=''
		for(var i=0; i<items.length; i++){
			items[i].classList.remove('form-control-warning')
			items[i].parentNode.classList.remove('has-warning')
			if(items[i].getAttribute('required')==='true'){
				if(items[i].value===''){					
					mensaje=items[i].getAttribute('requiredMessage')==null ? 'El campo "'+items[i].name+'" es obligatorio': items[i].getAttribute('requiredMessage')
					UTIL.mensaje(mensaje, UTIL.MENSAJE_TIPO_WARNING,4);
					items[i].classList.add('form-control-warning')
					items[i].parentNode.classList.add('has-warning')
					console.log(items[i].parentNode);
				}
			}
			
			
		}
	}



	
	var json={};
	var valorRadio='';
	for(var i=0; i<items.length; i++){
		if(items[i].nodeName==='INPUT'  || items[i].nodeName==='SELECT'  || items[i].nodeName==='TEXTAREA'){
			if(items[i].getAttribute('type')==='checkbox'){
				json[items[i].name]=[];
			}else{
				json[items[i].name]='';	
			}
		}
	}
	for(var i=0; i<items.length; i++){
		if(items[i].nodeName==='INPUT'  || items[i].nodeName==='SELECT' || items[i].nodeName==='TEXTAREA'){
			if(items[i].getAttribute('type')==='radio'){
				if(items[i].checked){
					json[items[i].name]=items[i].value;
				}
			}else if(items[i].getAttribute('type')==='checkbox'){
				if(items[i].checked){
					json[items[i].name].push(items[i].value);
				}
			}else {
				json[items[i].name]=items[i].value
			}
		}
	}
	console.log(json);
	return json;
};






var UTIL = new UTIL();