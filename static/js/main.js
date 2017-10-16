/* eslint-disable*/
/*
This file store the code for filtering tool :

*/



////requires
//histo.js
//colors.js
//jscolor.js


// initialize a custom namespace if not available
window.jsdss = window.jsdss || {};
window.jsdss.data = {};
////////////storing debug variables
window.jsdss.debug = {};
window.jsdss.debug.histo = []
window.jsdss.debug.dataType = 'canopy'
var debug = true;

/////////////////
// dataType should be passed by the framework, now just debug
window.jsdss.data.dataType = window.jsdss.debug.dataType;

//////////////////////// get reference to dom elements
var average = document.getElementById('infoAverageKeep');
var automateColors = document.getElementById('automateColors');
var averageRemove = document.getElementById('infoAverageRemove')
var clearTempRem = document.getElementById('clearTempRemoved');
var addRemoved = document.getElementById('addRemoved');
var addClip = document.getElementById('addClip');
var editClip = document.getElementById('editClip');
var clip = document.getElementById('clip');
var applyColors = document.getElementById('applyColors');
var infoKeep = document.getElementById('infoKeep');
var histogram = document.getElementById('histogram');
var clipRange = document.getElementById('clipRange');
var keepAll = document.getElementById('keepAll');
var keepSelection = document.getElementById('keepSelection');
var uploadSelection = document.getElementById('uploadSelection');
/////////////////////


//////////////////utility functions

//function to calculate the average value of a field for a ol.Collection of features
function calculateaverage(featureCollection,field, precision=2){
	var sum = 0;
	featureCollection.array_.forEach(function(f){ sum+=f.getProperties()[field]});
	return (sum / featureCollection.getLength()).toFixed(precision);
};

////////////////////////////////


//ol view, shared between maps
var view = new ol.View({
	center: [-13626654, 4639902 ], //todo: automate center when downlading data
	zoom: 15
  })


var bingLayer = new ol.layer.Tile({
  visible: true,
  preload: Infinity,
  source: new ol.source.BingMaps({
		key: 'AhpitiRZ52gxx8vlBVKnuZoEA6B0OHYRjILKE11zB1823EU9l2SoJ4ZVGWFCYxRz',
		imagerySet: 'AerialWithLabels',
		// use maxZoom 19 to see stretched tiles instead of the BingMaps
		// "no photos at this zoom level" tiles
		maxZoom: 19
	})
  })


// map with points to be kept
var mapKeep = new ol.Map({
  target: 'map-keep',
  renderer:'webgl',
  layers: [
	  /*
	  new ol.layer.Tile({
		source: new ol.source.OSM()
	  }),*/

	  bingLayer

	  // wms image, just to see if it works
	  /*,new ol.layer.Image({
	  visible: false,
	  extent: [-13884991, 2870341, -7455066, 6338219],
	  source: new ol.source.ImageWMS({
		url: 'https://ahocevar.com/geoserver/wms',
		params: {'LAYERS': 'topp:states'},
		ratio: 1,
		serverType: 'geoserver',
		crossOrigin: 'anonymous' //used this to avoid CORS error
	  })
	})*/

  ],
  view: view
});



/////////  original  dataset //////////////

//source for geojson, this should be downloaded from the server
var geojsource =new ol.source.Vector({
		format: new ol.format.GeoJSON(),
		url: './data/points.json' //todo: downlading data
	  })

// common style for points, final aplication may let the usert set the style
var pointStyle = new ol.style.Style({
		  image: new ol.style.Circle({
			radius: 4,
			fill: new ol.style.Fill({color: 'red'}),
			stroke: new ol.style.Stroke({color: 'white', width: 1})
		  })
		})
// point geojson layer from url
var pointLayer = new ol.layer.Vector({
	  visible: true,
	  source: geojsource,
	  style: pointStyle
	});
mapKeep.addLayer(pointLayer);


///// try to read custom geojson ////////////////////
var routeJSON0 = {"features": [{"geometry": {"coordinates": [-122.4100972, 38.42791286], "type": "Point"}, "type": "Feature", "properties": {"value": 0.805, "id_cdata": 5}}, {"geometry": {"coordinates": [-122.42, 38.42791286], "type": "Point"}, "type": "Feature", "properties": {"value": 0.805, "id_cdata": 7}}],"type": "FeatureCollection"}

var routeJSON = {"features": [{"geometry": { "type": "Polygon",
"coordinates": [[ [-122.415, 38.42791286], [-122.4100972, 38.42791286], [-122.4100972, 38.43], [-122.415, 38.43], [-122.415, 38.42791286] ]]}, "type": "Feature", "properties": {"value": 0.805, "id_cdata": 7}}],"type": "FeatureCollection"}

var format = new ol.format.GeoJSON({
	featureProjection:"EPSG:3857"   /// spcify the map projection ;is this necessary?
});
var vectorSource = new ol.source.Vector({
	features: format.readFeatures(routeJSON)
});
// point geojson layer from local source
var drawLayer = new ol.layer.Vector({
	  visible: true,
	  source: vectorSource,
	  /*
		style: new ol.style.Style({
		  image: new ol.style.Circle({
			radius: 4,
			fill: new ol.style.Fill({color: 'red'}),
			stroke: new ol.style.Stroke({color: 'white', width: 1})
		  })
		})*/

	})
//mapKeep.addLayer(drawLayer);
//////////////////////////////////////////////




/////////////////create an overlay to show the  info
var overlay = new ol.Overlay({
  element: document.getElementById('popup-container'),
  positioning: 'bottom-center',
  offset: [0, -10]
});
mapKeep.addOverlay(overlay);
//show info when clicking on the point   //todo: make it work
/*var showInfo = mapKeep.on('click', function(e) {
  overlay.setPosition();
  var features = mapKeep.getFeaturesAtPixel(e.pixel);
  if (features) {
	//console.log(features)
	var coords = features[0].getGeometry().getCoordinates();
	var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coords));
	//overlay.getElement().innerHTML = hdms;
	overlay.getElement().innerHTML = features[0].getProperties()['value']
	overlay.setPosition(coords);
  }
});*/

//delete average value when clicking on the map
mapKeep.on('click', function(e) {
	average.innerHTML = 'Average value ';
});


/////// draw a new boundary for clipping
const sourceClip = new ol.source.Vector();
const layer = new ol.layer.Vector({
	source: sourceClip
});
mapKeep.addLayer(layer); //todo: the user should select a boundary from the database too


//initialize interaction for drawing a polygon
var drawPolygon = new ol.interaction.Draw({
  type: 'Polygon',
  source: sourceClip
});

//initialize interaction for editing a polygon
var editPolygon = new ol.interaction.Modify({
  source: sourceClip
});


// select points to remove
var select = new ol.interaction.Select({
	layers:[pointLayer]
	//,multi: true
});
mapKeep.addInteraction(select);

var selectedFeatures = select.getFeatures();

//mapKeep.unByKey(showInfo);	//todo: let the single selection with info


// set the starting colors for the visualization and convert to rgb
var rgb1= [254, 255,255]; var rgb2= [255, 0, 0];
function updateLowColor(pick) {
	rgb1=[Math.round(pick.rgb[0]),Math.round(pick.rgb[1]),Math.round(pick.rgb[2])]
}
function updateHighColor(pick) {
	rgb2=[Math.round(pick.rgb[0]),Math.round(pick.rgb[1]),Math.round(pick.rgb[2])];
}


//todo: how to sTart dragbox on a mobile device?
var dragBox = new ol.interaction.DragBox({
condition: ol.events.condition.platformModifierKeyOnly
});

// a DragBox interaction used to select features to delete by drawing boxes
mapKeep.addInteraction(dragBox);
dragBox.on('boxend', function() {
	// features that intersect the box are added to the collection of
	// selected features
	var extent = dragBox.getGeometry().getExtent();
	if ("includes" in Array.prototype){	//check ecmascript6 'includes'
		geojsource.forEachFeatureIntersectingExtent(extent, function(feature) {
			if  (!(selectedFeatures.array_.includes(feature)))
				{selectedFeatures.push(feature);}
		});
	}
	else{ //noecmascript6
		geojsource.forEachFeatureIntersectingExtent(extent, function(feature) {

			//check if the feature is already in the selection, if not add
			//let add = true
			//for (var i = 0, ii = selectedFeatures.array_.length; i < ii; ++i) {
			/*if (selectedFeatures.array_[i] === feature) {
				add=false;
			  break;  //exit for EachF...
			}*/
			//if(add){selectedFeatures.push(feature);}
			//}


			/*if  (!(selectedFeatures.array_.indexOf(feature) > -1)){
				selectedFeatures.push(feature);
			};*/

			if  (!(selectedFeatures.array_.indexOf(feature) > -1))
				{selectedFeatures.push(feature);}

		}); //end geojsource.forEachFeatureIntersectingExtent
	}

	// show average value for all the selected points
	average.innerHTML = 'Average value ' + calculateaverage(selectedFeatures,'value');
});


/*dragBox.on('boxend', function() {
//selectedFeatures.clear();
	let sum = 0;
	select.getFeatures().array_.forEach(function(f){ sum+=f.getProperties()['value']});
	average.innerHTML = 'Average value ' + (sum/select.getFeatures().getLength()).toFixed(2);
});*/



///// this is the map with the points to be removed  ////////////
var mapRemove = new ol.Map({
  target: 'map-remove',
  renderer:'webgl',
  layers: [
  /*
  new ol.layer.Tile({
	source: new ol.source.OSM()
  }),*/
		bingLayer
  ],
  view: view
});

// empty the average when clicking on the map
mapRemove.on('click', function(){
	averageRemove.innerHTML = 'Average value '
})

// empty vector source for features to be moved back to the keep map
var selectedVectorSource = new ol.source.Vector()
var selectedVector = new ol.layer.Vector({
		source:selectedVectorSource,style: pointStyle
});
mapRemove.addLayer(selectedVector);


// a normal select interaction to handle click
var selectRight = new ol.interaction.Select({
	layers:[selectedVector]
	//,multi: true
});
mapRemove.addInteraction(selectRight);
var selectedFeaturesRight = selectRight.getFeatures();


//mapKeep.unByKey(showInfo);	//todo: fix label for single selection



// a DragBox interaction by drawing boxes; used to select features to be sent bak to the keep map
//todo: how do I select on mobile devices
var dragBoxRight = new ol.interaction.DragBox({
	condition: ol.events.condition.platformModifierKeyOnly
});
mapRemove.addInteraction(dragBoxRight);
dragBoxRight.on('boxend', function() {
	// features that intersect the box are added to the collection of
	// selected features
	var extentRight = dragBoxRight.getGeometry().getExtent();
	if ("includes" in Array.prototype){	//check ecmascript6 'includes'
		selectedVectorSource.forEachFeatureIntersectingExtent(extentRight, function(feature) {
			if  (!(selectedFeaturesRight.array_.includes(feature)))
				{selectedFeaturesRight.push(feature);}
		});
	}
	else{

		selectedVectorSource.forEachFeatureIntersectingExtent(extentRight, function(feature) {

			if  (!(selectedFeaturesRight.array_.indexOf(feature) > -1))
				{selectedFeaturesRight.push(feature);}
		});
	}


	// show average value for all the selected points
	//console.log(calculateaverage(selectedFeaturesRight,'value'));
	averageRemove.innerHTML = 'Average value ' + calculateaverage(selectedFeaturesRight,'value');

});



///////////////////////////////////BUTTONS KEEP MAP////////////////////////

//clear all the selected features on the keep map
clearTempRem.addEventListener('click', function () {
	if(selectedFeatures){
		selectedFeatures.clear();
		average.innerHTML = 'Average value ';
	}
});

//  add selected features to the remove map
addRemoved.addEventListener('click', function () {
	if(selectedFeatures.getLength()){
		//move features to the other map
		selectedVectorSource.addFeatures(selectedFeatures.array_);
		//remove features from the layer
		selectedFeatures.forEach(function(feature){
			//console.log('remove feature');
			geojsource.removeFeature(feature);
		});
		//clear this selection
		selectedFeatures.clear();

		//automatic style change?
		if(automateColors.checked){
			//console.log('changing style');
			window.jsdss.colors.styleGraduated(pointLayer, 'value', rgb1, rgb2 );
		}
	}
});

// draw a new boundary
var clipping = false
addClip.addEventListener('click', function () {
	clipping = !clipping
	if(clipping){
		if(editing){
			editing = !editing
			editClip.innerHTML = 'Edit boundary'
			mapKeep.removeInteraction(editPolygon);
		}
		addClip.innerHTML = 'Stop Clip'
		mapKeep.addInteraction(drawPolygon);

	}else{
		addClip.innerHTML = 'Add Clip'
		mapKeep.removeInteraction(drawPolygon);
	}
});

drawPolygon.on('drawstart', function(e) {
	sourceClip.clear()
});


// edit the boundary
var editing = false
editClip.addEventListener('click', function () {
	////console.log("changing editing");
	if(sourceClip.getFeatures().length){ //if there is a polygon
		editing = !editing
		if(editing){
			if(clipping){
				//console.log("removing clipping interaction");
				clipping=!clipping;
				addClip.innerHTML = 'Add Clip';
				mapKeep.removeInteraction(drawPolygon);
			}
			//console.log("I am editing");
			editClip.innerHTML = 'Stop edit'
			mapKeep.addInteraction(editPolygon);
		}else{
			//console.log("I am NOT editing");
			editClip.innerHTML = 'Edit boundary'
			mapKeep.removeInteraction(editPolygon);
		}
	}
});
//every time a new boundary is added delete the current
drawPolygon.on('drawstart', function(e) {
	sourceClip.clear()
});

// clip the features with the current boundary
// todo: this is inefficient, think about using turf.js
clip.addEventListener('click', function () {

	if(sourceClip.getFeatures().length){
		/*
		var thePolygonExtent = sourceClip.getFeatures()[0].getGeometry().getExtent()
		var thefeaturesinside = geojsource.getFeaturesInExtent(sourceClip.getFeatures()[0].getGeometry().getExtent());


		var tempFeatures = []

		geojsource.getFeatures().forEach(function(feature){

			if  (!(thefeaturesinside.includes(feature))){
				tempFeatures.push(feature);
			}

		});

		if (tempFeatures.length >0){
			selectedVectorSource.addFeatures(tempFeatures);
		}

	}*/

	/*
	var thePolygonExtent = sourceClip.getFeatures()[0].getGeometry().getExtent()

	var tempFeatures = []
	var tempFeatures2 = []
	geojsource.forEachFeatureIntersectingExtent(thePolygonExtent, function(f){
			tempFeatures.push(f);
		})

	geojsource.getFeatures().forEach(function(feature){

			if  (!(tempFeatures.includes(feature))){
				tempFeatures2.push(feature);
			}

		});

		if (tempFeatures2.length >0){
			selectedVectorSource.addFeatures(tempFeatures2);
		}
		*/
		var tempFeatures = []
		var polygonGeometry = sourceClip.getFeatures()[0].getGeometry()
		geojsource.getFeatures().forEach(function(feature){

			var coords = feature.getGeometry().getCoordinates();

			if  (!(polygonGeometry.intersectsCoordinate(feature.getGeometry().getCoordinates()))){

					tempFeatures.push(feature);

			}

		});

		if (tempFeatures.length >0){
			//add features to new map
			selectedVectorSource.addFeatures(tempFeatures);
			//remove features from original map
			tempFeatures.forEach(function(feature){
			//console.log('remove feature');
			geojsource.removeFeature(feature);
			//remove polygon
			sourceClip.clear();
		});
		}

		//automatic style change?
		if(automateColors.checked){
			//console.log('changing style');
			window.jsdss.colors.styleGraduated(pointLayer, 'value', rgb1, rgb2 );
		}

	} // end if(sourceClip.getFeatures().length)
});   //end clip.addEventListener('click')

// applyStyle
// http://openlayersbook.github.io/ch06-styling-vector-layers/example-07.html
// mastering openlayers3 pag 91
// openlayers3 cookbook p.212
applyColors.addEventListener('click', function () {
	//console.warn('applyStyle disabled due to performance');
	window.jsdss.colors.styleGraduated(pointLayer, 'value', rgb1, rgb2 )

});



var histo =[]
histogram.addEventListener('click', function () {
	/*
	var linspace = function linspace(a,b,n) {
		if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
		if(n<2) { return n===1?[a]:[]; }
		var i,ret = Array(n);
		n--;
		for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
		return ret;
	};

	var x = linspace(0, 100, 100),
		y = [],
		num;

	console.log(x);

	for(var i = 0; i < 2000; i ++){
		num = - Math.log(Math.random());
		y.push(num);
		console.log(num);
	}
	var histos  = window.jsdss.histo.histogram({
		data : y,
		bins : x
	});

	console.log(histos);
	*/

	var nBins = parseInt(document.getElementById('nBins').value);
	histo  = window.jsdss.histo.histogram(pointLayer, 'value', nBins) //todo: user can select multiple values
	///////////////////
	if (debug){
		window.jsdss.debug.histo = histo
		console.log(histo);
	}
	////////////////


	/////get the min and max values from the histogram, the loops are necessary to
	/////skip empty bins
	//var min = histo[0].x
	var min = void 0;
	for (var i = 0; i< histo.length; i++) {
		if(histo[i].length){ //this is true when length>0
			//min = histo[i].x; this would return the edge of the bin
			min = Math.min.apply(Math, histo[i]);
			break;
		}
	}
	//var length = histo.length
	//var max = histo[length-1].x + histo[length-1].dx
	var max = void 0;
	for (var i = histo.length-1; i>-1; i--) {
		if(histo[i].length){ //this is true when length>0
			//max = histo[i].x + histo[i].dx;//this would return the edge of the bin
			max = Math.max.apply(Math, histo[i]);
			break;
		}
	}

	infoKeep.innerHTML = 'min: ' + min + ' max: ' + max;
	document.getElementById('lowTh').value = min;
	document.getElementById('highTh').value = max;


	// update echarts histogram // todo: change with bokehjs when I get an answer for the bug
	// I need a list with all the central values and a list with all the height

	var centers = [];
	var high = [];
	if (histo.length>0){
		for (var i = 0; i< histo.length; i++) {
			centers.push(((histo[i].x+(histo[i].x+histo[i].dx))/2).toFixed(2)) // central value
			high.push(histo[i].length)
		}

		myChart.setOption({
			xAxis: {
				data: centers
			},
			series: [{
				// find series by name
				name: 'data',
				data: high
			}]
		});

		if (debug){
		window.jsdss.debug.centers = centers
		//console.log(centers);
		window.jsdss.debug.high = high
		//console.log(high);
		}

	}
});


//get threshold values

clipRange.addEventListener('click', function () {

	var lowTh = parseFloat(document.getElementById('lowTh').value);
	var highTh = parseFloat(document.getElementById('highTh').value);

	if (lowTh<highTh){
		window.jsdss.histo.selectOutsideRange( pointLayer, 'value', selectedFeatures, lowTh,highTh)
	} else{
		console.log('check threshold values!');
	}
});

///////////////////////////////////BUTTONS REMOVE MAP////////////////////////

// move back all the features to the keep map

keepAll.addEventListener('click', function () {
	if(selectedVectorSource.getFeatures().length)
		{
			//clear any selection
			selectedFeaturesRight.clear()
			//move features to the other map
			geojsource.addFeatures(selectedVectorSource.getFeatures());
			//clear the layer
			selectedVectorSource.clear();
			averageRemove.innerHTML = 'Average value '

			//automatic style change?
			if(automateColors.checked){
				//console.log('changing style');
				window.jsdss.colors.styleGraduated(pointLayer, 'value', rgb1, rgb2 );
			}

		}
});

// move the selected features back to the original map

keepSelection.addEventListener('click', function () {
	if(selectedFeaturesRight.getLength()){
		//move features to the other map
		geojsource.addFeatures(selectedFeaturesRight.array_);
		//remove features from the layer
		selectedFeaturesRight.forEach(function(feature){
			//console.log('remove feature');
			selectedVectorSource.removeFeature(feature);
		});
		//clear this selection
		selectedFeaturesRight.clear();
		averageRemove.innerHTML = 'Average value ';

		//automatic style change?
		if(automateColors.checked){
			//console.log('changing style');
			window.jsdss.colors.styleGraduated(pointLayer, 'value', rgb1, rgb2 );
		}

	}
});


// add the selected features ID to a list, ready to be uploaded with a POST request
uploadSelection.addEventListener('click', function () {

	window.jsdss.data.uploadIds = []
	if (geojsource.getFeatures().length){
		switch (window.jsdss.data.dataType) {
	  case "canopy":
		geojsource.getFeatures().forEach(function(f){window.jsdss.data.uploadIds.push(f.values_.id_cdata)})
		break;
	  case "yield":
		geojsource.getFeatures().forEach(function(f){window.jsdss.data.uploadIds.push(f.values_.id_ydata)})
		break;
	  case "soil":
		geojsource.getFeatures().forEach(function(f){window.jsdss.data.uploadIds.push(f.values_.id_sdata)})
		break;
	  case "sensor":
		geojsource.getFeatures().forEach(function(f){window.jsdss.data.uploadIds.push(f.values_.id_sdata)})
		break;
	  }

	  console.log('features ready to be uploaded')
	}

	// convert to string ready for the post request
	// "111111111,"*20000 will be around 200kb
	// uploadIds = uploadIds.toString();
})




