var initFourthBlockVideo, initTabsNav, setSecondBlockContentPosition;

initTabsNav = function() {
  var el, k, _i, _len, _ref;
  _ref = $('.second-block ul li').get();
  for (k = _i = 0, _len = _ref.length; _i < _len; k = ++_i) {
    el = _ref[k];
    $(el).attr('data-id', k);
  }
  $('.second-block ul li a').click(function(ev) {
    var id;
    ev.stopPropagation();
    ev.preventDefault();
    if ($(document).width() <= 768) {
      $('.second-block ul li .tab-block').slideUp();
      $(this).parent().find('.tab-block').slideDown();
      return;
    }
    id = $(this).parent().attr('data-id');
    $('.second-block ul li').removeClass('active');
    return $(this).parent().addClass('active');
  });
  if ($(document).width() > 768) {
    return $('.second-block ul li.active a').click();
  }
};

initFourthBlockVideo = function() {
  var bg;
  bg = $('.fourth-block .play-video-content').attr('data-bg');
  $('.fourth-block .play-video-content').css('background-image', 'url(' + bg + ')');
  return $('.fourth-block .play-video-content').click(function(ev) {
    var el, parent, video_url;
    ev.stopPropagation();
    ev.preventDefault();
    video_url = $(this).attr('data-video');
    el = document.createElement('iframe');
    el.src = "https://www.youtube.com/embed/" + video_url + "?autoplay=1&enablejsapi=1&rel=0&showinfo=0&autohide=1&color=white&theme=light";
    el.type = "text/html";
    el.frameborder = "0";
    el.style.border = "none";
    el.allowfullscreen = true;
    $('.fourth-block .play-video-container').hide();
    $('.fourth-block .video-container').append(el);
    parent = $(this).parent().parent();
    $('.fourth-block .video-container').addClass('video-active');
    return $('.fourth-block .video-container').find('.close-video-button').click(function() {
      $('.fourth-block').find('.video-container').removeClass('video-active');
      $('.fourth-block .video-container iframe').remove();
      return $('.fourth-block .play-video-container').show();
    });
  });
};

setSecondBlockContentPosition = function() {
  var h;
  if ($(document).width() <= 768) {
    $('.second-block ul li').removeClass('active');
    return;
  }
  h = $('.second-block ul').height();
  return $('.tab-block').css('top', h + 'px');
};

initTabsNav();

initFourthBlockVideo();

setSecondBlockContentPosition();

$(window).resize(function() {
  return setSecondBlockContentPosition();
});
