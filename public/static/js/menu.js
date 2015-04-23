$(document).ready(function() {
  var anchorOverride, changeLastWord, initMapSelector, menuState;
  $('header nav ul.menu-line > li').hover(function() {
    var is_active;
    if ($(document).width() <= 960) {
      return;
    }
    is_active = $(this).hasClass('active');
    $('header nav ul.menu-line li').removeClass('active');
    return $(this).addClass('active');
  }, function() {
    return $('header nav ul.menu-line li').removeClass('active');
  });
  $(window).scroll(function() {
    var o_t, post;
    if ($(document).width() <= 768 || $("#notice").length > 0) {
      return;
    }
    post = $(document).scrollTop();
    if (post > 50) {
      $('header').addClass('page-scolled');
    } else {
      $('header').removeClass('page-scolled');
    }
    if ($('.gb-top-block').get().length > 0) {
      o_t = $('.gb-top-block').offset().top;
      post -= o_t;
      if (post < 0) {
        post = 0;
      }
      return $('.gb-top-block').css('background-position', "0 " + (post * 0.3) + "px");
    }
  });
  $('header button.mobile-menu, nav.mobile-menu .close-mobile-menu').click(function() {
    $('.offcanvas-container').toggleClass('menu-active');
    return $('nav.mobile-menu').toggleClass('menu-active');
  });
  changeLastWord = function(str, word) {
    var newStr, words;
    words = str.split('-');
    newStr = str;
    if (words.length) {
      newStr = words[0] + '- ' + word;
    }
    return newStr;
  };
  menuState = 'closed';
  $('header button.mobile-menu').click(function() {
    if (menuState === 'closed') {
      menuState = 'open';
    } else {
      menuState = 'closed';
    }
    return $(this).attr('title', changeLastWord($(this).attr('title'), menuState));
  });
  $('nav.mobile-menu ul.menu-line li button').click(function() {
    if (!$(this).parent().hasClass('selected')) {
      $('nav.mobile-menu ul.menu-line li ol').slideUp();
      $('nav.mobile-menu ul.menu-line li.selected').removeClass('selected');
    }
    $(this).parent().toggleClass('selected');
    if ($(this).parent().hasClass('selected')) {
      $(this).parent().find('ol').slideDown();
      return $(this).attr('title', changeLastWord($(this).attr('title'), 'open'));
    } else {
      $(this).parent().find('ol').slideUp();
      return $(this).attr('title', changeLastWord($(this).attr('title'), 'closed'));
    }
  });
  $('nav.mobile-menu a').click(function() {
    return $('nav.mobile-menu .close-mobile-menu').click();
  });
  $('nav.mobile-menu ul.menu-line li.selected button').click().click();
  $('.back-to-top a').click(function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    return $(window).scrollTop(0);
  });
  initMapSelector = function() {
    $('.select-container button.select-region-button').click(function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      $(this).parent().find('ul').toggleClass('active');
      return $(this).parent().find('.ul-bg').toggleClass('active');
    });
    return $('.select-container .ul-bg').click(function() {
      return $(this).closest('.select-container').find('button.select-region-button').click();
    });
  };
  anchorOverride = function(url) {
    var el, hash, _i, _len, _ref;
    if (url == null) {
      url = null;
    }
    if (url === null) {
      if (window.location.hash == null) {
        return;
      }
      hash = window.location.hash.replace("#", "");
    } else {
      hash = url.replace(/.*#/, "").replace("#", "");
    }
    _ref = $('[anchor-name="' + hash + '"]').get();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      el = _ref[_i];
      $('html,body').scrollTop($(el).offset().top - 60);
      return;
    }
  };
  $('a[href]').click(function(ev) {
    var url;
    url = $(this).attr('href');
    if (!url.match(/^#/)) {
      return;
    }
    return anchorOverride(url);
  });
  anchorOverride();
  return initMapSelector();
});

$(document).ready(function() {
  var $doc, $kaiser, $locationLink, $locations;
  $doc = $(document);
  $kaiser = $('.kaiser');
  $locationLink = $('.location-push-down-link');
  $locations = $('.location-push-down');
  $('.location-push-down-link').click(function(ev) {
    var self;
    self = $(this);
    if (self.hasClass('location-push-down-link--active')) {
      $kaiser.removeClass('pushed-down');
      self.removeClass('location-push-down-link--active');
      setTimeout((function() {
        return $locations.hide();
      }), 300);
    } else {
      $locations.show();
      $kaiser.addClass('pushed-down');
      self.addClass('location-push-down-link--active');
    }
    return false;
  });
  return $(window).resize(function() {
    if ($doc.width() <= 960 && $kaiser.hasClass('pushed-down')) {
      $kaiser.removeClass('pushed-down');
      $locationLink.removeClass('location-push-down-link--active');
    }
    if ($doc.width() <= 960) {
      return;
    }
    return $('header').removeClass('page-scolled');
  });
});
