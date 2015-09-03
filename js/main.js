$(document).ready(function(){
     var y_wid='';
    var active=true;
    var ver_scroll=0;
    $(window).on("scroll",function(){
        onscroll();
    });
    var onscroll=function(){
        console.log('ok');
        y_wid=$(window).scrollTop();
        on_bg();
        //first_func();
     }
    var on_bg=function(){
            $('section[data-type="background"]').each(function(){
            var $bgobj = $(this); // assigning the object 
             var yPos = -(y_wid / $bgobj.data('speed'));                         
            // Put together our final background position
            var coords = '50% '+ yPos + 'px';
            // Move the background
            $bgobj.css({ backgroundPosition: coords });
     }); 
    }
 
    var first_func=function(){
        console.log('ok');
        $(window).off('scroll');
        $('html, body').stop().animate({
            'scrollTop':y_wid+200,
        },300,function(){
            onscroll();
        });
    }  
});