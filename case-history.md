---
layout: default
title: Ebola Case History
---
<script>
	var img = document.getElementById('casedata');
	function setImage(obj)
	{
		var value = obj.value;
		casedata.src = 'images/cases/regional_cases_week_' + value + '.png';
		
	}
</script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/rangeslider.js/1.1.0/rangeslider.min.css" type="text/css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/rangeslider.js/1.1.0/rangeslider.min.js"></script>
<script>
    // Initialize a new plugin instance for all
    // e.g. $('input[type="range"]') elements.
    $('input[type="range"]').rangeslider();
</script>

## Summary

Below is a slider controlled history of Ebola case occurrence obtained from WHO EVD data. 

<img id='casedata' src='images/cases/regional_cases_week_1.png' />
<br/>
<input onchange='setImage(this)' type="range" min="1" max="64" value="1" step="1" />