var createMap;

createMap = function(selector) {
  var $map, data, gmap, lat, lon, marker;
  $map = $(selector);
  lat = $map.attr('data-lat');
  lon = $map.attr('data-lon');
  if (!$map.length || !lat || !lon) {
    return;
  }
  data = {
    loc: [lon, lat],
    facility_type: $map.attr('data-facility_type'),
    official_name: $map.attr('data-official_name'),
    address: {
      street: $map.attr('data-street'),
      city: $map.attr('data-city'),
      state: $map.attr('data-state'),
      zip: $map.attr('data-zip')
    },
    url: $map.attr('data-url'),
    shouldOpen: false
  };
  gmap = new InitMap($map[0], {
    lat: lat,
    lng: lon,
    zoom: 16
  }, {
    zoomControl: false,
    draggable: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    disableDefaultUI: true
  });
  return marker = gmap.buildMarkerFromApi(data);
};

createMap('#socal-map');
