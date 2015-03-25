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

where, $m_i$ represents the population at origin, $n_j$ the population at the destination and $r_{ij}$
 the distance between them. $\alpha$ and $\beta$ are tuning parameters fitted to each subpopulation size, and $f(r_{ij})$ is a distance-dependent functional form (Zipf 1946, Balcan et al. 2009). 

### Radiation model

The radiation model generally assumes the rational of job selection. It follows the general rule that the number of employment opportunities in each district is proportional to its resident population, assuming full employment (people in district = jobs in district). Moreover, the individuals in each district choose the closest job to their home. Analytically the radiation model is represented by: 

$$T_{ij} = \dfrac{PQ}{(P + R) (P + Q + R)}$$

where $P$ is the population at the origin and $Q$ at the destination, $R$ denotes the total population in a radius $\gamma$ around population centres $P_i$ and $Q_j$ (excluding the population at the origin and destination location) (Simini et al. 2012).

### Uniform selection model

The uniform selection model assumes that a job is selected uniformly at random proportionally to the population in each district with following Simini et al. (2013). 

$$T_ij = \dfrac{P}{Q - R}$$

## Relative rate of importation

For the radiation model outputs we weight connectivity to each of the districts by an estimate of the prevalence of Ebola in each of those districts to produce a single value of the index for all other districts.
For each of the 63 districts of the three core Ebola-affected countries, we estimate the current prevalence of Ebola cases by dividing the number of cases reported in each district over the last last 21 days by each district's population. By multiplying this district-specific prevalence by the relevant index of movement, we produce an estimate of the relative rate of importation from each of the affected districts in the core countries to each of the other districts. For each country we sum the estimated relative rate of importation from each district to calculate an estimate of the overall relative rate of importation into the unaffected districts. These numbers are then rescaled so that the district with the highest importation risk has a score of 10 for the given index and all other districts have a score between 0 and 10 representing the risk relative to the most at-risk districts.


## Key assumptions

Note that due to a lack of data, this estimation necessarily makes a number of assumptions, and does not represent the _expected_ number of importations over a given time frame. Key points include:

* The data used to train the human movement model are taken from a comparable European country but do not represent the movement in an outbreak situation as they are not estimated on real-time data. This, however could be improved as new data become available. 


## Reference
Balcan, D., Colizza, V., Gonc, B. & Hu, H. (2009). Multiscale mobility networks and the spatial. Proc. Natl. Acad. Sci. U. S. A., 106, 21484–9.

Simini, F., Maritan, A. & Néda, Z. (2013). Human mobility in a continuum approach. PLoS One, 8, e60069.

Simini, F., González, M.C., Maritan, A. & Barabási, A.-L. (2012). A universal model for mobility and migration patterns. Nature, 484, 96-100.

Tizzoni, M., Bajardi, P., Decuyper, A., Kon Kam King, G., Schneider, C.M., Blondel, V., et al. (2014). On the Use of Human Mobility Proxies for Modeling Epidemics. PLoS Comput. Biol., 10, e1003716.

WorldPop project. WorldPop. [http://worldpop.org.uk/](http://worldpop.org.uk/).

Zipf, G.K. (1946). The P1 P2 / D hypothesis: on the intercity movement of persons. Am. Sociol. Rev., 11, 677–686. 


