$(document).ready(function() {
  var titles;
  titles = [];
  $('.tab__title a').each(function() {
    return titles.push($(this).attr('title'));
  });
  $('.tab__title a').click(function() {
    var $el, $link, $tab, index;
    $el = $(this).closest('.tabs');
    $tab = $el.find('.current');
    index = parseInt($tab.attr('data-index')) || 0;
    $link = $tab.find('.tab__title a');
    $link.attr('title', titles[index]);
    $el.find('.current').removeClass('current');
    $(this).closest('.tab').addClass('current');
    $(this).attr('title', $(this).attr('title') + ' - Selected');
    return false;
  });
  return $('.tab:first-child .tab__title a').click();
});
