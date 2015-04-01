
---
layout: default
title: Quantifying the relative risk of Ebola case importation at a national level
use_math: true
---
## Methodological summary

## Index

A detailed description of the human movement model at the regional scale is shown below.

### Radiation model with selection index 

The aim of this index is to represent travel from districts between the affected countries to other districts within the core countries. We assume that travel between districts is determined by factors such as population and distance. The radiation model with selection is defined as: 

$$T_{ij} = \dfrac{\dfrac{1 - \lambda^{P}}{P} - \dfrac{1 - \lambda^{Q}}{Q}}{\dfrac{1 - \lambda^{R}}{R}}$$
 
(Simini et al. 2012, Simini et al. 2013). The radiation model with selection was fitted using a set of known between district (n = 329) movements from mobile phone users from France in 2007 (Tizzoni et al. 2014). The model was then used to build a movement matrix between all districts of the core countries. District level population data were extracted using [WorldPop](http://www.worldpop.org/). District level administrative boundaries were downloaded from [GADM](http://www.gadm.org/).   

### Gravity model 

The gravity law assumes that the number of people moving between locations is proportional to some power of the origin and destination population, and decays by distance between them following: 

$$T_ij = \dfrac{m^\alpha_i n^\beta_j}{f(r_{ij})}$$

where, $m_i$ represents the population at origin, $n_j$ the population at the destination and $r\_{ij}$ the distance between them. $\alpha$ and $\beta$ are tuning parameters fitted to each subpopulation size, and $f(r\_{ij})$ is a distance-dependent functional form (Zipf 1946, Balcan et al. 2009). 

### Radiation model

The radiation model generally assumes the rational of job selection. It follows the general rule that the number of employment opportunities in each district is proportional to its resident population, assuming full employment (people in district = jobs in district). Moreover, the individuals in each district choose the closest job to their home. Analytically the radiation model is represented by: 

$$T_{ij} = \dfrac{PQ}{(P + R) (P + Q + R)}$$

where $P$ is the population at the origin and $Q$ at the destination, $R$ denotes the total population in a radius $\gamma$ around population centres $P_i$ and $Q_j$ (excluding the population at the origin and destination location) (Simini et al. 2012).

### Uniform selection model

The uniform selection model assumes that a job is selected uniformly at random proportionally to the population in each district following Simini et al. (2013):

$$T_ij = \dfrac{P}{Q - R}$$

## Relative rate of importation

For the radiation model outputs we weight connectivity to each of the districts by an estimate of the prevalence of Ebola in each of those districts to produce a single value of the index for all other districts.
For each of the 63 districts of the three core Ebola-affected countries, we estimate the current prevalence of Ebola cases by dividing the number of cases reported in each district over the last last 21 days by each district's population. By multiplying this district-specific prevalence by the relevant index of movement, we produce an estimate of the relative rate of importation from each of the affected districts in the core countries to each of the other districts. For each country we sum the estimated relative rate of importation from each district to calculate an estimate of the overall relative rate of importation into the unaffected districts. These numbers are then rescaled so that the district with the highest importation risk has a score of 10 for the given index and all other districts have a score between 0 and 10 representing the risk relative to the most at-risk districts.

## Datasets used

# Population surfaces and administrative boundaries
We obtained high resolution population maps from WorldPop. Populations were then aggregated to the district level administrative units for all core and surrounding countries. We extracted spatial information such as polygons, centroids and distance matrices using administrative boundaries from GADM (www.gadm.org/download).

# Human mobility
Many metrics can be used to measure mobility between regions of interest. Traditionally this included data from national censuses or questionnaires. More recently several methods have been proposed to estimate mobility based on call detail records (CDRs) (Wesolowski et al. 2012). In this study we used three openly available CDR datasets from 2007 from France and Spain and 2006 from Portugal (Tizzoni et al. 2014). We moreover used gravity model parameters from CDR data from Senegal, Cote I’voire and Kenya to infer mobility between districts in the core and surrounding countries (Wesolowski et al. 2014). 

The commuting patterns from mobile phone records for each country (France, Spain, Portugal) are extracted from a sample comprising 5,695,974, 1,034,430 and 1,058,197 anonymised users respectively. This data has already been successfully applied in previous works (Calabrese et al. 2011, Phithakkitnukoon et al. 2012a, Phithakkitnukoon et al. 2012b, Sobolevsky et al. 2013). 

Gravity model parameter estimates were used from Wesolowski et al. (2014) derived from three independent datasets. A random sample of 500,000 anonymised mobile phone subscribers were provided by Orange Telecom from Cote d’Ivoire recorded between December 1, 2011 and April 28, 2012 (Lu et al. 2013). Another set of CDR data from Senegal was used recording movement from 150,000 subscribers between January 1, 2013 and December 31, 2013 (de Montjoye et al. 2014). Lastly gravity model parameters were taken fitted from a comprehensive CDR dataset from Kenya comprising 14,816,521 subscribers between June 2008 and June 2009 with an estimated 92% country wide market share (Wesolowksi et al. 2014). 

## Key assumptions

Note that due to a lack of data, this estimation necessarily makes a number of assumptions, and does not represent the _expected_ number of importations over a given time frame. Key points include:

* The data used to train the human movement model are taken from a comparable European country but do not represent the movement in an outbreak situation as they are not estimated on real-time data. This, however could be improved as new data become available. 


# References

Balcan, D., Colizza, V., Gonc, B. & Hu, H. (2009). Multiscale mobility networks and the spatial. Proc. Natl. Acad. Sci. U. S. A., 106, 21484–9.

Calabrese, F., Smoreda, Z., Blondel, V.D. & Ratti, C. (2011). Interplay between telecommunications and face-to-face interactions: A study using mobile phone data. PLoS One, 6, e20814.

de Montjoye, Y.-A., Smoreda, Z., Trinquart, R., Ziemlicki, C. & Blondel, V.D. (n.d.). D4D-Senegal: The Second Mobile Phone Data for Development Challenge. arXiv: 1407.4885v2, 2014.

Lu, X., Wetter, E., Bharti, N., Tatem, A.J. & Bengtsson, L. (2013). Approaching the limit of predictability in human mobility. Sci. Rep., 3, 2923.

Phithakkitnukoon, S., Leong, T.W., Smoreda, Z. & Olivier, P. (2012)a. Weather Effects on Mobile Social Interactions: A Case Study of Mobile Phone Users in Lisbon, Portugal. PLoS One, 7, e45745.

Phithakkitnukoon, S., Smoreda, Z. & Olivier, P. (2012)b. Socio-geography of human mobility: a study using longitudinal mobile phone data. PLoS One, 7, e39253.

Simini, F., Maritan, A. & Néda, Z. (2013). Human mobility in a continuum approach. PLoS One, 8, e60069.

Simini, F., González, M.C., Maritan, A. & Barabási, A.-L. (2012). A universal model for mobility and migration patterns. Nature, 484, 96-100.

Sobolevsky, S., Szell, M., Campari, R., Couronné, T., Smoreda, Z. & Ratti, C. (2013). Delineating geographical regions with networks of human interactions in an extensive set of countries. PLoS One, 8, e81707.

Tizzoni, M., Bajardi, P., Decuyper, A., Kon Kam King, G., Schneider, C.M., Blondel, V., et al. (2014). On the Use of Human Mobility Proxies for Modeling Epidemics. PLoS Comput. Biol., 10, e1003716.

Wesolowski, A., Eagle, N., Tatem, A.J., Smith, D.L., Noor, A.M., Snow, R.W., et al. (2012). Quantifying the impact of human mobility on malaria. Science., 338, 267–70.

WorldPop project. WorldPop. [http://worldpop.org.uk/](http://worldpop.org.uk/).

Zipf, G.K. (1946). The P1 P2 / D hypothesis: on the intercity movement of persons. Am. Sociol. Rev., 11, 677–686. 

