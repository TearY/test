var SwipeDots, buildResultBlock, countPages, el, getDistance, initMapLocation, locateFacilities, mobileDetectMap, _i, _j, _len, _len1, _ref, _ref1;

_ref = $('.slide-bottom-text a[target="_blank"]').get();
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  el = _ref[_i];
  $(el).addClass('is-external');
}

mobileDetectMap = function() {
  if ($(document).width() > 768) {
    return;
  }
  $('.map-container-map').addClass('list-only');
  return $('.map-layer-display ul li[data-type="list"]').click();
};

SwipeDots = function(el) {
  var k, options, s, s_el, swipe_entity, _j, _len1, _ref1;
  s_el = $(el).find('.swipe').get(0);
  if ($(s_el).find('.swipe-wrap > div').get().length > 1) {
    _ref1 = $(s_el).find('.swipe-wrap > div').get();
    for (k = _j = 0, _len1 = _ref1.length; _j < _len1; k = ++_j) {
      s = _ref1[k];
      $(el).find('.dots').append("<div class='dot' data-id='" + k + "'></div>");
    }
    $(el).find('.dots .dot').eq(0).addClass('active');
  } else {
    $(el).find('.dots').hide();
    $(el).find('.go-next, .go-prev').hide();
  }
  $('.slide-bottom-text').eq(0).show();
  options = {
    speed: 400,
    continuous: true,
    disableScroll: false,
    stopPropagation: false,
    total_slide: $(s_el).find('.swipe-wrap > div').get().length,
    callback: function(index, elem) {
      index = index % this.total_slide;
      $(el).find('.dots .dot').removeClass('active');
      $(el).find('.dots .dot').eq(index).addClass('active');
      $('.slide-bottom-text').hide();
      $('.slide-bottom-text').eq(index).show();
    }
  };
  swipe_entity = Swipe(s_el, options);
  $(el).find('.dots .dot').click(function() {
    var id;
    id = parseInt($(this).attr('data-id'));
    return swipe_entity.slide(id);
  });
  $(el).find('.go-next, .nav-right').click(function(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    return swipe_entity.next();
  });
  return $(el).find('.go-prev, .nav-left').click(function(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    return swipe_entity.prev();
  });
};

_ref1 = $('.slider-container').get();
for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
  el = _ref1[_j];
  SwipeDots(el);
}

window.locations_pager = null;

countPages = function(len) {
  var pages;
  pages = ~~(len / 10);
  if (len % 10 !== 0) {
    pages++;
  }
  return pages;
};

buildResultBlock = function(markers, page) {
  var blocks, cpt, i, k, list_markers_page, m, markers_length, tpl, v, _k, _l, _len2, _len3, _ref2;
  if (page == null) {
    page = null;
  }
  blocks = "";
  list_markers_page = [];
  $('.map-list-location-container .map-list-location-results span').html(markers.length);
  if (page === null) {
    list_markers_page = markers;
  } else {
    cpt = 0;
    for (i = _k = 0, _len2 = markers.length; _k < _len2; i = ++_k) {
      m = markers[i];
      if (cpt < 10 && i >= page * 10 && i < (page + 1) * 10) {
        list_markers_page.push(m);
      }
    }
  }
  markers_length = list_markers_page.length;
  for (i = _l = 0, _len3 = list_markers_page.length; _l < _len3; i = ++_l) {
    m = list_markers_page[i];
    if (page === null) {
      tpl = $('[template-name="map-list-location-block"]').html();
    } else {
      tpl = $('[template-name="map-list-location-block-list-only"]').html();
    }
    _ref2 = m.info;
    for (k in _ref2) {
      v = _ref2[k];
      tpl = tpl.replace("##" + k + "##", v);
    }
    blocks += tpl;
    if (i + 1 < markers_length) {
      blocks += "<li class='black-line'><div class='black-line-content'></div></li>";
    }
  }
  $('.map-list-location-container ul').html(blocks);
  $('.nav-block .go-previous').hide();
  $('.nav-block .go-next').hide();
  if (page === null) {
    return;
  }
  if (page !== 0) {
    $('.nav-block .go-previous').show();
  }
  if ((page + 1) < countPages(markers.length)) {
    return $('.nav-block .go-next').show();
  }
};

$('.nav-block .go-previous').click(function() {
  var prev_page;
  $('html, body').scrollTop($('.map-container-map').offset().top - 100);
  prev_page = window.locations_pager - 1;
  if (prev_page < 0) {
    prev_page = 0;
  }
  window.locations_pager = prev_page;
  return buildResultBlock(window.gmap.getVisibleMarkers(), window.locations_pager);
});

$('.nav-block .go-next').click(function() {
  var len, next_page;
  $('html, body').scrollTop($('.map-container-map').offset().top - 100);
  len = window.gmap.getVisibleMarkers().length;
  next_page = window.locations_pager + 1;
  if (next_page < countPages(len)) {
    window.locations_pager = next_page;
  }
  return buildResultBlock(window.gmap.getVisibleMarkers(), window.locations_pager);
});

locateFacilities = function(searchOptions, name) {
  var name_re;
  if (name == null) {
    name = null;
  }
  if (name === null) {
    name = ".*";
  }
  name_re = new RegExp("" + name, "gi");
  window.gmap.removeAllMarkers();
  $('form.find-facility-form input').prop('disabled', true);
  $('form.find-facility-form .custom-select').addClass('disabled');
  $('.map-container-facility-search button').addClass('disabled').html("Searching ...");
  searchOptions.action = "LocatorFacility";
  return $.ajax({
    type: "POST",
    url: '/wp-admin/admin-ajax.php',
    dataType: 'json',
    data: searchOptions,
    success: function(resp) {
      var KP, avg_lat, avg_lng, cpt, f, m, t, tab_array, type, _k, _l, _len2, _len3, _len4, _m, _ref2, _ref3;
      $('form.find-facility-form input').prop('disabled', false);
      $('form.find-facility-form .custom-select').removeClass('disabled');
      tab_array = [];
      if (window.locations_pager !== null || $(document).width() <= 768) {
        window.locations_pager = 0;
      }
      if (resp.response) {
        KP = eval('(' + resp.response + ')');
        if (KP.KPFacilities != null) {
          tab_array = KP.KPFacilities;
        }
      }
      cpt = 0;
      avg_lat = 0.0;
      avg_lng = 0.0;
      for (_k = 0, _len2 = tab_array.length; _k < _len2; _k++) {
        f = tab_array[_k];
        avg_lat += f.loc[1];
        avg_lng += f.loc[0];
        window.gmap.buildMarkerFromApi(f);
        cpt++;
      }
      if (cpt > 0) {
        window.gmap.setCenter(avg_lat / cpt, avg_lng / cpt);
        if (searchOptions.distance >= 100) {
          window.gmap.setZoom(6);
        } else {
          window.gmap.setZoom(9);
        }
      }
      _ref2 = $('.map-container-facility-type .map-container-facility-type-td').get();
      for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
        type = _ref2[_l];
        t = $(type).attr('data-type');
        if (!$(type).hasClass('active')) {
          window.gmap.hideTypeMarkers(t);
        }
      }
      _ref3 = window.gmap.getVisibleMarkers();
      for (_m = 0, _len4 = _ref3.length; _m < _len4; _m++) {
        m = _ref3[_m];
        if (!m.info.official_name.match(name_re)) {
          m.setVisible(false);
        }
      }
      buildResultBlock(window.gmap.getVisibleMarkers(), window.locations_pager);
      if ($('html').attr('lang') === "en") {
        $('.map-container-facility-search button').removeClass('disabled').html("Locate a Facility");
      } else {
        $('.map-container-facility-search button').removeClass('disabled').html("Centros de atención");
      }
    }
  });
};

$('select.distance-input').change(function() {
  var v;
  v = $(this).val();
  return $(this).parent().find('span').html(v);
});

getDistance = function() {
  return parseInt($('select.distance-input').val());
};

$('form.find-facility-form').submit(function(ev) {
  var distance, name, zip,latitude, longitude;
  ev.preventDefault();
  ev.stopPropagation();
  $('.map-container-error-message').hide();
  if ($('.map-container-facility-search button').hasClass('disabled')) {
    return;
  }
  zip = $('input.zip-input').val();
  name = $('input.name-input').val();
  if (name === '') {
    name = null;
  }
  if (zip === '') {
    $('.map-container-error-message').show();
    return;
  }

  geocoder.geocode( { 'address': $('input.zip-input').val()}, function(results, status) {

   if (status == google.maps.GeocoderStatus.OK) {
     latitude = results[0].geometry.location.lat();
      longitude = results[0].geometry.location.lng();
    } else {
      latitude = '';
     longitude = '';
    }
  
  distance = getDistance();
  return locateFacilities({
    zip: zip,
    distance: distance,
    longitude:longitude,
    latitude:latitude
  }, name);
});
})

initMapLocation = function() {
  var GetLocation;
  if ($('#map').get().length === 0) {
    return;
  }
  window.gmap = new InitMap(document.querySelector("#map"), {
    lat: 38.928406,
    lng: -104.83415,
    zoom: 4
  });
  return;
  if (navigator.geolocation.getCurrentPosition == null) {
    return window.gmap = new InitMap(document.querySelector("#map"), {
      lat: 38.928406,
      lng: -104.83415,
      zoom: 7
    });
  } else {
    GetLocation = function(location) {
      var lat, lng;
      lat = location.coords.latitude;
      lng = location.coords.longitude;
      window.gmap = new InitMap(document.querySelector("#map"), {
        lat: 0,
        0: lng,
        zoom: 2
      });
      return locateFacilities({
        latitude: lat,
        longitude: lng,
        distance: getDistance()
      });
    };
    return navigator.geolocation.getCurrentPosition(GetLocation);
  }
};

initMapLocation();

$('.map-container-facility-type .map-container-facility-type-td input').click(function(ev) {
  var t;
  t = $(this).parent().attr('data-type');
  $(this).parent().toggleClass('active');
  if ($(this).parent().hasClass('active')) {
    $(this).prop('checked', true);
  } else {
    $(this).prop('checked', false);
  }
  if ($(this).is(":checked")) {
    window.gmap.showTypeMarkers(t);
  } else {
    window.gmap.hideTypeMarkers(t);
  }
  if ($(document).width() <= 768) {
    window.locations_pager = 0;
  }
  return buildResultBlock(window.gmap.getVisibleMarkers(), window.locations_pager);
});

$('.map-layer-display ul li').click(function() {
  var t;
  t = $(this).attr('data-type');
  $('.map-layer-display ul li').removeClass('active');
  $(this).addClass('active');
  if (t === "list") {
    $('.map-container-map').addClass('list-only');
    window.locations_pager = 0;
    return buildResultBlock(window.gmap.getVisibleMarkers(), window.locations_pager);
  } else {
    window.locations_pager = null;
    buildResultBlock(window.gmap.getVisibleMarkers(), window.locations_pager);
    return $('.map-container-map').removeClass('list-only');
  }
});

mobileDetectMap();

$(window).resize(function() {
  return mobileDetectMap();
});
