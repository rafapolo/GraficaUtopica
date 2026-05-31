$(document).ready(function(){

	a = [];
	a['circodossonhos'] = 26;
	a['route'] = 6;
	a['videos'] = [31080942, 31080856, 31080849, 31080962, 31080973, 16926766, 16715441];

	// preload
	var capa = $("#capa")
	capa.load(function(){
		capa.css("position", "absolute").css("opacity", 1)
		.css("visibility", "visible")
		.css("top", (window.innerHeight / 2) - (capa.height() / 2))
		.css("left", (window.innerWidth / 2) - (capa.width() / 2));	
		var loading = $("#load")
		loading.css("position", "absolute").css("opacity", 0.3)
		.css("top", (window.innerHeight / 2) - (loading.height() / 2)+140)
		.css("left", (window.innerWidth / 2) - (loading.width() / 2)-12);

		var sum = qtd = 0;
		for (var e in a) {
			sum = sum + a[e];
			for (var x=1; x<=a[e]; x++){
				loadImg = new Image();
				loadImg.onload = function(){
					if(qtd--==0){
						// carregou
						setTimeout (function(){
							$("#menu").css("visibility", "visible").hide().fadeIn(4000);
							$("#download").css("visibility", "visible").hide().fadeIn(4000);
							show('circodossonhos')}, 
						5000);				
					}					
				};
				loadImg.src = "fotos/"+e+"/thumb/"+x+".jpg"
			}
		}
	});
	if(capa[0].complete) capa.trigger('load');

	function embedVideo(id){
		var embed = '<div class="video"><iframe id="video-'+id+'" src="http://player.vimeo.com/video/'+id+'?byline=0&amp;portrait=0" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe></div>';
		var randomTop = Math.round(Math.random()*window.innerHeight);
		if (randomTop+240>window.innerHeight){ randomTop=randomTop-240 }
		var randomLeft = Math.round(Math.random()*window.innerWidth);
		if (randomLeft+460>window.innerWidth){ randomLeft=randomLeft-460 }
		
		$("body").append(embed);
		$("#video-"+id).parent().animate({
			top: randomTop,
			left: randomLeft,
			opacity: 1
		}, 1500, function(){
			$(this).children().css("visibility", "visible");			
		});				
	}


	$("span").click(function(){
		var id=$(this).attr('id');
		if (id=='videos'){
			showVideos();
		} else {
			show(id);			
		}
	});

	function showVideos(){  
		limpar();   
		circo = [];  
		videos = a['videos'];   
		for (var i in videos){
			embedVideo(videos[i]);
		};
		$('.video').draggable();
		$('.video').hover(function(){
			$('.video').each(function(){
				$(this).css("z-index", 1)
			})	
			$(this).css("z-index", 2);			
		})
	}

	function show(espetaculo){  
		limpar();        
		circo = [];
		var qtd = a[espetaculo];
		for (var x=1; x<=qtd; x++){
			circo.push("fotos/"+espetaculo+"/thumb/"+x+".jpg")
		}
		i = 0;
		sonho(circo[i], espetaculo);
	} 

	function limpar(){	
		var goAway = jQuery.merge($('img'), $('.video'));
		goAway.each(function(){
			$(this).animate({
				top: window.innerHeight+100
			}, 1000, function(){
				$(this).remove()
			});
		});
	}   

	function isThumb(i){        
		return i.match(/thumb/) ? i.match(/thumb/).length>0 : false;
	}

	function blink(el, times){
		$(el).fadeTo(50, 0).fadeTo(50, 1, function(){
			if (times>0){
				blink(el, times-1)
			} else {
				el.css("opacity", "0.4")
			}
		});
	}

	function minimize(thisImg){
		var randomTop = Math.round(Math.random()*window.innerHeight);
		if (randomTop+150>window.innerHeight){
			randomTop=randomTop-150;
		}
		var randomLeft = Math.round(Math.random()*window.innerWidth);
		if (randomLeft+200>window.innerWidth){
			randomLeft=randomLeft-200;
		}  
		thisImg.animate({
			width: 150,
			height: 150,
			top: randomTop,
			left: randomLeft,
			opacity: "0.4"
		}, 500, function(){ 
			thisImg.css("height", "").css("width", "");
		});
	}

	function maximize(thisImg){
		var h = thisImg.height();
		var w = thisImg.width();
		$(thisImg).css("height", 200);
		$(thisImg).css("width", 150);
		$(thisImg).css("opacity", "0.3");
		thisImg.animate({
			top: (window.innerHeight / 2) - (h / 2),
			left: (window.innerWidth / 2) - (w / 2),
			height: h,
			width: w,
			opacity: 1
			}, 600);
		}

		function sonho(src, espetaculo){
			e = espetaculo;
			var img = $("<img/>");	
			img.attr("src", src);	
			$("body").append(img);
			img.draggable();
			img.hover(function(){
				$(this).css("opacity", 1);
				$("img").each(function(){
					$(this).css("z-index", 1)
				})	
				img.css("z-index", 2);
				img.css("cursor", "move");
			}, 
			function(){
				$(this).css("opacity", "0.4");
			});							

			var randomTop = Math.round(Math.random()*window.innerHeight);
			if (randomTop+150>window.innerHeight){ randomTop=randomTop-150 }
			var randomLeft = Math.round(Math.random()*window.innerWidth);
			if (randomLeft+200>window.innerWidth){ randomLeft=randomLeft-200 }
			img.animate({
				top: randomTop,
				left: randomLeft			
			}, 200, function(){ 
				var loader = $('<div/>');
				img.click(function(){                                
					var id = $(this).attr("src").match(/\d+/);
					var size; 
					if (isThumb($(this).attr("src"))){
						$("body").append(
							loader.css("height", $(this).height()-10).css("width", $(this).width()-10)
							.addClass("loader").css("top", $(this).css("top")).css("left", $(this).css("left"))
						);
						size = "full";						
					} else {
						size = "thumb";
					}				

					$(this).attr("src", "fotos/"+e+"/"+size+"/"+id+".jpg")
				});    
				img.load(function(){   
					if(!isThumb($(this).attr("src"))){                               				
						loader.remove();
						maximize($(this));
					} else {         
						minimize($(this));
					}
				});			                       
				// próxima
				i++;
				if (i<a[e]){
					sonho(circo[i], e);					
				} else {
					blink($("img").first(), 30);
				}
			});				
		}		

		setInterval(function(){
			var randomWord = ["GRÁFICA", "UTÓPICA"][Math.floor(Math.random()*2)];
			var randomLeft = Math.round(Math.random()*window.innerWidth)-60;
			var randomTop = Math.round(Math.random()*window.innerHeight)-35;
			var acaso = $("<p>"+randomWord+"</p>").css("top", randomTop).css("left", randomLeft);
			$("body").append(acaso);
			}, Math.round(Math.random() * 800));

		});