$( document ).ready(function() {
	smoothScroll(700);
	workBelt();
	workLoad();
	clientLoad();
	formValidate();
	// formSend();
	$("header h1").fitText(1, { minFontSize: '20px', maxFontSize: '72px' });
});

// smoothScroll function is applied from the document ready function
function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}

function workBelt() {

	$(".trigger").remove();
	$(".return").remove();

	$('.thumb-unit').click(function() {
		$('.work-belt').addClass("slided");
		$('.work-container').show();
	});

	$('.work-return').click(function() {
		$('.work-belt').removeClass("slided");
		$('.work-container').hide(500);
	});
}

function workLoad() {

	$.ajaxSetup({ cache: true });

	$('.thumb-unit').click(function() {

		var $this = $(this)
				newTitle = $this.find('strong').text(),
				spinner = '<div class="loader">Loading...</div>',
				filePath = $this.data('filepath');
		$('.project-load').html(spinner).load(filePath);
		$('.project-title').text(newTitle);

	});

}

function clientLoad() {

	$('.client-unit').first().addClass('active-client');
	$('.client-logo').first().addClass('active-client');
	$('.clients-mobile-nav span').first().addClass('active-client');

	$('.client-logo, .clients-mobile-nav span').click(function() {
		var $this = $(this),
				$siblings = $this.parent().children(),
				position = $siblings.index($this);

		$('.client-unit').removeClass('active-client').eq(position).addClass('active-client');
		$siblings.removeClass('active-client');
		$this.addClass('active-client');
	});


	$('.client-control-next, .client-control-prev').click(function() {

		var $this = $(this),
				curActiveClient = $('.clients-belt').find('.active-client'),
				position = $('.clients-belt').children().index(curActiveClient),
				clientNum = $('.client-unit').length;

				if($this.hasClass('client-control-next')) {

					if(position < clientNum -1){
					  $('.active-client').removeClass('active-client').next().addClass('active-client');
					} else {
					  $('.client-unit').removeClass('active-client').first().addClass('active-client');
					  $('.client-logo').removeClass('active-client').first().addClass('active-client');
					}

				} else {

					if (position === 0) {
					  $('.client-unit').removeClass('active-client').last().addClass('active-client');
					  $('.client-logo').removeClass('active-client').last().addClass('active-client');
					} else {
					  $('.active-client').removeClass('active-client').prev().addClass('active-client');  
					}

				}
	});

}


function formValidate() {
	$("#contact-form").validate({
		submitHandler: function(form) {
			$.ajax({
				url: "//formspree.io/ps@bitwerker.de", 
				method: "POST",
				data: {
					name: $(form).find("input[name='name']").val(),
					_replyto: $(form).find("input[name='_replyto']").val(),
					message: $(form).find("textarea[name='message']").val()
				},
				dataType: "json",
				success: function() {
					$("#submit-success").fadeIn();
					$("#contact-form").fadeOut();
				},
				error: function() {
					$("#submit-errors").fadeIn();        
				}
			});
		}
	});
}



/* alternative version zu senden des formulars 
* derzeit wird dafür nicht js benutzt
*/

// function formSend() {
// 	var message = "";

// 	$("#sendbutton").on("click", function() {
// 	  message = $("#contact-form").serialize();
// 	  $.ajax({
// 	    url: "//formspree.io/ps@bitwerker.de", 
// 	    method: "POST",
// 	    data: {
//         name: $(form).find("input[name='name']").val(),
//         _replyto: $(form).find("input[name='_replyto']").val(),
//         message: $(form).find("textarea[name='message']").val()
//       },
// 	    dataType: "json"
// 	  });
// 	  alert('Vielen Dank für Ihre Nachricht!');
// 	  return false;
// 	});

// }


/*global jQuery */
/*!
* FitText.js 1.2
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );