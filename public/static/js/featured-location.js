var SwipeDots, el, _i, _len, _ref;

SwipeDots = function(el) {
  var dots, k, options, s, s_el, swipe_entity, total_slide, _i, _len, _ref;
  s_el = $(el).find('.swipe').get(0);
  if ($(s_el).find('.swipe-wrap > div').get().length > 1) {
    _ref = $(s_el).find('.swipe-wrap > div').get();
    for (k = _i = 0, _len = _ref.length; _i < _len; k = ++_i) {
      s = _ref[k];
      $(el).find('.dots').append("<div class='dot' data-id='" + k + "'></div>");
    }
    $(el).find('.dots .dot').eq(0).addClass('active');
    dots = total_slide = $(s_el).find('.swipe-wrap > div').get().length;
  }
  options = {
    speed: 400,
    continuous: true,
    disableScroll: false,
    stopPropagation: false,
    callback: function(index, elem) {
      index = index % total_slide;
      $(el).find('.dots .dot').removeClass('active');
      $(el).find('.dots .dot').eq(index).addClass('active');
      return true;
    }
  };
  swipe_entity = Swipe(s_el, options);
  return $(el).find('.dots .dot').click(function() {
    var id;
    id = parseInt($(this).attr('data-id'));
    return swipe_entity.slide(id);
  });
};

_ref = $('.slider-container').get();
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  el = _ref[_i];
  SwipeDots(el);
}
