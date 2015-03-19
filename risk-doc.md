---
layout: default
title: Quantifying the relative risk of Ebola case importation at a national level - version 2
use_math: true
---
## Methodological summary, University of Oxford 20/02/2015

## Summary

The aim of this analysis is to produce a global, national-level metric of the relative risk of Ebola cases being imported by travellers, for each country listed in the INFORM database. In brief, this risk metric 'Importation Risk' is calculated as a weighted average of three separate importation metrics: 'Migration Index', 'Gravity Index' and 'Adjacency Index', each representing a different aspect of human movement. Each of these three indices weights the importation risk by an estimate of the prevalence of the disease in each of the three core countries \(Guinea, Liberia and Sierra Leone\). Each of these three indices is re-scaled to a metric of relative importation risk between 0 and 10, in line with other INFORM metrics. The weighting of these three indices in the overall risk metric enables the inclusion of expert opinion about the most likely route of importation for EVD cases.

## Indices

### Migration Index

The aim of this index is to represent travel from core affected countries to other countries related to the global distribution of the diaspora of these countries (for example to visit relatives). Since this is likely to be correlated with long-term international migration, we use an existing migration dataset to develop this metric. 
We estimate the relative number of travellers moving from each of the core Ebola-affected countries to each other country as the estimated total migration between the two countries (in either direction) between 2005 and 2010 using estimates provided by Abel & Sander (2014). I.e. the sum of the estimated number of people who were living in country A in 2005 and were then living in country B in 2010 and the number of people living in country B in 2005 and then country A in 2010. In order to remove estimates of 0 travellers (which would lead to 0 estimates of relative risk, which could incorrectly be interpreted as 0 risk), we added 1 to all of these numbers to represent low but non-zero international travel. Country names were manually matched between those presented by Abel & Sander and those used in the INFORM database.

### Gravity Index

The aim of this metric is to represent regional and global business travel. As there is scant publicly available data on the numbers of people moving between countries, we instead apply a simple parametric model, the gravity model, to infer relative movement based on population sizes and distances.
The model takes the form: $\frac{PQ}{D\gamma}$ where P and Q are the populations of the origin and destination countries and D is the distance between geographic centroids of these two countries. $\gamma$ is parameter controlling how the number of visitors decays with distance. Note that we omit the additional parameters present in other implementations of the gravity model as the later rescaling of the index removes their effect. In the absence of a reliable, publicly available global dataset on international business travel, the choice of the parameter $\gamma$ becomes arbitrary. We set $\gamma$=1.5 to produce movement rankings that correspond to a prior belief that travel to populous countries in the West Africa region (e.g. Ghana and Nigeria) will be more common than travel to the very populous countries in Asia (e.g. China and India).

### Adjacency Index

This metric aims to represent relatively small-scale cross-border travel in the West Africa region.
We initially calculate the number of borders an individual would need to cross to move between two countries (for adjacent countries this number is 1, nor non-adjacent countries which share a common neighbour this is 2, etc.). To produce an index positively related to risk, we converted these codes into an index of adjacency with a score of three for immediate neighbours, 2 for those countries separated by one other country, 1 for those separated by two other countries and 0 for those separated by three or more other countries. 

## Relative rate of importation

For each of these three indices, we weight connectivity to each of the three core affected countries by an estimate of the prevalence of Ebola in each of those countries to produce a single value of the index for all other countries.
For each of the three core Ebola-affected countries, we estimate the current prevalence of Ebola cases by dividing the number of cases reported in each country the last 21 days by each country's population. By multiplying this country-specific prevalence by the relevant index of movement, we produce an estimate of the relative rate of importation from each of the core countries to each of the other countries. For each country we sum the estimated relative rate of importation from each of the three core countries to calculate an estimate of the overall relative rate of importation into the unaffected countries. These numbers are then rescaled so that the country with the highest importation risk has a score of 10 for the given index and all other countries have a score between 0 and 10 representing the risk relative to the most at-risk country.

## Weighting of indices

In order to incorporate expert knowledge about the relative importance of different modes of movement - as well as on the reliability of each of the different indices - weightings may be provided for calculating the overall Importation Risk metric.

## Key assumptions

Note that due to a lack of data, this estimation necessarily makes a number of assumptions, and does not represent the _expected_ number of importations over a given time frame. Key points include:

* As the data used to assess international migration patterns were from 2005-2010, **they represent travel patterns before the outbreak**. The resulting metric therefore does not include an estimate of the risk of importation due to people visiting the countries as part of response operations (including healthcare workers and armed forces personnel), only importations due to the types of travel not directly related to the epidemic.
* Because we only use these indices to calculate the relative risk of importation (rather than the absolute number of importations) the indices and the overall Importation Risk metric are not influenced by an overall reduction in travel to the countries due to the epidemic, but they do **assume that the reduction in travel to/from the three core countries due to the epidemic is the same across all countries and regions**. Equally this assumes that airport and border screening or similar measures are equally effective (or ineffective) in all countries.

## Reference

Abel GJ & Sander N (2014) Quantifying Global International Migration Flows. Science 343 (6178), 1520-1522 http://dx.doi.org/10.1126/science.1248676