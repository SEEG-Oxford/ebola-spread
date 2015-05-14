// create the base map
var map = L.map('map', {
	loadingControl: true
});
// setup various global variables
var layers = {};
spreadData = null;
countryNameData = null;
geojson = null;

var group = new L.featureGroup;

// scale bar
L.control.scale().addTo(map);

// base layer
var baseMaps = {};
baseMaps["CartoDB Positron"] = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {"attribution":"Tiles &copy; <a href=\"http://cartodb.com/attributions\", target=\"_blank\">CartoDB</a>, Map data &copy; <a href=\"http://openstreetmap.org/copyright\", target=\"_blan\">OpenStreetMap contributors</a>"});
baseMaps["CartoDB Dark matter"] = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {"attribution":"Tiles &copy; <a href=\"http://cartodb.com/attributions\", target=\"_blank\">CartoDB</a>, Map data &copy; <a href=\"http://openstreetmap.org/copyright\", target=\"_blan\">OpenStreetMap contributors</a>"});
baseMaps["MapQuest Open Aerial"] = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.png', {"subdomains":"1234","type":"sat","maxZoom":11,"attribution":"Tiles &copy; <a href=\"http://www.mapquest.com\", target=\"_blank\">MapQuest</a>, Imagery &copy; NASA/JPL-Caltech and USDA Farm Service Agency"});
baseMaps["Thunderforest Landscape"] = L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {"attribution":"Tiles &copy; <a href=\"http://thunderforest.com\", target=\"_blank\">Thunderforest</a>, Map data &copy; <a href=\"http://openstreetmap.org/copyright\", target=\"_blan\">OpenStreetMap contributors</a>"});
var baseMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {"attribution":"&copy; <a href=\"http://openstreetmap.org/copyright\", target=\"_blank\">OpenStreetMap contributors</a>"});
baseMap.addTo(map);
baseMaps["OpenStreetMap"] = baseMap;
L.control.layers(baseMaps).addTo(map);

// download the geojson file and start the method chain for rendering it
$.getJSON($("link[rel='dat1']").attr("href"), function(x) {
	geojson = x;
	downloadSpreadData(geojson);
});

// create the UI controls
var info = L.control();

var cases = L.control({position: 'topleft'});

var legend = L.control({position: 'bottomright'});

var waiting = L.control();

function addDataToMap(data, style, layer, fit) {
	layers = {};
	layers[layer] = L.geoJson(data, {
		onEachFeature: (typeof onEachFeature == "undefined") ? undefined : onEachFeature,
		pointToLayer: function (feature, latlng) {return L.circleMarker(latlng);},
		style: style
	});
	group.clearLayers();
	group.addLayer(layers[layer])
	// only reset the zoom if fit is true
	if(fit) map.fitBounds(group.getBounds());
};

function downloadSpreadData(geojson) {
	$.ajax({
		url: 'http://seeg-oxford.github.io/ebola-spread/data/all.csv',
		success: function(data) {
			spreadData = data;
			// current default values
			downloadNamesAndCalculateRisk(geojson, data, 1, 0.5, 1, 24, 0, 2);
		}
	});
}

function downloadNamesAndCalculateRisk(geojson, data, migrationWeight, gravityWeight, adjacencyWeight, g, l, s) {
	$.ajax({
			url: 'http://seeg-oxford.github.io/ebola-spread/data/names.dat',
			success: function(countryData) {
				$(".waiting").show();
				countryNameData = countryData;
				calculateGlobalRisks(geojson, countryData, data, migrationWeight, gravityWeight, adjacencyWeight, g, l, s);
			}
	});
}

// ported from the R version of the Inform calculator
function calculateGlobalRisks(geojson, countryData, data, migrationWeight, gravityWeight, adjacencyWeight, g, l, s) {
	// populations
	g_pop = 12347766;
	l_pop = 4503439;
	s_pop = 6318575;
	// parse the csv data into an array
	all = Papa.parse(data, {
		header: true,
		dynamicTyping: true
	});
	migrationSum = [];
	gravitySum = [];
	adjacencySum = [];
	countryCode = [];
	// turn the name data into an array (make sure the file keeps windows line endings)
	countryNames = countryData.split("\r\n");
	// do the calculations for each of the models
	for (i = 0; i < all.data.length; i++) {
		migrationSum.push(all.data[i]["sum_guinea"]*(g/g_pop) + all.data[i]["sum_liberia"]*(l/l_pop) + all.data[i]["sum_sierra_leone"]*(s/s_pop));
		gravitySum.push(all.data[i]["movement_from_guinea"]*(g/g_pop) + all.data[i]["movement_from_liberia"]*(l/l_pop) + all.data[i]["movement_from_sierra_leone"]*(s/s_pop));
		adjacencySum.push((4-all.data[i]["from_guinea"])*(g/g_pop) + (4-all.data[i]["from_liberia"])*(l/l_pop) + (4-all.data[i]["from_sierra_leone"])*(s/s_pop));
		countryCode.push(all.data[i]["country"])
	}
	maxMigration = Math.max.apply(Math, migrationSum);
	maxGravity = Math.max.apply(Math, gravitySum);
	maxAdjacency = Math.max.apply(Math, adjacencySum);
	// calculate relative risks
	migrationRelative = [];
	gravityRelative = [];
	adjacencyRelative = [];
	for (i = 0; i < migrationSum.length; i++) {
		migrationRelative.push((migrationSum[i]/maxMigration)*10)
		gravityRelative.push((gravitySum[i]/maxGravity)*10)
		adjacencyRelative.push((adjacencySum[i]/maxAdjacency)*10)
	}
	//overall weighted risk
	importationRisk = newFilledArray(192, 0)
	for (i = 0; i < migrationSum.length; i++) {
		// load the importation risk into the correct index by looking up the country code in the countryNames variable
		importationRisk[countryNames.indexOf(countryCode[i])] = (((migrationRelative[i]*migrationWeight) + (gravityRelative[i]*gravityWeight) + (adjacencyRelative[i]*adjacencyWeight))/3)
	}
	// extra bit to make the core countries blue and then re-weight the rest
	tempArray = importationRisk;
	tempArray[countryNames.indexOf("LBR")] = 0;
	tempArray[countryNames.indexOf("SLE")] = 0;
	tempArray[countryNames.indexOf("GIN")] = 0;
	maxRisk = Math.max.apply(Math, tempArray);
	for (i = 0; i < migrationSum.length; i++) {
		if(all.data[i]["country"] != "LBR" && all.data[i]["country"] != "SLE" && all.data[i]["country"] != "GIN") {
		// load the importation risk into the correct index by looking up the country code in the countryNames variable
		importationRisk[countryNames.indexOf(countryCode[i])] = importationRisk[countryNames.indexOf(countryCode[i])] / maxRisk;
		} else {
			importationRisk[countryNames.indexOf(countryCode[i])] = -1;
		}
	}
	if(typeof getStyle == "undefined") getStyle = undefined;
	
	fit = true;
	// if this is a recalculation then the layer already exists and must be removed first. Also, we don't want to reset the zoom level so we set "fit" to false
	if(layers.hasOwnProperty("Overall Global Risk")) {
		map.removeLayer(layers["Overall Global Risk"]);
		fit = false;
	}
	addDataToMap(geojson, getStyle(1), "Overall Global Risk", fit);
	layers["Overall Global Risk"].addTo(map);	
	$(".waiting").hide();
}

// helper function to pre-fill an array
function newFilledArray(length, val) {
	var array = [];
	for (var i = 0; i < length; i++) {
		array[i] = val;
	}
	return array;
}

// popup
function onEachFeature(feature, layer) {
	if (feature.properties) {
		layer.bindPopup(
			"<table>" +
			"<tr class='oddrowcol'><td>OBJECTID: </td><td>"+feature.properties["OBJECTID"]+"</td></tr>" +
			"<tr class='evenrowcol'><td>admin0_NAM: </td><td>"+feature.properties["admin0_NAM"]+"</td></tr>" +
			"<tr class='oddrowcol'><td>admin0_COU: </td><td>"+feature.properties["admin0_COU"]+"</td></tr>" +
			"<tr class='evenrowcol'><td>GAUL_CODE: </td><td>"+feature.properties["GAUL_CODE"]+"</td></tr>" +
			"<tr class='oddrowcol'><td>ADMN_LEVEL: </td><td>"+feature.properties["ADMN_LEVEL"]+"</td></tr>" +
			"<tr class='evenrowcol'><td>PARENT_ID: </td><td>"+feature.properties["PARENT_ID"]+"</td></tr>" +
			"<tr class='oddrowcol'><td>admin0_GAU: </td><td>"+feature.properties["admin0_GAU"]+"</td></tr>" +
			"<tr class='evenrowcol'><td>Shape_Leng: </td><td>"+feature.properties["Shape_Leng"]+"</td></tr>" +
			"<tr class='oddrowcol'><td>Shape_Area: </td><td>"+feature.properties["Shape_Area"]+"</td></tr>" +
			"<tr class='evenrowcol'><td>ID: </td><td>"+feature.properties["ID"]+"</td></tr>" +
			"</table>"
		);
	}
}

// styling
function getValue(d) {
	return d > 0.95 ? '#800026' :
   d > 0.9 ? '#990026' :
   d > 0.85 ? '#B30026' :
   d > 0.8 ? '#C70623' :
   d > 0.75 ? '#D7111F' :
   d > 0.7 ? '#E51F1D' :
   d > 0.65 ? '#F03523' :
   d > 0.6 ? '#FA4B29' :
   d > 0.55 ? '#FC6530' :
   d > 0.5 ? '#FC7F38' :
   d > 0.45 ? '#FD943F' :
   d > 0.4 ? '#FDA446' :
   d > 0.35 ? '#FEB44E' :
   d > 0.3 ? '#FEC45F' :
   d > 0.25  ? '#FED471' :
   d > 0.2  ? '#FEDF83' :
   d > 0.15  ? '#FEE794' :
   d > 0.1   ? '#FFEFA6' :
   d > 0.05   ? '#FFF7B9' :
   d >= 0   ? '#FFFFCC' :
			  '#33D3FF';
}
			
function getStyle(index) {
	return function(feature) {
		return {
			"color": getValue(importationRisk[feature.properties["ID"]]),
			"weight": 1, "fillOpacity": 0.4
		};
	}
}


info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'weightings'); // create a div with a class "info"
	this.update();
	return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function () {
	this._div.innerHTML = "<h4>Model Weightings</h4>" + 
	"<table>" +
	"<tr class='oddrowcol'><td><b>Migration:</b></td><td><input id='migrationval' type=number value='1'/><br /></td></tr>" +
	"<tr class='evenrowcol'><td><b>Gravity:</b></td><td><input id='gravityval' type=number value='0.5'/><br /></td></tr>" +
	"<tr class='oddrowcol'><td><b>Adjacency:</b></td><td><input id='adjacencyval' type=number value='1'/><br /></td></tr>" +
	"</table>" +
	"<input type='button' value='Update' onclick='refreshFromUI()'/>";
};

refreshFromUI = function() {
	$(".waiting").show();
	setTimeout(function(){calculateGlobalRisks(geojson, countryNameData, spreadData, $("#migrationval").val(), $("#gravityval").val(), $("#adjacencyval").val(), $("#ginval").val(), $("#lbrval").val(), $("#sleval").val())}, 0);
}

info.addTo(map);

// Disable dragging when user's cursor enters the element
info.getContainer().addEventListener('mouseover', function () {
	map.dragging.disable();
	map.doubleClickZoom.disable();
});

// Re-enable dragging when user's cursor leaves the element
info.getContainer().addEventListener('mouseout', function () {
	map.dragging.enable();
	map.doubleClickZoom.enable();
});

cases.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'cases'); // create a div with a class "info"
	this.update();
	return this._div;
};

// method that we will use to update the control based on feature properties passed
cases.update = function () {
	this._div.innerHTML = "<h4>Ebola Cases</h4>" + 
	"<table>" +
	"<tr class='oddrowcol'><td><b>Guinea:</b></td><td><input id='ginval' type=number value='20'/><br /></td></tr>" +
	"<tr class='evenrowcol'><td><b>Liberia:</b></td><td><input id='lbrval' type=number value='0'/><br /></td></tr>" +
	"<tr class='oddrowcol'><td><b>Sierra Leone:</b></td><td><input id='sleval' type=number value='2'/><br /></td></tr>" +
	"</table>" +
	"<input type='button' value='Update' onclick='refreshFromUI()'/>";
};

cases.addTo(map);

// Disable dragging when user's cursor enters the element
cases.getContainer().addEventListener('mouseover', function () {
	map.dragging.disable();
	map.doubleClickZoom.disable();
});

// Re-enable dragging when user's cursor leaves the element
cases.getContainer().addEventListener('mouseout', function () {
	map.dragging.enable();
	map.doubleClickZoom.enable();
});

legend.onAdd = function (map) {

	var div = L.DomUtil.create('div', 'info legend'),
		grades = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95],
		labels = [];
	// loop through our density intervals and generate a label with a colored square for each interval
	for (var i = 0; i < grades.length; i++) {
		div.innerHTML +=
			'<i style="background:' + getValue(grades[i]) + '"></i> ' +
			grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
	}

	return div;
};

legend.addTo(map);

waiting.onAdd = function(map) {
	this._div = L.DomUtil.create('div', 'waiting'); // create a div with a class "info"
	this.update();
	return this._div;
}

waiting.update = function () {
	this._div.innerHTML = "<h4>Calculating Global Risk</h4>";
}

waiting.addTo(map);