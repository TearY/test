var InitMap;
InitMap = (function() {
    function a(d, c, b) {
        this.markers = [];
        this.infoWindows = [];
        this.mapOptions = {zoom: 10,scrollwheel: false,mapTypeControl: false,zoomControl: true,panControl: false,streetViewControl: false,zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL,position: google.maps.ControlPosition.TOP_LEFT},center: new google.maps.LatLng(0, 0)};
        if ((c.lat != null) && (c.lng != null)) {
            this.mapOptions.center = new google.maps.LatLng(c.lat, c.lng)
        }
        if (c.zoom != null) {
            this.mapOptions.zoom = c.zoom
        }
        if (b) {
            this.mapOptions = $.extend({}, this.mapOptions, b)
        }
        this.map = new google.maps.Map(d, this.mapOptions)
    }
    a.prototype.addMarker = function(f, c, d) {
        var b, e;
        e = new google.maps.LatLng(f, c);
        b = new google.maps.Marker({position: e,map: this.map,lat: f,lng: c,icon: "./static/img/locate-facility/icons/" + d + ".png",info: {type: d,icon: "./static/img/locate-facility/icons/" + d + ".png"}});
        this.markers.push(b);
        return b
    };
    a.prototype.setZoom = function(b) {
        return this.map.setZoom(b)
    };
    a.prototype.setCenter = function(c, b) {
        return this.map.setCenter(new google.maps.LatLng(c, b))
    };
    a.prototype.removeAllMarkers = function() {
        var b, e, c, d;
        this.hideAllMarkers();
        d = this.markers;
        for (e = 0, c = d.length; e < c; e++) {
            b = d[e];
            b.setMap(null)
        }
        return this.markers = []
    };
    a.prototype.showAllMarkers = function() {
        var b, f, d, e, c;
        e = this.markers;
        c = [];
        for (f = 0, d = e.length; f < d; f++) {
            b = e[f];
            c.push(b.setVisible(true))
        }
        return c
    };
    a.prototype.hideAllMarkers = function() {
        var b, f, d, e, c;
        e = this.markers;
        c = [];
        for (f = 0, d = e.length; f < d; f++) {
            b = e[f];
            c.push(b.setVisible(false))
        }
        return c
    };
    a.prototype.showTypeMarkers = function(e) {
        var b, g, d, f, c;
        f = this.markers;
        c = [];
        for (g = 0, d = f.length; g < d; g++) {
            b = f[g];
            if ($.inArray(e, b.info.mul_type) > -1) {
                b.setZIndex(google.maps.Marker.MAX_ZINDEX + 10);
                c.push(b.setVisible(true))
            } else {
                c.push(void 0)
            }
        }
        return c
    };
    a.prototype.hideTypeMarkers = function(j) {
        var b, e, c, k, l, f, d, n, i, g;
        f = this.markers;
        d = [];
        for (e = 0, k = f.length; e < k; e++) {
            b = f[e];
            n = b.info.mul_type;
            if (n.length === 1) {
                if (b.info.type === j) {
                    b.setZIndex(google.maps.Marker.MAX_ZINDEX + 0);
                    d.push(b.setVisible(false))
                } else {
                    d.push(void 0)
                }
            } else {
                g = true;
                for (c = 0, l = n.length; c < l; c++) {
                    i = n[c];
                    i = i.toUpperCase();
                    if ($("#" + i + "_type").is(":checked")) {
                        g = false;
                        break
                    }
                }
                if (g) {
                    b.setZIndex(google.maps.Marker.MAX_ZINDEX + 0);
                    d.push(b.setVisible(false))
                } else {
                    d.push(void 0)
                }
            }
        }
        return d
    };
    a.prototype.removeMarker = function(b) {
        var g, f, c, d, e;
        g = [];
        e = this.markers;
        for (f = 0, c = e.length; f < c; f++) {
            d = e[f];
            if (d !== b) {
                g.push(d)
            } else {
                b.setMap(null)
            }
        }
        return this.markers = g
    };
    a.prototype.getByLatLng = function(h, d) {
        var g, f, b, c, e;
        g = new google.maps.LatLng(h, d);
        e = this.markers;
        for (f = 0, b = e.length; f < b; f++) {
            c = e[f];
            if (c.lat === h && c.lng === d) {
                return c
            }
        }
        return null
    };
    a.prototype.getVisibleMarkers = function() {
        var b;
        return (function() {
            var f, d, e, c;
            e = this.markers;
            c = [];
            for (f = 0, d = e.length; f < d; f++) {
                b = e[f];
                if (b.visible === true) {
                    c.push(b)
                }
            }
            return c
        }).call(this)
    };
    a.prototype.getHiddenMarkers = function() {
        var b;
        return (function() {
            var f, d, e, c;
            e = this.markers;
            c = [];
            for (f = 0, d = e.length; f < d; f++) {
                b = e[f];
                if (b.visible === false) {
                    c.push(b)
                }
            }
            return c
        }).call(this)
    };
    a.prototype.getMarkers = function() {
        return this.markers
    };
    a.prototype.buildMarkerFromApi = function(l) {
        var g, c, h, i, o, m, d, k, n, b, e, j;
        h = null;
        if (l.type.length === 1) {
            j = l.type[0]
        } else {
            j = "mul"
        }
        h = this.addMarker(l.latitude, l.longitude, j);
        if (h === null) {
            return
        }
        h.info.mul_type = l.type;
        h.info.official_name = l.name;
        h.info.street = l.address;
        h.info.city = l.city;
        h.info.state = l.state;
        h.info.zip = l.zip;
        h.info.url = l.moreinfo ? l.moreinfo.url : "";
        h.info.url_title = l.moreinfo ? l.moreinfo.title : "";
        h.info.direction_url = l.direction ? l.direction.url : "";
        h.info.direction_title = l.direction ? l.direction.title : "";
        h.info.imageURL = l.imageURL;
        h.info.imageAlt = l.imageAlt;
        g = '<div class="infoBox">';
        if (l.type.length === 1) {
            g += '<div class="toolTypeMapTDtitle type-##type##"><p>##type_name##</p></div>'
        }
        if (l.imageURL.length) {
            g += '<div class="toolTypeMapImg"><img src ="##imageURL##" width="120px" onload="$(\".toolTypeMapTDtitle\").find(\"p\").height($(this).height())" alt="##imageAlt##"/></div>'
        }
        g += '<div class="toolTypeMapTDtext"><p><span class="bold">##official_name##</span><span class="facility-address">##street##<br>##city##, ##state## ##zip##</span>';
        if (h.info.direction_url) {
            g += '<br><a href="##directionurl##" class="view-more" target="_blank">##directiontitle##</a>'
        }
        if (h.info.url) {
            g += '<br><a href="##url##" class="moreinfo">##urltext## &gt;</a>'
        }
        g += "</p>";
        if (l.type.length > 1) {
            g += "<p class='facility-type'>";
            e = l.type;
            for (d = 0, n = e.length; d < n; d++) {
                o = e[d];
                g += '<span class="type-' + o + '">' + o + "</span>"
            }
            g += "</p>"
        }
        g += "</div></div>";
        g = g.replace("##type_name##", h.info.type[0].toUpperCase());
        g = g.replace("##type##", h.info.type);
        g = g.replace("##official_name##", h.info.official_name);
        g = g.replace("##street##", h.info.street);
        g = g.replace("##city##", h.info.city);
        g = g.replace("##state##", h.info.state);
        g = g.replace("##zip##", h.info.zip);
        g = g.replace("##url##", h.info.url);
        g = g.replace("##urltext##", h.info.url_title);
        g = g.replace("##directionurl##", h.info.direction_url);
        g = g.replace("##directiontitle##", h.info.direction_title);
        g = g.replace("##imageURL##", h.info.imageURL);
        g = g.replace("##imageAlt##", h.info.imageAlt);
        c = new google.maps.InfoWindow({content: g});
        this.infoWindows.push(c);
        b = this.map;
        k = this.infoWindows;
        google.maps.event.addListener(h, "click", function() {
            var p, q, f;
            for (q = 0, f = k.length; q < f; q++) {
                p = k[q];
                p.close()
            }
            c.open(b, h);
            return b.setCenter(new google.maps.LatLng(l.latitude, l.longitude))
        });
        if (l.shouldOpen) {
            setTimeout((function() {
                return c.open(b, h)
            }), 3000)
        }
        return h
    };
    return a
})();
