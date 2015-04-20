$(document).ready(function() {
  var grid, list;
  list = $('.block-list');
  grid = $('.shc-calendar thead, .shc-calendar tbody');
  return $('.grid-list-select a').click(function() {
    $(this).siblings().removeClass('current');
    $(this).addClass('current');
    if ($(this).hasClass('list')) {
      grid.hide();
      list.show();
    } else {
      grid.show();
      list.hide();
    }
    return false;
  });
});
