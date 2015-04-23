$(function() {
    var a, i, p, c, j, k, r, o, g, e, l, b, h, d, n;
    h = $('.slide-bottom-text a[target="_blank"]').get();
    for (g = 0, l = h.length; g < l; g++) {
        c = h[g];
        $(c).addClass("is-external").append('<span class="external-link"><span class="icon-arrow-73"></span></span>')
    }
    o = function() {
        if ($(document).width() > 768) {
            return
        }
        $(".map-container-map").addClass("list-only");
        return $('.map-layer-display ul li[data-type="list"]').click()
    };
    a = function(v) {
        var y, B, A, z, t, x, u, w;
        z = $(v).find(".swipe").get(0);
        if ($(z).find(".swipe-wrap > div").get().length > 1) {
            w = $(z).find(".swipe-wrap > div").get();
            for (y = x = 0, u = w.length; x < u; y = ++x) {
                A = w[y];
                $(v).find(".dots").append("<div class='dot' data-id='" + y + "'></div>")
            }
            $(v).find(".dots .dot").eq(0).addClass("active")
        } else {
            $(v).find(".dots").hide();
            $(v).find(".go-next, .go-prev").hide()
        }
        $(".slide-bottom-text").eq(0).show();
        B = {speed: 400,continuous: true,disableScroll: false,stopPropagation: false,total_slide: $(z).find(".swipe-wrap > div").get().length,callback: function(s, C) {
                s = s % this.total_slide;
                $(v).find(".dots .dot").removeClass("active");
                $(v).find(".dots .dot").eq(s).addClass("active");
                $(".slide-bottom-text").hide();
                $(".slide-bottom-text").eq(s).show()
            }};
        t = Swipe(z, B);
        $(v).find(".dots .dot").click(function() {
            var s;
            s = parseInt($(this).attr("data-id"));
            return t.slide(s)
        });
        $(v).find(".go-next, .nav-right").click(function(s) {
            s.stopPropagation();
            s.preventDefault();
            return t.next()
        });
        return $(v).find(".go-prev, .nav-left").click(function(s) {
            s.stopPropagation();
            s.preventDefault();
            return t.prev()
        })
    };
    d = $(".slider-container").get();
    for (e = 0, b = d.length; e < b; e++) {
        c = d[e];
        a(c)
    }
    window.locations_pager = null;
    p = function(t) {
        var s;
        s = ~~(t / 10);
        if (t % 10 !== 0) {
            s++
        }
        return s
    };
    i = function(C, G) {
        var t, E, D, A, H, x, B, F, I, z, w, u, s, y;
        if (G == null) {
            G = null
        }
        t = "";
        H = [];
        $(".map-list-location-container .map-list-location-results span").html(C.length);
        if (G === null) {
            H = C
        } else {
            E = 0;
            for (D = z = 0, u = C.length; z < u; D = ++z) {
                x = C[D];
                if (E < 10 && D >= G * 10 && D < (G + 1) * 10) {
                    H.push(x)
                }
            }
        }
        B = H.length;
        for (D = w = 0, s = H.length; w < s; D = ++w) {
            x = H[D];
            if (G === null) {
                F = $('[template-name="map-list-location-block"]').html()
            } else {
                F = $('[template-name="map-list-location-block-list-only"]').html()
            }
            y = x.info;
            for (A in y) {
                I = y[A];
                if (A === "direction_title" || A === "url_title") {
                    continue
                }
                if (A === "url") {
                    if (I !== "" && I !== null && typeof (I) !== "undefined") {
                        F = F.replace("##url##", '<a href="' + I + '" class="moreinfo">' + y.url_title + " &gt;</a>")
                    } else {
                        F = F.replace("##" + A + "##", "")
                    }
                } else {
                    if (A === "direction_url") {
                        if (I !== "" && I !== null && typeof (I) !== "undefined") {
                            F = F.replace("##direction##", '<a href="' + I + '" target="_blank" class="view-more">' + y.direction_title + "</a>")
                        } else {
                            F = F.replace("##" + A + "##", "")
                        }
                    } else {
                        if (A === "mul_type") {
                            n = "";
                            if (I.length > 1) {
                                n += '<p class="types">';
                                for (g = 0, e = I.length; g < e; g++) {
                                    n += '<span class="type-' + I[g] + '">' + I[g] + "</span>"
                                }
                                n += "</p>"
                            }
                            F = F.replace("##" + A + "##", n)
                        } else {
                            F = F.replace("##" + A + "##", I)
                        }
                    }
                }
            }
            t += F;
            if (D + 1 < B) {
                t += "<li class='black-line'><div class='black-line-content'></div></li>"
            }
        }
        $(".map-list-location-container ul").html(t);
        $(".nav-block .go-previous").hide();
        $(".nav-block .go-next").hide();
        if (G === null) {
            return
        }
        if (G !== 0) {
            $(".nav-block .go-previous").show()
        }
        if ((G + 1) < p(C.length)) {
            return $(".nav-block .go-next").show()
        }
    };
    $(".nav-block .go-previous").click(function() {
        var s;
        $("html, body").scrollTop($(".map-container-map").offset().top - 100);
        s = window.locations_pager - 1;
        if (s < 0) {
            s = 0
        }
        window.locations_pager = s;
        return i(window.gmap.getVisibleMarkers(), window.locations_pager)
    });
    $(".nav-block .go-next").click(function() {
        var s, t;
        $("html, body").scrollTop($(".map-container-map").offset().top - 100);
        s = window.gmap.getVisibleMarkers().length;
        t = window.locations_pager + 1;
        if (t < p(s)) {
            window.locations_pager = t
        }
        return i(window.gmap.getVisibleMarkers(), window.locations_pager)
    });
    r = function(u, s) {
        var t;
        if (s == null) {
            s = null
        }
        if (s === null) {
            s = ".*"
        }
        t = new RegExp("" + s, "gi");
        window.gmap.removeAllMarkers();
        $("form.find-facility-form input").prop("disabled", true);
        $("form.find-facility-form .custom-select").addClass("disabled");
        $(".map-container-facility-search button").addClass("disabled").html("Searching ...");
        u.action = "LocateFacility";
        return $.ajax({url: './static/js/json.txt',dataType: "JSON",data: u,success: function(E) {
                var H, B, L, C, G, F, D, I, A, x, w, M, K, J, v, z, y;
                $("form.find-facility-form input").prop("disabled", false);
                $("form.find-facility-form .custom-select").removeClass("disabled");
                I = [];
                if (window.locations_pager !== null || $(document).width() <= 768) {
                    window.locations_pager = 0
                }
                if (E.status === 200) {
                    I = E.response
                }
                C = 0;
                B = 0;
                L = 0;
                for (x = 0, M = I.length; x < M; x++) {
                    G = I[x];
                    B += parseFloat(G.latitude);
                    L += parseFloat(G.longitude);
                    window.gmap.buildMarkerFromApi(G);
                    C++
                }
                if (C > 0) {
                    window.gmap.setCenter(B / C, L / C);
                    if (u.distance >= 100) {
                        window.gmap.setZoom(7)
                    } else {
                        window.gmap.setZoom(10)
                    }
                }
                z = $(".map-container-facility-type .map-container-facility-type-td").get();
                for (w = 0, K = z.length; w < K; w++) {
                    A = z[w];
                    D = $(A).attr("data-type");
                    if (!$(A).hasClass("active")) {
                        window.gmap.hideTypeMarkers(D)
                    }
                }
                y = window.gmap.getVisibleMarkers();
                for (v = 0, J = y.length; v < J; v++) {
                    F = y[v];
                    if (!F.info.official_name.match(t)) {
                        F.setVisible(false)
                    }
                }
                i(window.gmap.getVisibleMarkers(), window.locations_pager);
                $(".map-container-facility-search button").removeClass("disabled").html("Locate a Facility")
            }})
    };
    $("select.distance-input").change(function() {
        var s;
        s = $(this).val();
        return $(this).parent().find("span").html(s)
    });
    j = function() {
        return parseInt($("select.distance-input").val())
    };
    $("form.find-facility-form").submit(function(u) {
        var v, s, t;
        u.preventDefault();
        u.stopPropagation();
        $(".map-container-error-message").hide();
        if ($(".map-container-facility-search button").hasClass("disabled")) {
            return
        }
        t = $("input.zip-input").val();
        s = $("input.name-input").val();
        if (s === "") {
            s = null
        }
        if (t === "") {
            $(".map-container-error-message").show();
            return
        }
        v = j();
        return r({from: "search",zip: t,distance: v}, s)
    });
    k = function() {
        if ($("#map").get().length === 0) {
            return
        }
        window.gmap = new InitMap(document.querySelector("#map"), {lat: 38.928406,lng: -104.83415,zoom: 4});
        return
    };
    if ($("#map").get().length) {
        k();
        r({zip: $("#initRegion").val()})
    }
    var f = function(t) {
        var s = t === true ? true : false;
        var u = $(".map-container-facility-type .map-container-facility-type-td");
        u.each(function() {
            var v = $(this);
            var w = $("input", v);
            w.prop("checked", s);
            if (s) {
                if (!v.hasClass("acitve")) {
                    v.addClass("active")
                }
            } else {
                v.removeClass("active")
            }
        })
    };
    var q = function() {
        var t = true, w;
        var u = $('.map-container-facility-type .map-container-facility-type-td input[name!="A_type"]');
        u.each(function() {
            w = $(this);
            if (!w.is(":checked")) {
                t = false;
                return false
            }
        });
        var v = $('.map-container-facility-type .map-container-facility-type-td input[name="A_type"]');
        v.attr("checked", t);
        var s = v.parent();
        if (t) {
            if (!s.hasClass("active")) {
                s.addClass("active")
            }
        } else {
            s.removeClass("active")
        }
    };
    $(".map-container-facility-type .map-container-facility-type-td input").click(function(x) {
        var u, w, s, v, z, y;
        s = $("input.name-input").val();
        if (s === "") {
            s = ".*"
        }
        v = new RegExp("" + s, "gi");
        w = $(this).parent().attr("data-type");
        $(this).parent().toggleClass("active");
        if ($(this).parent().hasClass("active")) {
            $(this).prop("checked", true)
        } else {
            $(this).prop("checked", false)
        }
        if (w === "a") {
            if ($(this).is(":checked")) {
                f(true);
                window.gmap.showAllMarkers()
            } else {
                f(false);
                window.gmap.hideAllMarkers()
            }
        } else {
            if ($(this).is(":checked")) {
                q();
                window.gmap.showTypeMarkers(w)
            } else {
                q();
                window.gmap.hideTypeMarkers(w)
            }
        }
        if ($(document).width() <= 768) {
            window.locations_pager = 0
        }
        z = window.gmap.getVisibleMarkers();
        for (u = 0, y = z.length; u < y; u++) {
            m = z[u];
            if (!m.info.official_name.match(v)) {
                m.setVisible(false)
            }
        }
        return i(window.gmap.getVisibleMarkers(), window.locations_pager)
    });
    $(".map-layer-display ul li").click(function() {
        var s;
        s = $(this).attr("data-type");
        $(".map-layer-display ul li").removeClass("active");
        $(this).addClass("active");
        if (s === "list") {
            $(".map-container-map").addClass("list-only");
            window.locations_pager = 0;
            return i(window.gmap.getVisibleMarkers(), window.locations_pager)
        } else {
            window.locations_pager = null;
            i(window.gmap.getVisibleMarkers(), window.locations_pager);
            return $(".map-container-map").removeClass("list-only")
        }
    });
    $("#locateAFacility").hover(function() {
        if (!$(this).hasClass("disabled")) {
            $(this).addClass("hover")
        }
    }, function() {
        $(this).removeClass("hover")
    });
    o();
    $(".new-research").click(function() {
        $("html, body").animate({scrollTop: $("section.map-container").offset().top})
    });
    $(window).resize(function() {
        return o()
    })
});
