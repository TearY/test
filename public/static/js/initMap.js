var InitMap;

InitMap = (function() {
  function InitMap(el, options, forcedOptions) {
    this.markers = [];
    this.infoWindows = [];
    this.mapOptions = {
      zoom: 10,
      scrollwheel: false,
      mapTypeControl: false,
      zoomControl: true,
      panControl: false,
      streetViewControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.TOP_LEFT
      },
      center: new google.maps.LatLng(0, 0)
    };
    if ((options.lat != null) && (options.lng != null)) {
      this.mapOptions.center = new google.maps.LatLng(options.lat, options.lng);
    }
    if (options.zoom != null) {
      this.mapOptions.zoom = options.zoom;
    }
    if (forcedOptions) {
      this.mapOptions = $.extend({}, this.mapOptions, forcedOptions);
    }

    //Initialise Geocoder API
    geocoder = new google.maps.Geocoder();
    this.map = new google.maps.Map(el, this.mapOptions);
  }

  InitMap.prototype.addMarker = function(lat, lng, type) {
    var content_type, marker, p;
    content_type = type;
    if ($('html').attr('lang') === "es") {
      if (type === 'ah') {
        type = 'ah_es';
      }
      if (type === 'm') {
        type = 'm_es';
      }
      if (type === 'p') {
        type = 'p_es';
      }
    }
    p = new google.maps.LatLng(lat, lng);
    marker = new google.maps.Marker({
      position: p,
      map: this.map,
      lat: lat,
      lng: lng,
      icon: {url:"./static/img/locate-facility/icons/" + type + ".png",size:new google.maps.Size(35, 41)},
      info: {
        type: content_type,
        icon: "./static/img/locate-facility/icons/" + type + ".png"
      }
    });
    this.markers.push(marker);
    return marker;
  };

  InitMap.prototype.setZoom = function(z) {
    return this.map.setZoom(z);
  };

  InitMap.prototype.setCenter = function(lat, lng) {
    return this.map.setCenter(new google.maps.LatLng(lat, lng));
  };

  InitMap.prototype.removeAllMarkers = function() {
    var m, _i, _len, _ref;
    this.hideAllMarkers();
    _ref = this.markers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      m = _ref[_i];
      m.setMap(null);
    }
    return this.markers = [];
  };

  InitMap.prototype.showAllMarkers = function() {
    var m, _i, _len, _ref, _results;
    _ref = this.markers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      m = _ref[_i];
      _results.push(m.setVisible(true));
    }
    return _results;
  };

  InitMap.prototype.hideAllMarkers = function() {
    var m, _i, _len, _ref, _results;
    _ref = this.markers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      m = _ref[_i];
      _results.push(m.setVisible(false));
    }
    return _results;
  };

  InitMap.prototype.showTypeMarkers = function(type) {
    var m, _i, _len, _ref, _results;
    _ref = this.markers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      m = _ref[_i];
      if (m.info.type === type) {
        _results.push(m.setVisible(true));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  InitMap.prototype.hideTypeMarkers = function(type) {
    var m, _i, _len, _ref, _results;
    _ref = this.markers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      m = _ref[_i];
      if (m.info.type === type) {
        _results.push(m.setVisible(false));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  InitMap.prototype.removeMarker = function(m) {
    var n_marker, _i, _len, _m, _ref;
    n_marker = [];
    _ref = this.markers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      _m = _ref[_i];
      if (_m !== m) {
        n_marker.push(_m);
      } else {
        m.setMap(null);
      }
    }
    return this.markers = n_marker;
  };

  InitMap.prototype.getByLatLng = function(lat, lng) {
    var p, _i, _len, _m, _ref;
    p = new google.maps.LatLng(lat, lng);
    _ref = this.markers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      _m = _ref[_i];
      if (_m.lat === lat && _m.lng === lng) {
        return _m;
      }
    }
    return null;
  };

  InitMap.prototype.getVisibleMarkers = function() {
    var m;
    return (function() {
      var _i, _len, _ref, _results;
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        if (m.visible === true) {
          _results.push(m);
        }
      }
      return _results;
    }).call(this);
  };

  InitMap.prototype.getHiddenMarkers = function() {
    var m;
    return (function() {
      var _i, _len, _ref, _results;
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        if (m.visible === false) {
          _results.push(m);
        }
      }
      return _results;
    }).call(this);
  };

  InitMap.prototype.getMarkers = function() {
    return this.markers;
  };

  InitMap.prototype.buildMarkerFromApi = function(f) {
    var contentString, infowindow, marker, open, t, type, _i, _infoWindows, _len, _map, _ref;
    marker = null;
    f.type = "M";
    if (f.facility_type === 'Medical Office Building') {
      marker = this.addMarker(f.loc[1], f.loc[0], 'm');
    }
    if (f.facility_type.match(/hospital/i)) {
      marker = this.addMarker(f.loc[1], f.loc[0], 'h');
    }
    if (f.facility_type === 'Urgent Care Center') {
     
      marker = this.addMarker(f.loc[1], f.loc[0], 'ah');
    }
    if (f.facility_type === 'Other') {
      marker = this.addMarker(f.loc[1], f.loc[0], 'a');
    }
    if (f.facility_type === 'Pharmacy') {
      marker = this.addMarker(f.loc[1], f.loc[0], 'p');
    }
    if (marker === null) {
      return;
    }
    marker.info.official_name = f.official_name;
    marker.info.street = f.address.street;
    marker.info.city = f.address.city;
    marker.info.state = f.address.state;
    marker.info.zip = f.address.zip;
    marker.info.url = f.url;
    marker.info.type = f.type;
    marker.info.imageURL = f.imageURL;
    marker.info.imageAlt = f.imageAlt;
    contentString = '' + '<div class="infoBox">';
    if (f.type && f.type.length === 1) {
      contentString += '<div class="toolTypeMapTDtitle type-##type##"><p>##type_name##</p></div>';
    }
    contentString += '<div class="toolTypeMapImg"><img src ="##imageURL##" width="120px" alt="##imageAlt##" onload="$(\".toolTypeMapTDtitle\").find(\"p\").height($(this).height())"/></div>' + '<div class="toolTypeMapTDtext">' + '<p>' + '<span class="bold">##official_name##</span><br>' + '<span class="facility-address">##street##<br>' + '##city##, ##state## ##zip##</span><br>';
    if (marker.info.url) {
      contentString += '<a class="view-more" href="##url##" target="_blank">View details</a>';
    }
    contentString += '</p>';
    if (f.type && f.type.length > 1) {
      contentString += '<p class="facility-type">';
      _ref = f.type;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        t = _ref[_i];
        contentString += '<span class="type-"' + t + '>' + t + '</span>';
      }
      contentString += '</p>';
    }
    '</div>' + '</div>';
    type = marker.info.type;
    if ($('html').attr('lang') === "es") {
      if (type === 'ah') {
        type = 'c';
      }
      if (type === 'm') {
        type = 'e';
      }
      if (type === 'p') {
        type = 'f';
      }
    }
    contentString = contentString.replace('##type_name##', "M");
    contentString = contentString.replace('##type##', marker.info.type);
    contentString = contentString.replace('##official_name##', marker.info.official_name);
    contentString = contentString.replace('##street##', marker.info.street);
    contentString = contentString.replace('##city##', marker.info.city);
    contentString = contentString.replace('##state##', marker.info.state);
    contentString = contentString.replace('##zip##', marker.info.zip);
    contentString = contentString.replace('##url##', marker.info.url);
    contentString = contentString.replace('##imageURL##', marker.info.imageURL);
    contentString = contentString.replace('##imageAlt##', marker.info.imageAlt);
    infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    this.infoWindows.push(infowindow);
    _map = this.map;
    _infoWindows = this.infoWindows;
    open = function() {
      var i, _j, _len1;
      for (_j = 0, _len1 = _infoWindows.length; _j < _len1; _j++) {
        i = _infoWindows[_j];
        i.close();
      }
      infowindow.open(_map, marker);
      return _map.setCenter(new google.maps.LatLng(f.loc[1], f.loc[0]));
    };
    google.maps.event.addListener(marker, 'click', function() {
      return open();
    });
    if (f.shouldOpen) {
      setTimeout((function() {
        return infowindow.open(_map, marker);
      }), 3000);
    }
    return marker;
  };

  return InitMap;

})();
