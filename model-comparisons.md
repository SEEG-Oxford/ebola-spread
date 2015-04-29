---
layout: default
title: Model Validation Statistics and Analysis
---
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<script src="javascripts/jquery.csvToTable.js"></script>

<script>
	$(function() {
		$('#CSVTable').CSVToTable('data/modelcomparisonsdeviance.csv', { startLine: 1, headers: ["Row/Column","1","2","3","4","5","6","7"] })
		
		$('#CSVTable2').CSVToTable('data/modelcomparisonscorrelation.csv', { startLine: 1, headers: ["Row/Column","1","2","3","4","5","6","7"] })
	});
	</script>

## Introduction

The statistics and analysis are applicable only to the movement models and not to the predictive power of the Ebola spread model as a whole. These are used to assess the predictive abilities of the various movement models particularly when predicting back to their source country. We have also looked at the predicted movement in one country using a model trained on observed data from another country. A simple analysis has been performed to visualise how the models predict movement in West Africa using a number of different statistics.

## Validation Statistics

We are using a cross validation technique to assess the predictive power of the movement models by both comparing how well each model performs against its own training data, as well as how it performs against observed data in other countries. We have plotted the results of the final fitted models in one composite image showing both Source to Source predictions and Source to Other predictions. There are multiple versions of the Gravity model shown in this plot so as to also assess the power of a 9 parameter Gravity model. The percentage shown is the distance cutoff used to filter between the pairs of parameters.

<a href="images/model_comparisons.png"><img src="images/model_comparisons.png" /></a>

### Model Deviances:

<div id="CSVTable"></div>

### Model Correlation Coefficients:

<div id="CSVTable2"></div>

## Basic Prediction Analysis

### Prediction of Movement in West Africa based on source district population

<a href="images/west_africa_population_movement.png"><img src="images/west_africa_population_movement.png" /></a>

### Prediction of Movement probability in West Africa against destination district population

<a href="images/west_africa_population_probability.png"><img src="images/west_africa_population_probability.png" /></a>

### Prediction of Movement probability in West Africa against distance between regions

<a href="images/west_africa_distance_probability.png"><img src="images/west_africa_distance_probability.png" /></a>