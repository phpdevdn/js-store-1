$(document).ready(function(){
	var slider=(function(){
		var $carousel=$('#car-slider-01'),
			$carousel_bg=$('#row-slider-01'),
			time=1000,
			time_type_act='easeInCubic',
			time_type_curr='easeOutCubic',
			time_bg=$carousel_bg.attr('data-speed'),
			 $img_blk=$carousel.children('.car-image'),			 
			 $pos_blk=$carousel.find('.car-pos'),
			 $pos_arrow=$carousel.find('.car-arrow'),
			 $pos_ite=$pos_blk.children('li'),
			 $img_ite=$img_blk.children('div'),
			 height_img=$img_blk.find('img').height(),
			 padd_img=50,
			 height=height_img+2*padd_img,
			 height_bg=height/time_bg,
			 height_text=height*2,
			 num_img=$img_ite.size(),
			 pos_marg=height_img/num_img,
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
			 act_inc='',
			 curr_inc='';
		var init=function(){
			setup();
			listend();
			list_mouse();
 		}
		var listend = function(){
			$pos_blk.on('click','li',function(){
				if($(this).attr('data-img')==curr){
					return false
				}else {
				curr = $(this).attr('data-img');				
				$act_pos=$(this);
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
			var pos_end=$pos_blk.children('li:last-child').index().toString();
			curr_inc=((act < curr) && !(act === 'item0' && curr === 'item'+pos_end))
						|| (act === 'item'+pos_end && curr === 'item0')
 						? '-=' : '+=';
			act_inc=((act < curr) && !(act === 'item0' && curr === 'item'+pos_end))
						|| (act === 'item'+pos_end && curr === 'item0') 
 						? '+=' : '-=';
 			pos_marg=Math.abs($act.index()-$curr.index()) * height_img / num_img;
 			var arrow_pst=(act === 'item0' && curr === 'item'+pos_end)
						|| (act === 'item'+pos_end && curr === 'item0') 
 						? pos_marg+12*pos_end : pos_marg+12 ;
 			var arrow_inc=(act < curr)? '+=' : '-=';
 			$curr_img.css({'top':curr_inc+height});
			$curr_text.css({'top':curr_inc+height});
			$curr.css({'display':'block'});
			//$curr_img.css({ 'top':'-='+height});
 			$act_img.delay(time/3).animate({'top':act_inc+height},time,time_type_act,function(){
 				$act.removeClass('active').css({ 'display' : 'none','z-index' : 50});
 				$(this).css({'top' : 0});
 				$act_text.css({'top':0,'z-index' : 50});
  				
 			});
 			$act_text.animate({'top':act_inc+height},time/2,'swing',function(){
 				
 			});
 			$curr_text.delay(time-200).animate({'top':act_inc+height},time/2,'swing');								
 			$curr_img.delay(time-200).animate({'top':act_inc+height},time,time_type_curr,function(){
 				$curr.addClass('active').css({ 'z-index' : 100});				
 				$curr_text.css({ 'z-index' : 100});	
 				$img_blk.off('mousewheel DOMMouseScroll onmousewheel')
  				mouseActive=true;
 				list_mouse();			
 			});
 			$carousel_bg.animate({'background-position-y':act_inc+height_bg+'px'},time+time-200,'linear');						
 			$pos_arrow.animate({'top':arrow_inc+arrow_pst},time+time-500,'swing');						
		}
		var setup = function(){			
			$img_ite.each(function(index){												
				$(this).attr({ 'id' : 'item'+index});
				var pos_ite=$("<li></li>").attr({'data-img' : 'item'+index})
							.addClass((index==0)?'active':'').css({'margin-bottom':pos_marg});				
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
		return {
			'init':init(),
		}
	})();
});