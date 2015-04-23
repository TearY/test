var initMapSelector, initSelector;

initSelector = function() {
  var v;
  v = $('.sixth-block select').val();
  $('.sixth-block .select-container .link-select-region').html(v);
  $('.map-content').hide();
  $('.top-map-description').hide();
  $('.map-content[data-id="' + v + '"]').show();
  $('.top-map-description[data-id="' + v + '"]').show();
  return $('.sixth-block select').change(function() {
    v = $(this).val();
    $('.sixth-block .select-container .link-select-region').html(v);
    $('.map-content').hide();
    $('.top-map-description').hide();
    $('.map-content[data-id="' + v + '"]').show();
    return $('.top-map-description[data-id="' + v + '"]').show();
  });
};

initMapSelector = function() {
  $('.select-container button.select-region-button').click(function(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    $(this).parent().find('ul').toggleClass('active');
    return $(this).parent().find('.ul-bg').toggleClass('active');
  });
  $('.select-container ul li a').click(function(ev) {
    var v;
    ev.stopPropagation();
    ev.preventDefault();
    v = $(this).parent().attr('data-value');
    $('.sixth-block .select-container .link-select-region').html(v);
    $('.map-content').hide();
    $('.top-map-description').hide();
    $('.map-content[data-id="' + v + '"]').show();
    $('.top-map-description[data-id="' + v + '"]').show();
    $(this).parent().parent().toggleClass('active');
    return $(this).parent().parent().parent().find('.ul-bg').toggleClass('active');
  });
  return $('.select-container .ul-bg').click(function() {
    return $('.select-container button.select-region-button').click();
  });
};

initSelector();

initMapSelector();
