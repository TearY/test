var i, k, options, swipe_entity, _i, _len, _ref;

options = {
  speed: 400,
  continuous: true,
  disableScroll: false,
  stopPropagation: false,
  total_slide: $('section.app-preview').find('.swipe-wrap > div').get().length,
  callback: function(index, elem) {
    index = index % this.total_slide;
    $('section.app-preview').find('.dots .dot').removeClass('active');
    $('section.app-preview').find('.dots .dot').eq(index).addClass('active');
  }
};

swipe_entity = Swipe(document.querySelector('.swipe'), options);

_ref = $('.app-carousel .app-carousel-content').get();
for (k = _i = 0, _len = _ref.length; _i < _len; k = ++_i) {
  i = _ref[k];
  $('.app-carousel .dots').append("<div data-id=\"" + k + "\" class=\"dot\"></div>");
}

$('.app-carousel .dots .dot').click(function() {
  var id;
  id = parseInt($(this).attr('data-id'));
  swipe_entity.slide(id);
  $('.app-carousel .dots .dot').removeClass('active');
  $('.app-carousel .dots .dot').eq(id).addClass('active');
  $('.app-carousel .app-carousel-content').hide();
  return $('.app-carousel .app-carousel-content').eq(id).fadeIn('slow');
});

$('.app-carousel .nav-left').click(function(ev) {
  var id;
  ev.stopPropagation();
  ev.preventDefault();
  id = parseInt($('.app-carousel .dots .dot.active').attr('data-id'));
  id -= 1;
  if (id < 0) {
    id = 0;
    return;
  }
  return $('.app-carousel .dots .dot').eq(id).click();
});

$('.app-carousel .nav-right').click(function(ev) {
  var id;
  ev.stopPropagation();
  ev.preventDefault();
  id = parseInt($('.app-carousel .dots .dot.active').attr('data-id'));
  id += 1;
  if (id >= $('.app-carousel .app-carousel-content').get().length) {
    id = $('.app-carousel .app-carousel-content').get().length - 1;
    return;
  }
  return $('.app-carousel .dots .dot').eq(id).click();
});

$('.app-carousel .dots .dot').eq(0).click();

initSingleVideo('.g-single-video');
