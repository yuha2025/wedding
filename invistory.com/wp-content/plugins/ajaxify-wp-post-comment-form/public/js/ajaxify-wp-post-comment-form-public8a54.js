(function( $ ) {
	'use strict';
	
	$(document).ready(function() {
		var c;
		$.ajax({
			type: "POST",
			url: public_comment_ajax_obj.ajaxurl,
			data: 'action=get_container_id',
			beforeSend: function() {
			},
			error: function(errorThrown){
				console.log(errorThrown);
			},
			success:function(data) {
				console.log(data);
				if(data != '')
				{
					c = data;
					//console.log(c);
					//$('.single-post [action*="wp-comments-post.php"] [type="submit"]').css("pointer-events","unset");
				}
			}
		});
		/* Reference link : https://rudrastyh.com/wordpress/ajax-comments.html */
		
	$(document).ajaxSuccess(function() {
		if(c !== "undefined")
		{
			//alert(c);
			$(c).submit(function(e){				
				e.preventDefault();
				$.ajax({
					type : 'POST',
					url : public_comment_ajax_obj.ajaxurl, // admin-ajax.php URL
					data: $(this).serialize() + '&action=comment_public_submit_ajax_comment',
					beforeSend: function(xhr){
						$('.lds-ring').remove();
						$(c).addClass('cLoading');
						$(c+' [type="submit"]').after('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');
					},
					error: function (request, status, error) {
						if( status == 500 ){
							alert( 'Error while adding comment' );
						} else if( status == 'timeout' ){
							alert('Error: Server doesn\'t respond.');
						} else {
							// process WordPress errors
							var wpErrorHtml = request.responseText.split("<p>"),
								wpErrorStr = wpErrorHtml[1].split("</p>");
	 
							alert( wpErrorStr[0] );
						}
						$(c).removeClass('cLoading');
						$('.lds-ring').remove();
					},
					success: function ( addedCommentHTML ) {
						//console.log(addedCommentHTML);
						$('.error_comment_msg').remove();
						$('.lds-ring').remove();
						if(addedCommentHTML !='')
						{
							$(c+' [type="submit"]').after(addedCommentHTML);
							jQuery(".error_comment_msg").css('opacity','1');
							jQuery('.error_comment_msg').delay(2000).queue( function(next){ jQuery(this).css('opacity','0'); next(); });
						}
						else
						{
							location.reload();
						}
						$(c+" textarea").val('');
					},
					complete: function(){
						$(c).removeClass('cLoading');
						$('.lds-ring').remove();
					}
				});
			});
		}
});		
	});

})( jQuery );
