(function($){
	$.fn.crs_slider_1=function(options){
		var defaults={
			'time':700,
			'effect':'swing',
		};
		var params=$.extend(defaults,options);
		this.each(function(){
			var $block =$(this),
				$images=$block.children('.crs-images'),
				$img_blk=$images.children('.crs-img'),
				$pos_blk=$block.find('.crs-pos'),
				$pos='',
				$prev=$block.find('a.prev'),
				$next=$block.find('a.next'),
				$act='',
				$curr='',
				$act_imgs='',
				$curr_imgs='',
				$wid_tran=''
				;
			var height='',
				images='',
				wid_fra='',
				wid_seg='',
				img_per_fra='',
				num_pos='',
				act="",
				curr='',
				act_inc='',
				curr_inc='',
				active=true
				;
			var listend=function(){
				$pos.on('click',pos_clk);
				$prev.on('click',{'dirct':0},dirct_clk);
				$next.on('click',{'dirct':1},dirct_clk);
			}
			var dirct_clk=function(evt){
				evt.preventDefault();
				if(active == false ){
					return false;
				}
				active=false;
				$act=$pos_blk.children('.active');
				act=$act.index();					
				if(evt.data.dirct==0){
					$curr=(act==0) ? $pos_blk.children('li:last-child') : $act.prev();
				} else{
					$curr=(act==num_pos-1) ? $pos_blk.children('li:first-child') : $act.next();
				}
				curr=$curr.index();
 				run();

			}
			var pos_clk=function(){
				if($(this).hasClass('active')){
					return false;
				}
				$act=$pos_blk.children('.active');
				$curr=$(this);
				act=$act.attr('data-pos');
				curr=$curr.attr('data-pos');				
				run();				
			}
			var run=function(){	
 				$act.removeClass('active');
				$curr.addClass('active');
				$act_imgs=$img_blk.filter(function(index){
					return (index >= act * img_per_fra) && (index < act * img_per_fra + img_per_fra);
				});
				$curr_imgs=$img_blk.filter(function(index){
					return (index >= curr * img_per_fra) && (index < curr * img_per_fra + img_per_fra); 
				});
				var wid_trans=!(curr==0 && act == num_pos -1 ) && !(curr==num_pos -1  && act == 0)?(curr-act)/Math.abs(curr-act)*wid_fra : (act-curr)/Math.abs(curr-act)*wid_fra;
				console.log(wid_trans+'/'+act+'/'+curr+'/'+img_per_fra+'/'+$curr_imgs.size());
				$curr_imgs.each(function(index){
					$(this).css({
					'left':(index % img_per_fra) * wid_seg + wid_trans,
					'display':'block',					
				});
				});
				$act_imgs.animate({'left':'-='+wid_trans},params.time,params.effect,function(){
					$(this).css({ 'z-index': 50 ,'display' : 'none' ,'left':'+='+wid_trans});
				});
				$curr_imgs.animate({'left':'-='+wid_trans},params.time,params.effect,function(){
					$(this).css({ 'z-index' : 100});
					active=true;
				});
			}
			var setup=function(){
				height=$images.height();
				images=$img_blk.size();
				wid_fra=$images.width();
				wid_seg=$img_blk.width();
				img_per_fra=Math.round(wid_fra/wid_seg);
				num_pos=Math.ceil(images/img_per_fra);
				for(var i=0 ;i < num_pos;i++){
					var $li=$('<li></li>').addClass((i==0)?'active':'').attr({'data-pos':i});
					$pos_blk.append($li);
				}
				$pos=$pos_blk.children('li');
				$images.css({ 'height':height });
				$img_blk.each(function(index){
					$(this).css({
						'position':'absolute',
						'display':(index < img_per_fra) ? 'block' : 'none',
						'z-index' : (index < img_per_fra) ? 100 : 50,
						'top':0,
						'left':(index < img_per_fra) ? (index % img_per_fra) * wid_seg : 0,
					});
				});
			}
			setup();
			listend();

		});
	}
})(jQuery);
$(document).ready(function(){
	$('#crs-slider-1').crs_slider_1({
		'effect':'easeOutQuart',
	});
});