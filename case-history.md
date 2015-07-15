---
layout: default
title: Ebola Case History
---
<script>
	var img = document.getElementById('casedata');
	
	function pad(n, width, z) {
	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}
	
	function setImage(obj)
	{
		var value = obj;
		casedata.src = 'images/cases/' + pad(value,2) + '_regional_cases_week.png';
		
	}
</script>
<link rel="stylesheet" href="stylesheets/rangeslider.css" type="text/css">

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<script src="javascripts/rangeslider.min.js"></script>

## Summary

Below is a slider controlled history of Ebola case occurrence obtained from WHO EVD data. 

<output></output>
<img id="casedata" src="images/cases/01_regional_cases_week.png" style="display:block;margin-left: auto;margin-right:auto;">
<input type="range" min="1" max="80" value="1" step="1" data-rangeslider>

<script>
	$(function() {
		// Initialize a new plugin instance for all
		// e.g. $('input[type="range"]') elements.
		$('input[type="range"]').rangeslider({
			// Feature detection the default is `true`.
			// Set this to `false` if you want to use
			// the polyfill also in Browsers which support
			// the native <input type="range"> element.
			polyfill: false,

			// Default CSS classes
			rangeClass: 'rangeslider',
			fillClass: 'rangeslider__fill',
			handleClass: 'rangeslider__handle',
			
			onSlide: function(position, value) {
				setImage(value);
				output = $('output')[0];
				output.innerHTML = "Week " + value;
			}
		});
	});
</script>
