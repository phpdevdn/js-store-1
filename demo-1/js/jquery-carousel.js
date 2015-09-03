(function($){
	$.fn.crs_slider=function(options){
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
				$wid_tran=''
				;
			var images=$img_blk.size(),
				wid_fra=$images.width(),
				wid_seg=$img_blk.width(),
				img_per_fra=Math.round(wid_fra/wid_seg),
				num_pos=Math.ceil(images/img_per_fra),
				act="",
				curr=''
				;
			var listend=function(){
				$pos.on('click',pos_clk);
				$prev.on('click',{'dirct':0},dirct_clk);
				$next.on('click',{'dirct':1},dirct_clk);
			}
			var dirct_clk=function(evt){
				evt.preventDefault();
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
				act=$act.index();
				curr=$curr.index();				
				run();				
			}
			var run=function(){	
				wid_tran=(curr-act)*wid_fra;							
				$act.removeClass('active');
				$curr.addClass('active');
				$images.animate({'left':'-='+wid_tran},params.time,params.effect);
			}
			var setup=function(){
				console.log(images+'/'+img_per_fra);
				for(var i=1 ;i<=num_pos;i++){
					var $li=$('<li></li>').addClass((i==1)?'active':'');
					$pos_blk.append($li);
				}
				$pos=$pos_blk.children('li');
			}
			setup();
			listend();

		});
	}
})(jQuery);
$(document).ready(function(){
	$('#crs-slider').crs_slider();
});