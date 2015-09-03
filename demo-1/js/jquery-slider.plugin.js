(function($){
	$.fn.slider=function(options){
		var defaults={
			'time':700,
		}
		var params=$.extend(defaults,options);
		return this.each(function(){
		var	$obj=$(this);
		var $carousel=$obj,
			$img_blk=$carousel.children('.car-image'),
			height=$img_blk.height(),
			$pos_blk=$carousel.children('.car-pos'),
			$pos_ite=$pos_blk.children('li'),
			$img_ite=$img_blk.children('div'),
			 win_wid=$(window).width(),
			 mouseActive=true;
		var act ='',
			 curr ='',
			 $act_pos='',
			 $act = '',
			 $act_img ='',
			 $act_text ='',
			 $curr='',
			 $curr_img ='',
			 $curr_text ='',
			 curr_inc='',
			 act_inc='';  			
		var listend = function(){
			$pos_blk.on('click','li',function(){
				if($(this).attr('data-img')==curr){
					return false
				}else {
				curr = $(this).attr('data-img');				
				$act_pos=$(this);
				console.log($act_pos.attr('data-img'));			
				run();
				$(this).addClass('active');
				}
			});								
			$(window).on('resize',function(){
 				height=$img_ite.height();
				$img_blk.css({
				'height' : height,
			});
			});
		}
		var list_mouse = function(){
			$img_blk.on('mousewheel DOMMouseScroll onmousewheel',mouse);
		}
		var mouse = function(e){				
				e.preventDefault();
				if(mouseActive){
  				var delta=(e.originalEvent.wheelDelta) ? e.originalEvent.wheelDelta : e.originalEvent.detail ;
				mouseActive=false;
				console.log(delta);
				if(delta < 0){
					$act_pos=($act_pos.next()[0])? $act_pos.next() : $act_pos.siblings(':first') ;
					
				}else{
					$act_pos=($act_pos.prev()[0])? $act_pos.prev() : $act_pos.siblings(':last') ;
				}
				curr=$act_pos.attr('data-img');
				run();
				$act_pos.addClass('active');
			}
				
 		}
		var run = function(){
			act = $pos_blk.children('.active').removeClass('active').attr('data-img');			 
			$act = $img_ite.filter('#'+act);
			$act_img =$act.children('img');
			$act_text =$act.children('.text');
			$curr=$img_ite.filter('#'+curr);
			$curr_img =$curr.children('img');
			$curr_text =$curr.children('.text');
			curr_inc=((act < curr) && !(act === 'item0' && curr === 'item3'))
						|| (act === 'item3' && curr === 'item0')
 						? '-=' : '+=';
			act_inc=((act < curr) && !(act === 'item0' && curr === 'item3'))
						|| (act === 'item3' && curr === 'item0') 
 						? '+=' : '-=';
 			$curr_img.css({'top':curr_inc+height});
			$curr_text.css({'display':'none'});
			$curr.css({'display':'block'});
			//$curr_img.css({ 'top':'-='+height});
 			$act_img.animate({'top':act_inc+height},700,'swing',function(){
 				$act.removeClass('active').css({ 'display' : 'none','z-index' : 50});
 				$(this).css({'top' : 0});
 				$act_text.css({ 'opacity' : 1});
 			});
 			$act_text.animate({'opacity':0},300,function(){
 				$curr_text.delay(200).fadeIn(300,function(){
 					$img_blk.off('mousewheel DOMMouseScroll onmousewheel')
 					//$img_blk.on('mousewheel DOMMouseScroll onmousewheel',mouse);
 					mouseActive=true;
 					list_mouse();
 				});	
 			});								
 			$curr_img.animate({'top':act_inc+height},700,'swing',function(){
 				$curr.addClass('active').css({ 'z-index' : 100});				
 			});						
		}
		var setup = function(){					
			$img_ite.each(function(index){												
				$(this).attr({ 'id' : 'item'+index});
				var pos_ite=$("<li></li>").attr({'data-img' : 'item'+index})
							.addClass((index==0)?'active':'');				
				$pos_blk.append(pos_ite);			
			});
 			act='item0';
 			curr=act;
 			$act_pos=$pos_blk.children().first();
 			console.log($act_pos.attr('data-img'));
  			$img_ite.css({'position': 'absolute', 'top':0,'left':0,'z-index':50});
			$img_ite.filter('.active').css({'z-index' : 100});
			$img_blk.css({
				'height' : height,
			});
		}  
		setup();
		listend();
		list_mouse();
		});

	}
})(jQuery);
$(document).ready(function(){
	$('#car-slider').slider();
});