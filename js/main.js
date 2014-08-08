var pos = 0;
var intv;
var flippedElement;
var opcionesHoteles = [{opciones:[{opcion:'Cuarto individual'},{opcion:'Alberca privada'},
					 {opcion:'Jacuzzi con burbujas'}],costo: '350',paquete:'Paquete medio'},
					 {opciones:[{opcion:'Cuarto individual'},{opcion:'Alberca privada'},
					 {opcion:'Jacuzzi de plata'}],costo: '500',paquete:'Paquete premium'},
					 {opciones:[{opcion:'Cuarto individual'},
					 {opcion:'Alberca privada'},{opcion:'Jacuzzi'}],costo: '300',paquete:'Paquete económico'}];

$(document).on('ready',function(){
	init();
});

function init(){
	$('.slider_controls li').on('click',handleClick);
	var width = $('.slider_container').width();

	$('.slide').each(function(i,e){
		addBackground(e,width,true);
	});
	$('.image_food').on('click',changeViewPort);
	$('.image_food').each(function(i,e){
		addBackground(e,false);
		if($(e).hasClass('viewport')) return true;
		$(e).data('top',((i)*100));
		$(e).css({
			'top':$(e).data('top')+'px'
		});
	});
	$(document).on('click','.ver-mas',flipElement);

	intv = setInterval(handleClick,5000);
}
google.maps.event.addDomListener(window,'load',drawMap);
function drawMap(){
	var mapa;
	var opcionesMapa = {
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	mapa = new google.maps.Map(document.getElementById('google_canvas'),opcionesMapa);

}

function changeViewPort(){
	var e = $('.viewport');
	e.css('top',$(e).data('top'));
	e.removeClass('viewport');
	$(this).addClass('viewport');
	$(this).css('top',0);
}

function addBackground(element,width,setSize){
	if(!width) width = $('html').width();
	if(setSize){
		$(element).css({
			'width': width,
			'height': $('html').height()
		});
	}
	var imagen = $(element).data('background');
	$(element).css('background-image',"url("+(imagen+".jpg")+")");

}

function flipElement(){
	if(flippedElement !=null){
		$(flippedElement).revertFlip();
		flippedElement = null;
	}
	$(flippedElement).remove();
	var padre = $(this).parent();
	flippedElement = padre;
	$('#precioTemplate').template("CompiledTemplate");
	$(padre).flip({
		direction: 'rl',
		speed: 500,
		content: $('#precioTemplate').tmpl(opcionesHoteles[$(this).data('number')]).html(),
		color: '#f7f7f7',
		onEnd: function(){
			$('#regresar-ventana').on('click',function(){
			$(flippedElement).revertFlip();
			flippedElement = null;
			});
		}
	});
}

function handleClick(){
	var slide_target = 0;
	if ($(this).parent().hasClass('slider_controls')) {
		slide_target = $(this).index();
		pos = slide_target;
		clearInterval(intv);
		intv = setInterval(handleClick,5000);
		
	}
	else {
		pos++;
		if(pos>=$('.slide').length){
			pos = 0;
		}
		slide_target = pos;
	}

	/*$('.slideContainer').animate({
			'margin-left': -(slide_target * $('.slider_container').width()) + 'px'
			},'slow');*/

	$('.slideContainer').fadeOut('slow', function() {
		$(this).animate({
			'margin-left': -(slide_target * $('.slider_container').width()) + 'px'
			},'slow', function() {
			$(this).fadeIn();
		});
		
	});

}
