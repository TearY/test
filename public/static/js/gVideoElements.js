// $(function(){
//   var slider = $('.slider-container');
//   slider.slick({
//   slidesToShow: slider.width()>700?4:1,
//   slidesToScroll: 1,
//   autoplay: false,
//   autoplaySpeed: 2000,
//   prevArrow:$('.go-prev'),
//   nextArrow:$('.go-next'),
//   responsive: [
//     {
//       breakpoint: 700,
//       settings: {
//       slidesToShow: 1
//       }
//     }
//   ]
// }).show();
// if (slider.width()>700) {
//   if (slider.find('a').length<=4) {
//       $(".go-prev,.go-next").hide();
//     }
//     else{
//       $(".go-prev,.go-next").show();
//     }
// }
// else if(slider.find('a').length>1){
//  $(".go-prev,.go-next").show();
// }
// })
$(function(){
  var width = $('.slider-container').width()
  $('.slider-container').jcarousel(
  {
    animation:500,
    visible:function(){
      if (window.screen.width>900){
        return 4;
      }
      else
      return 1
    },
    initCallback:function(){
      if (window.screen.width>900) {
        var items = $('.slider-container').find('.jcarousel-item').attr('tabindex','0').slice(4).css("visibility",'hidden').attr('aria-hidden','true').attr('tabindex','-1');
      }
    },
    itemVisibleInCallback:function(a,b,c){
      if (window.screen.width>900) {
        var items = $('.slider-container').find('.jcarousel-item').css("visibility",'hidden').attr('aria-hidden','true').attr('tabindex','-1');
        
        items.each(function(i){
          if (a.first+3<items.length) {
              if (a.first+3>i&&i>=a.first-1) {
                items.eq(i).css('visibility','visible').attr('tabindex','0').removeAttr('aria-hidden');
              };
          }
          else if (a.first+3>=items.length) {
            items.slice(-4).css('visibility','visible').attr('tabindex','0').removeAttr('aria-hidden');
          };
        });
      };
    }
  }).show();
  //$('.jcarousel-container').find('.jcarousel-next').click();
  var length =  $('.slider-container li').length;
  if($(window).width()>900&&length<5) {  //在pc端显示4个，如果小于4个则不显示prev和next
    $('.jcarousel-container').find('.jcarousel-next,.jcarousel-prev').hide();
  }
})



var Notice = {
  openNotice: function() {
    var height = $("#notice").height()+18;
    $("header").css("top",height);
    $("#maincontent").css("padding-top", $(window).width()>700?height+106:height);
    return $("#notice").show();
  },
  closeNotice: function() {
    var paddingTop;
    $("#notice").remove();
    $("header").css("top",0);
    paddingTop = $(window).width();
    paddingTop = paddingTop > 700 ? 106 : 1;
    return $("#maincontent").css("padding-top", paddingTop + "px");
  }
};

Notice.openNotice();

$("#notice .close-img").click(function() {
  return Notice.closeNotice();
});
