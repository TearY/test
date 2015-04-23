var initSingleVideo;

initSingleVideo = function(names) {
  var el, _i, _len, _ref, _results;
  _ref = $(names).get();
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    el = _ref[_i];
    _results.push($(el).find('.data-container .play-video').click(function(ev) {
      var el_frame, img, parent, video_url;
      if ($(this).attr('href') === "#") {
        ev.stopPropagation();
        ev.preventDefault();
      }
      parent = $(this).parent().parent().parent().parent();
      video_url = $(this).attr('data-src');
      $(parent).find('.video-container iframe').attr("src", video_url);
      $(parent).find('.video-container iframe').show();
      el_frame = document.createElement('iframe');
      el_frame.src = "https://www.youtube.com/embed/" + video_url + "?autoplay=1&enablejsapi=1&rel=0&showinfo=0&autohide=1&color=white&theme=light";
      el_frame.type = "text/html";
      el_frame.width = "960";
      el_frame.height = "440";
      el_frame.style.border = "none";
      el_frame.frameborder = "0";
      el_frame.allowfullscreen = true;
      $(parent).find('.video-container').append(el_frame);
      $(parent).find('.video-container').addClass('video-active');
      if ($(document).width() <= 768) {
        img = $(parent).find('.data-container img').get()[0];
        $(el_frame).height($(img).height());
      }
      return $(parent).find('.close-video-button').click(function() {
        $(parent).find('.video-container').removeClass('video-active');
        return $(parent).find('.video-container iframe').remove();
      });
    }));
  }
  return _results;
};
