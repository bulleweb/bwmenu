/* MENU */

(function($)
{
    $.fn.bwmenu=function(parametres)
    {

		//Paramètres par défaut
		var defauts=
		{
			'button':"#bt-monmenu",
			'btstatic':0,
			'margin': "260px",
			'decal':"30px"
		}; 

		//On fusionne nos deux objets 
		var opt=$.extend(defauts, parametres); 

		// Valeur par défaut du décalage
		var bttop=$(opt.button).css('left');

		return this.each(function(e)
		{
			var elem=$(this);

		    // Initialisation du composant
		    init(elem);
			
			// Click sur le bouton
			$(opt.button).on('click',function() {
				Onclick(elem)
			});

			// Click sur les sous menu
			elem.on('click','a',function() {
				OnclickSousMenu(elem,$(this))
			});

			// Click en dehors du cadre
			$('.bw-link').on('click',function() {
				if (elem.hasClass('bw-open')) {
					fermeTout($('.bwmenu'));
				}
			});

			// Click bt back
			$('div').on('click','.bw-back',function(event) {
				fermeSousMenu(elem,$(this))
				event.stopPropagation()
			});

 		});

		function init(elem) {
			// Configuration du menu
		   	elem.addClass('bwmenu');

		   	$('html').prepend('<div class="bw-link"></div>')
	   	
		   	elem.css('width',opt.margin)
	   			.css('left','-'+opt.margin)

		   	// Parsage des ul
			elem.find('ul').addClass('bt-cache');
			//elem.find('ul li ul li').html(elem.find('ul li').html()+'bt');
		    elem.children('ul').addClass('bt-montre');
		};

		// Click sur un element
		function Onclick(elem) {
			if (elem.hasClass('bw-open')) {
				fermeTout($('.bwmenu'));
			} else {
				$(opt.button).removeClass('bt-menu-close').addClass('bt-menu-open');
				elem.addClass('bw-open').animate({left:'0.000000001'});
				$('html').animate({marginLeft:'+='+opt.margin}).removeClass('over-auto').addClass('over-none');;

				$('.bw-link').addClass('bw-link-max');
			}
		};

		// Click sur sous menu
		function OnclickSousMenu(elem,link) {

			if(link.parent().find('ul').length>0) {
				var val=link.parent().find('ul').html()
				
				elem.animate({width:'+='+opt.decal})
				$('.bw-sousmenu').animate({marginLeft:'+='+opt.decal})
				$('html').animate({left:'+='+opt.decal})

				if (opt.btstatic==0 ) { $(opt.button).animate({left:'+='+opt.decal})}
				
				$('.bw-sousmenu,.bwmenu').removeClass('over-auto').addClass('over-none');

				var number = 1 + Math.floor(Math.random() * 999999)
				var $idnew="bw-sousmenu"+number;
				elem.append('<div id="'+$idnew+'" class="bw-sousmenu" class="over-auto"  style="width:'+opt.margin+';left:-'+opt.margin+';"><div class="bw-back" ref-div="'+$idnew+'" ><span class="fa fa-caret-left"></span>&nbsp;Retour</div>'+val+'</div>');

				$('#'+$idnew).animate({left:'0.000000001'})

				//Icon
				var $iconprev=link.prev().attr('class');
				if($iconprev!=undefined) {
					var $topicon='<span class="bw-topicon '+$iconprev+'"></span>';

					link.parent().append('<div style="display:none;" id="icon'+$idnew+'"></div>')
					$('#icon'+$idnew).append($topicon);
					$('#icon'+$idnew).show('slow');
				}
			}
		}

		function fermeSousMenu (elem,link) {
			$nomdiv=(link.attr('ref-div'));
			$('#'+$nomdiv).animate({marginLeft:'-'+opt.margin},function (el) {
				$(this).remove();
			});

			$('#icon'+$nomdiv).remove();
			$('.bw-sousmenu').animate({marginLeft:'-='+opt.decal}).removeClass('over-none').addClass('over-auto');
			$('.bwmenu').animate({width:'-='+opt.decal})
			$('html').animate({left:'-='+opt.decal})
			
			if (opt.btstatic==0 ) { $(opt.button).animate({left:'-='+opt.decal})}

			$($nomdiv).animate({left:'-='+opt.margin})

			// Test si menu ouvert sans sous menu
			var $valdecal=(parseInt((opt.margin).replace(/px/,""))+parseInt((opt.decal).replace(/px/,"")))+"px"

			if ($('.bwmenu').css('width')==$valdecal) {
				$('.bwmenu').removeClass('over-none').addClass('over-auto');
			}
		}

 		function fermeTout(elem) {
			$('html').animate({marginLeft:'-='+opt.margin}).removeClass('over-none').addClass('over-auto');
			$('.bwmenu').removeClass('bw-open').animate({left:'-='+opt.margin}).animate({width:opt.margin});
			$('.bw-link').removeClass('bw-link-max');
			$('.bw-sousmenu').animate({marginLeft:'-'+opt.margin});	
			$(opt.button).animate({left:bttop},function () {
				$('.bw-sousmenu').remove();
				$('.bw-topicon').remove();
			})
			$(opt.button).removeClass('bt-menu-open').addClass('bt-menu-close');
		};
	
};
})(jQuery);