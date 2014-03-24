jQuery(document).ready(function(){

	"use strict";
	
	ce_off_canvas();	
	function ce_off_canvas() {
		
		var ce_canvas = jQuery('#site-canvas-wrapper');
		
		var ce_of_canvas = jQuery('#site-of-canvas-wrapper');
		
		var ce_open_btn = jQuery('#site-of-canvas-open');
		var ce_close_btn = jQuery('#site-of-canvas-close');
		
		ce_open_btn.bind('tap click', ce_open_btn_click);
		
		ce_close_btn.bind('tap click', ce_close_btn_click);		
		
		
		function ce_open_btn_click(event){
		
			if(ce_canvas.hasClass('ce-canvas-close')){
			

				ce_canvas.removeClass('ce-canvas-close').addClass('ce-canvas-open');
				ce_of_canvas.removeClass('ce-canvas-close').addClass('ce-canvas-open');
				
				event.stopPropagation();
				setTimeout(function() {
	
				//	jQuery('html').css({'overflow': 'hidden'});
	
					ce_canvas.bind('tap click mousewheel touchmove', function(event){
					
						event.preventDefault();

						ce_canvas.removeClass('ce-canvas-open').addClass('ce-canvas-close');
						ce_of_canvas.removeClass('ce-canvas-open').addClass('ce-canvas-close');
						
						setTimeout(function() {

						//	jQuery('html').css({'overflow': 'auto'});
							ce_canvas.unbind();
							
						}, 500);
						
					});	
				
				}, 500);			
								
			}	
			
		}
		
		function ce_close_btn_click(){
		
			if(ce_canvas.hasClass('ce-canvas-open')){
			
				
				ce_canvas.removeClass('ce-canvas-open').addClass('ce-canvas-close');
				ce_of_canvas.removeClass('ce-canvas-open').addClass('ce-canvas-close');

				setTimeout(function() {

				//	jQuery('html').css({'overflow': 'auto'});
					ce_canvas.unbind();
					
				}, 500);
				
			}		
			
		}
				
	}
	
	ce_share_btn();	
	function ce_share_btn() {
		
		var ce_share = jQuery('.entry-share');
		
		ce_share.each(function(){
		
			var this_share_btn = jQuery(this);
		
			this_share_btn.bind('tap click', ce_share_btn_click);
			
			function ce_share_btn_click(event){
				
				this_share_btn.addClass('active');	
				
				var hide_this_share;
				
				jQuery(this).hoverIntent({
					interval: 50,
					timeout: 250,
					over: function() {
					
						clearTimeout(hide_this_share);
												
					},
					out: function() {
					
						hide_this_share = setTimeout(function() {
						
							this_share_btn.removeClass('active');	
							
						}, 500);
						
					} 
				});	
				
			}	
			
		});
		
	}
	
	ce_show_content();
	function ce_show_content(){				
									
		jQuery('#site-body').find('.content-effect-wrapper').each(function(){	

			jQuery(this).waypoint(function() {
				jQuery(this).find('.content-effect').addClass('in-viewpoint');
			}, { 
				offset: '90%' 
			});      
			 
		});
	}

	ce_validate_comment();
	function ce_validate_comment(){
	
		if (jQuery("#commentform").length > 0) { 
	
		jQuery("#commentform").validate({			
			messages: {
				author: {
					required: validateMessages.author_required,
					minlength: validateMessages.author_minlength
				},
				email: validateMessages.email_required,
				url: validateMessages.url_required,
				comment: {
					required: validateMessages.comment_required,
					minlength: validateMessages.comment_minlength
				},
			}
		});
		
		}
		
	}

	ce_validate_contact();
	function ce_validate_contact(){
	
		if (jQuery("#contact-form").length > 0) { 
		
			jQuery("#contact-form").validate({			
				messages: {
					contact_form_name: {
						required: validateMessages.name_required,
						minlength: validateMessages.name_minlength
					},
					contact_form_email: validateMessages.email_required,
					contact_form_subject: {
						required: validateMessages.subject_required,
					},
					contact_form_message: {
						required: validateMessages.message_required,
						minlength: validateMessages.message_minlength
					},
				}
			});
		
		}
		
	}
	
	ce_fitvid();
	function ce_fitvid() {
		jQuery('.media-video-shared').fitVids();
		jQuery('.entry-content').fitVids();
	}
	
	ce_min_body_height();	
	function ce_min_body_height(){
		
		jQuery('body').imagesLoaded(function() { 

		
			var bodyHeight = jQuery('body').outerHeight();
			var windowHeight = jQuery(window).outerHeight();
			
			if(jQuery('body').hasClass('admin-bar ')){
				
				windowHeight = windowHeight - 32;
				
			}
	
			if(bodyHeight < windowHeight){
			
				var heightDifference = windowHeight - bodyHeight;
				
				jQuery('#site-body-wrapper').css({'margin-bottom': heightDifference});
				
			} else if(bodyHeight > windowHeight) {
			
				jQuery('#site-body-wrapper').css({'margin-bottom': 0});
				
			}
		});
	}
	
	ce_nicescroll();
	function ce_nicescroll(){
		
		jQuery("#site-of-canvas-wrapper").niceScroll({smoothscroll: false});
		jQuery("#site-of-canvas-wrapper").getNiceScroll().hide();
		
	}
	
	ce_placeholders();
	function ce_placeholders(){
		
		jQuery('input, textarea').placeholder();
		
	}
	
	
	jQuery(window).on("debouncedresize", function() {			

		
			var setMargin = parseInt(jQuery('#site-body-wrapper').css('margin-bottom'), 10);
			var bodyHeight = jQuery('body').outerHeight();
	
			var windowHeight = jQuery(window).outerHeight();
			if(jQuery('body').hasClass('admin-bar ')){ windowHeight = windowHeight - 32; }
	
			var heightDifference = windowHeight - bodyHeight + setMargin;
			
			if(bodyHeight - setMargin > windowHeight){
				
				jQuery('#site-body-wrapper').css({'margin-bottom': 0});
				
			} else {
				
				jQuery('#site-body-wrapper').css({'margin-bottom': heightDifference });
				
			}

	});
	
});