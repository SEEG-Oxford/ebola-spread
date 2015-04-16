---
layout: default
title: Ebola Case History
---
<script>
	var img = document.getElementById('casedata');
	function setImage(obj)
	{
		var value = obj.value;
		casedata.src = 'images/cases/regional_cases_week_' + (value + 1) + '.png';
		
	}
</script>


## Summary

Below is a slider controlled history of Ebola case occurrence obtained from WHO EVD data. 

<img id='casedata' src='images/cases/regional_cases_week_1.png' />
<br/>
<input onchange='setImage(this)' type="range" min="0" max="63" value="0" step="1" />