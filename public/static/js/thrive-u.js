var coloredBoxHeight, initHeight;

initHeight = function(type) {
  var el, itemHeight, maxHeight, _i, _len, _ref;
  $(type).css('height', 'auto');
  maxHeight = 0;
  _ref = $(type).get();
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    el = _ref[_i];
    itemHeight = parseInt($(el).outerHeight());
    if (itemHeight > maxHeight) {
      maxHeight = itemHeight;
    }
  }
  return $(type).css('height', maxHeight + "px");
};

initHeight('.colored-box');

coloredBoxHeight = function() {
  return initHeight('.colored-box');
};

$(window).resize(function() {
  return coloredBoxHeight();
});
