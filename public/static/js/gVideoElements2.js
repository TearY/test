var Notice, initSelectedSlide, initVideoSelector, modifyThumbailPos;

modifyThumbailPos = function(id) {
  var bp, ew, mw;
  mw = $('.g-video-elements .video-selector').width();
  ew = 280;
  bp = ~~(mw / ew);
  bp = ~~(bp / 2) - 1;
  if (((id + 1) * ew) > (mw / 2)) {
    return $('.g-video-elements .slider-container').animate({
      'scrollLeft': (id * ew) - (mw / 2) + (ew / 2)
    });
  } else {
    return $('.g-video-elements .slider-container').animate({
      'scrollLeft': 0
    });
  }
};

initVideoSelector = function() {
  var c;
  if ($('.g-video-elements .video-selector').attr('data-ads')) {
    return;
  }
  c = $('.g-video-elements .video-selector td').get().length;
  return $('.g-video-elements .video-selector table').width(c * 240);
};

initSelectedSlide = function() {
  var el, k, step, _i, _len, _ref;
  if ($('.g-video-elements .video-selector').attr('data-ads')) {
    step = 220;
    $('.g-video-elements .go-next, .g-video-elements .go-prev').click(function(ev) {
      var index, items;
      ev.stopPropagation();
      ev.preventDefault();
      items = $('.g-video-elements .video-selector td').length;
      if ($(this).hasClass('go-next')) {
        index = Math.floor($('.g-video-elements .slider-container').scrollLeft() / step);
        index = index + 1;
      } else {
        index = Math.ceil($('.g-video-elements .slider-container').scrollLeft() / step);
        index = index - 1;
      }
      if ($('.g-video-elements .slider-container').scrollLeft() + $('.g-video-elements .video-selector').width() === items * step && $(this).hasClass('go-next')) {
        index = 0;
      }
      if (index < 0) {
        index = items - 1;
      }
      return $('.g-video-elements .slider-container').animate({
        'scrollLeft': index * step
      });
    });
    $('.g-video-elements .go-prev').click(function(ev) {
      ev.stopPropagation();
      return ev.preventDefault();
    });
    return;
  }
  _ref = $('.g-video-elements .video-selector td').get();
  for (k = _i = 0, _len = _ref.length; _i < _len; k = ++_i) {
    el = _ref[k];
    $(el).attr('data-id', k);
  }
  $('.g-video-elements .video-selector td').click(function() {
    var id;
    id = $(this).attr('data-id');
    modifyThumbailPos(id);
    $('.g-video-elements .video-container iframe').remove();
    $('.g-video-elements .video-selector td').removeClass('active');
    $('.g-video-elements .video-selector td').eq(id).addClass('active');
    $('.g-video-elements .data-container').removeClass('active');
    $('.g-video-elements .data-container').eq(id).addClass('active');
    return $('.g-video-elements .video-container').removeClass('video-active');
  });
  $('.g-video-elements .video-selector td').eq(0).click();
  modifyThumbailPos(0);
  $('.g-video-elements .go-next').click(function(ev) {
    var c, id;
    ev.stopPropagation();
    ev.preventDefault();
    id = $('.g-video-elements .video-selector td.active').attr('data-id');
    c = $('.g-video-elements .video-selector td').get().length;
    id = (parseInt(id) + 1) % c;
    return $('.g-video-elements .video-selector td').eq(id).click();
  });
  return $('.g-video-elements .go-prev').click(function(ev) {
    var c, id;
    ev.stopPropagation();
    ev.preventDefault();
    id = $('.g-video-elements .video-selector td.active').attr('data-id');
    c = $('.g-video-elements .video-selector td').get().length;
    id = parseInt(id) - 1;
    if (id < 0) {
      id = c - 1;
    }
    return $('.g-video-elements .video-selector td').eq(id).click();
  });
};

initVideoSelector();

initSelectedSlide();

$('.g-video-elements .play-video').click(function(ev) {
  var el, video_url;
  ev.stopPropagation();
  ev.preventDefault();
  video_url = $(this).attr('data-src');
  $('.g-video-elements .video-container iframe').attr("src", video_url);
  $('.g-video-elements .video-container iframe').show();
  el = document.createElement('iframe');
  el.src = "https://www.youtube.com/embed/" + video_url + "?autoplay=1&enablejsapi=1&rel=0&showinfo=0&autohide=1&color=white&theme=light";
  el.type = "text/html";
  el.width = "960";
  el.height = "440";
  el.style.border = "none";
  el.frameborder = "0";
  el.allowfullscreen = true;
  $('.g-video-elements .video-container').append(el);
  return $('.g-video-elements .video-container').addClass('video-active');
});

$('.g-video-elements .close-video-button').click(function() {
  $('.g-video-elements .video-container').removeClass('video-active');
  return $('.g-video-elements .video-container iframe').remove();
});

$('.g-video-elements-mobile .close-video-button').click(function() {
  $('.g-video-elements-mobile .g-video-elements-mobile-video-container iframe').remove();
  return $('.g-video-elements-mobile .g-video-elements-mobile-video-container').hide();
});

$(window).resize(function() {
  return initVideoSelector();
});

$(window).scroll(function() {
  return Notice.closeNotice();
});

Notice = {
  openNotice: function() {
    $("header").addClass("notice-top");
    $("#maincontent").css("padding-top", "256px");
    return $("#notice").show();
  },
  closeNotice: function() {
    var paddingTop;
    if ($("#notice").css("display") === "none") {
      return;
    }
    $("#notice").hide();
    $("header").removeClass("notice-top");
    paddingTop = $(window).width();
    paddingTop = paddingTop > 400 ? 106 : 1;
    return $("#maincontent").css("padding-top", paddingTop + "px");
  }
};

Notice.openNotice();

$("#notice .close-img").click(function() {
  return Notice.closeNotice();
});
