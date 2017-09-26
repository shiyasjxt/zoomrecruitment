// v2.2
(function( $ ){

	$.fn.rssInclude = function(options) {
	
		var fillDiv = this;
	
		var outputText = "";
		
		var outputTextBottom = "";
		
		jQuery.ajax({
			type: "GET",
			url: options.baseParams.rssURL,
			dataType: options.baseParams["contentType"], 
			error: function(request, type, errorThrown) {
				console.log("An error occurred: " + errorThrown);
				return;
				
			}, 
			success: function(xml){
				
				var i = 0;
			
				jQuery(xml).find("item").each(function(){
					
					if (options.baseParams.limit !=0 && options.baseParams.limit == i) return;
					
					outputText += "<" + options.baseParams["itemTag"] + " class='rss-item'>";
					
					outputText += "<span class='rss-item-title'>";
					
					var tempText = jQuery.trim(jQuery(this).children("title").text());
					var tempTitleLength = options.baseParams["title"];
					
					if (0 == tempTitleLength)
					{
						tempTitleLength = tempText.length;
					}
					tempEllipsis = "";
					if (tempTitleLength < tempText.length)
					{
						tempEllipsis = options.baseParams.ellipsis;
					}
					
					
					outputText += "<a href='" + jQuery(this).find("link").text() + "'>" + tempText.substr(0, tempTitleLength) + tempEllipsis + "</a>";
					

					outputText += "</span>";
					
					for (var key in options.elements)
					{
						if (null != options.elements[key])
						{
							tempText = jQuery.trim(jQuery(this).find(key).text());
							
							if (0 == options.elements[key])
							{
								options.elements[key] = tempText.length;
							}
							
							tempEllipsis = "";
							
							if (options.elements[key] < tempText.length)
							{
								tempEllipsis = options.baseParams.ellipsis;
							}
							
							outputText += "<span class='rss-item-" + key + "'>" + tempText.substr(0, options.elements[key]) + tempEllipsis + "</span>";
						}
					}
					
					outputText += "</" + options.baseParams["itemTag"] + ">";
					
					i++;	
					
				});
			
				outputText += outputTextBottom;
				
				fillDiv.html(outputText);
				
				fillDiv.animate(options.animation, options.animationParams);
			}
		});
		return;

	};
})( jQuery );