/* eslint-disable*/

/*
This file store code for colour management:
window.jsdss.colors.graduatedColorFactory
window.jsdss.colors.attributeMinMax
window.jsdss.colors.styleGraduated
*/


// initialize a custom namespace
window.jsdss = window.jsdss || {};
window.jsdss.colors || (window.jsdss['colors']={});


// create graduate colors between rgb1 and rgb2 e.g. [254, 240,217] and [179, 0, 0]
window.jsdss.colors.graduatedColorFactory = function (classNum, rgb1,rgb2) {
	var colors = [];
	var steps = classNum - 1;
	var redStep = (rgb2[0] - rgb1[0]) / steps;
	var greenStep = (rgb2[1] - rgb1[1]) / steps;
	var blueStep = (rgb2[2] - rgb1[2]) / steps;
	for (var i = 0; i < steps; i += 1) {
		var red = Math.ceil(rgb1[0] + redStep * i);
		var green = Math.ceil(rgb1[1] + greenStep * i);
		var blue = Math.ceil(rgb1[2] + blueStep * i);
		colors.push([red, green, blue, 1]);
	}
	colors.push([rgb2[0], rgb2[1], rgb2[2], 1]);
	return colors;
};

//return min /max values for a column in a layer
//if the column is not of type number return undefined
window.jsdss.colors.attributeMinMax = function(layer, attribute){

	//check we have a number column
	if (!(typeof(layer.getSource().getFeatures()[0].getProperties()[attribute]) === 'number')) {
		console.error ('A numeric column is required for calculating min/max');
		return;
	}
	var min = 0.0
	var max = 0.0
	layer.getSource().forEachFeature(function(f){
		if(f.getProperties()[attribute] < min){
			min = f.getProperties()[attribute];
		}
		else if (f.getProperties()[attribute] > max){
			max = f.getProperties()[attribute];
		}
	});
	return [min, max];
};


//apply graduated scale to a layer attribute between rgb1 and rgb2 e.g. [254, 240,217] and [179, 0, 0]
window.jsdss.colors.styleGraduated = function (layer, attribute, rgb1,rgb2) {

		var minmax = window.jsdss.colors.attributeMinMax(layer, attribute)

		if (minmax){
			var min = minmax[0];
			var max = minmax[1];
			var step = (max - min) / 5;
			var colors = window.jsdss.colors.graduatedColorFactory(5, rgb1, rgb2);

			//cache the styles
			var styleCache = {};

			for (i = 0; i < colors.length; i++) {
				styleCache[i] = new ol.style.Style({
								image: new ol.style.Circle({
								radius: 4,
								fill: new ol.style.Fill({color: colors[i]}),
								stroke: new ol.style.Stroke({color: [0, 0, 0, 1],width: 1})
							  })
							});
			}

			//set the sty;e
			layer.setStyle(function (feature, res) {
				var property = feature.get(attribute);
				if(property < min + step * 1){return styleCache[0];}
				else if(property < min + step * 2){return styleCache[1];}
				else if(property < min + step * 3){return styleCache[2];}
				else if(property < min + step * 4){return styleCache[3];}
				else{return styleCache[4];}

			});
		}
		else{
			return
		}
};

