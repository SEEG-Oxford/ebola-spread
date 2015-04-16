---
layout: default
title: Regional Risk
---

## Summary

The aim of this analysis is to produce a regional, district level metric of the relative risk of Ebola cases being imported by travellers. This includes the core three most affected countries Guinea, Liberia and Sierra Leone. In short, this risk metric 'Importation Risk' is based on a weighted contemporary human movement model (gravity, original radiation and radiation with selection). This movement model then uses the prevalence of the disease in each of the 63 districts to derive a risk of importation. The index is then  re-scaled to a metric of relative importation risk between 0 and 10, in line with other INFORM metrics applied on a global scale. Other human movement models are tested and compared to these estimates and will be shown soon.

[Risk of Ebola case importation model methodology][Risk-doc]

[Risk-doc]: http://seeg-oxford.github.io/ebola-spread/local-risk-doc

### Latest data as of  2015-04-16

<a href="images/regional_prediction_weighted_large.png"><img src="images/regional_prediction_weighted.png" /></a>
Predicted relative risk of importation of EVD cases from districts with reported cases in the last <b>21</b> days using the weighted movement models. Dark red indicates higher risk of importation. Note that this does not represent a prediction of the number of new cases being reported in the future. Districts with reported cases are coloured blue to prevent skew.

[Weighted model source][Weighted-source]

[Historic case occurrence][Historic-cases]

[Historic case predictions][Historic-prediction]

[Weighted-source]: http://seeg-oxford.github.io/ebola-spread/local-risk-weightings
[Historic-cases]: http://seeg-oxford.github.io/ebola-spread/case-history
[Historic-prediction]: http://seeg-oxford.github.io/ebola-spread/prediction-history
