var el, k, _i, _len, _ref;

initSingleVideo('.g-single-video');

_ref = $('.page-anchors ul li').get();
for (k = _i = 0, _len = _ref.length; _i < _len; k = ++_i) {
  el = _ref[k];
  $(el).attr('data-id', k);
}

$('.page-anchors ul li a').click(function(ev) {
  var id, sc_section;
  ev.stopPropagation();
  ev.preventDefault();
  id = $(this).parent().attr('data-id');
  $('.page-anchors ul li').removeClass('active');
  $('.page-anchors ul li').eq(id).addClass('active');
  sc_section = $('.page-content section').eq(id).offset().top;
  return $('html, body').animate({
    'scrollTop': sc_section - 106
  });
});

$('.third-block h3').click(function() {
  $(this).toggleClass('active');
  return $('.third-block ul').slideToggle();
});

$(window).scroll(function() {
  var active_pos, m_top, p_section, positions, sc_cur, sc_parent, section, _j, _len1;
  positions = (function() {
    var _j, _len1, _ref1, _results;
    _ref1 = $('.page-content section').get();
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      section = _ref1[_j];
      _results.push($(section).offset().top - $('.page-content').offset().top);
    }
    return _results;
  })();
  sc_parent = $('.page-content section').parent().offset().top;
  sc_cur = $(window).scrollTop();
  m_top = sc_cur - sc_parent + 106;
  active_pos = 0;
  for (k = _j = 0, _len1 = positions.length; _j < _len1; k = ++_j) {
    p_section = positions[k];
    if (m_top + 50 >= p_section) {
      active_pos = k;
    }
  }
  $('.page-anchors ul li').removeClass('active');
  $('.page-anchors ul li').eq(active_pos).addClass('active');
  if (m_top < 0) {
    $('.page-anchors ul').css('margin-top', "0px");
    return;
  }
  if (m_top + $('.page-anchors ul').height() >= $('.page-content').height()) {
    m_top = $('.page-content').height() - $('.page-anchors ul').height();
  }
  return $('.page-anchors ul').css('margin-top', m_top + "px");
});

$('.back-to-top a').click(function(ev) {
  ev.stopPropagation();
  ev.preventDefault();
  return $('html, body').scrollTop(0);
});
