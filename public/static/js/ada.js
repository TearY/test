$(function(){
	$('.highlights .highlight__image').click(function(e){
		var target = e.target||e.srcElement;
		if (target==this&&$(this).parent().find('.highlight__image-link').length>0) {
		$(this).parent().find('.highlight__image-link')[0].click();
		};
	});

})

$(function(){
	$('.show-events .picture-holder img').click(function(e){
		var h3 =$(this).parent().next('h3');
		var a = h3.find('a');
		if (h3&&a.length>0) {
			a[0].click();
		};
	});
})