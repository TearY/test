$('.second-block .mobile li > a').click(function(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  $('.second-block .mobile li .sub-content').slideUp();
  return $(this).parent().find('.sub-content').slideDown();
});
