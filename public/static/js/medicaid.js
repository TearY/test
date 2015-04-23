$(document).ready(function() {
  var $el, $pagination, $results, start;
  $('.counties-open').click(function() {
    $('#counties').show();
    return true;
  });
  $el = $('#zip-search');
  $pagination = $el.find('.pagination-block');
  $el.show();
  $results = $el.find('.result');
  if ($results.length > 10) {
    $results.slice(0, 10).show();
    $pagination.addClass('pfirst');
    $pagination.show();
    start = 10;
    $pagination.find('.pagination-block__next').click(function() {
      start += 10;
      $results.hide().slice(start - 10, start).show();
      $pagination.removeClass('pfirst');
      if ($results.length <= start) {
        return $pagination.addClass('plast');
      }
    });
    return $pagination.find('.pagination-block__prev').click(function() {
      start -= 10;
      $results.hide().slice(start - 10, start).show();
      $pagination.removeClass('plast');
      if (start === 10) {
        return $pagination.addClass('pfirst');
      }
    });
  }
});
