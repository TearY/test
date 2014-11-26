$(function() {

	$('.progressbar').each(function(){
		var t = $(this),
			dataperc = t.attr('data-perc'),
			barperc = Math.round(dataperc*5.56);
		t.find('.bar').animate({width:barperc}, dataperc*25);
		t.find('.label').append('<div class="perc"></div>');
		
		perc(t);
		setInterval(function(){perc(t)}, 0); 
	});
});

function beforechange(domid) {
	
}

function afterchange(domid) {
	var rangeval = $("#range").val() ;
	
	var t = $(domid);
	t.attr('data-perc', rangeval);
	var	dataperc = t.attr('data-perc');
	var	barperc = Math.round(dataperc*5.56);
		t.find('.bar').animate({width:barperc}, dataperc*25);
		//t.find('.label').append('<div class="perc"></div>');
		
	perc(t);
	setInterval(function () {perc(t)}, 0); 
}
function perc(t) {
			var length = t.find('.bar').css('width'),
				perc = Math.round(parseInt(length)/5.56),
				labelpos = (parseInt(length)-2);
			t.find('.label').css('left', labelpos);
			t.find('.perc').text(perc+'%');
		}