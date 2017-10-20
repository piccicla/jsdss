/* eslint-disable*/

/*
This file store code for histogram generation:
window.jsdss.histo.linspace
window.jsdss.histo.selectOutsideRange
window.jsdss.histo._histogram
window.jsdss.histo.histogram
*/

// requires
// bokejs


// initialize a custom namespace if not available
window.jsdss = window.jsdss || {};
window.jsdss.histo || (window.jsdss['histo']={});


/**
 *calculate the average value of a field for a ol.Collection of features
 * @param {Object} FeatureCollection -  ol.Collection of features
 * @param {String} field -  the field to ise for the average
 * @param {Number} precision -  number of decimals
 */
window.jsdss.histo.calculateaverage = function (featureCollection,field, precision=2){
  var sum = 0;
  //featureCollection.array_.forEach(function(f){ sum+=f.getProperties()[field]});
  featureCollection.getArray().forEach(function(f){ sum+=f.getProperties()[field]});
  return (sum / featureCollection.getLength()).toFixed(precision);
}


/**
*create n intervals between a and b, this will be used for histogram bins
 * @param {number} a - lower boundary
 * @param {number} b - higher boundary
*/
window.jsdss.histo.linspace = function (a,b,n) {
				if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
				if(n<2) { return n===1?[a]:[]; }
				var i,ret = Array(n);
				n--;
				for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
				return ret;
};


/**
*select features below and above a threshold exclusive
* @param {Object} layer - openlayers3 layer
* @param {string} filterAttribute -  attribute to use as  filter
* @param {Object} selectedFeatures -  array to store selected features
* @param {Number} lowBoundary -  features with "filterAttribute" lower than this will be selected
* @param {Number} highBoundary -  features with "filterAttribute" higher than this will be selected
*/
window.jsdss.histo.selectOutsideRange =function ( layer, filterAttribute, selectedFeatures, lowBoundary,highBoundary){

	//filter all features outside the boundaries
	var selectedRange = layer.getSource().getFeatures().filter( function(feature){
		return feature.getProperties()[filterAttribute] < lowBoundary || feature.getProperties()[filterAttribute] > highBoundary;
	});

	if ("includes" in Array.prototype){ //check ecmascript6 "includes"
		selectedRange.forEach(function(feature){
			//if  (!(selectedFeatures.array_.includes(feature))){
        if  (!(selectedFeatures.getArray().includes(feature))){
							selectedFeatures.push(feature);
			}
		});
	}
	else{
		selectedRange.forEach(function(feature){
			//if  (!(selectedFeatures.array_.indexOf(feature) > -1)){
      if  (!(selectedFeatures.getArray().indexOf(feature) > -1)){
					selectedFeatures.push(feature);
			}
		});
	}

	//iterate filtered features and add to the features to be deleted
	selectedRange.forEach(function(feature){

				if ("includes" in Array.prototype){	//check ecmascript6 "includes"
					//if  (!(selectedFeatures.array_.includes(feature))){
            if  (!(selectedFeatures.getArray().includes(feature))){
						selectedFeatures.push(feature);
					}
				}
				else{
				//if  (!(selectedFeatures.array_.indexOf(feature) > -1)){
          if  (!(selectedFeatures.getArray().indexOf(feature) > -1)){
								selectedFeatures.push(feature);
						}
				}
	});

};


/*window.jsdss.histo.histogram=  function(layer, attribute, size=10) {

	//get min/max values for the layer
	var minMax = window.jsdss.colors.attributeMinMax(layer, attribute);

	//initialize histogram
    var bins = Math.ceil((minMax[1] - minMax[0] + 1) / size);
    var histogram = new Array(bins);
    for (var i = 0; i < bins; i++) histogram[i] = 0;

	//fill in the histogram
	layer.getSource().forEachFeature(function(f){
        histogram[Math.floor((f.getProperties()[attribute] - minMax[0]) / size)]++;
	});

    return histogram;
}*/


/* code based on https://github.com/eoinmurray/histogram  */
// "private" function that returns the histogram
window.jsdss.histo._histogram = function(opts) {
  var
	data = opts.data,
	bins_temp = opts.bins,
	i = bins_temp.length;

  var bisector = function(f) {
	return {
	  left: function(a, x, lo, hi) {
		if (arguments.length < 3) lo = 0;
		if (arguments.length < 4) hi = a.length;
		while (lo < hi) {
		  var mid = lo + hi >>> 1;
		  if (f.call(a, a[mid], mid) < x) lo = mid + 1;
		  else hi = mid;
		}
		return lo;
	  },
	  right: function(a, x, lo, hi) {
		if (arguments.length < 3) lo = 0;
		if (arguments.length < 4) hi = a.length;
		while (lo < hi) {
		  var mid = lo + hi >>> 1;
		  if (x < f.call(a, a[mid], mid)) hi = mid;
		  else lo = mid + 1;
		}
		return lo;
	  }
	};
  };

  var hist_bisector = bisector(function(d) { return d; });
  var bisectLeft = hist_bisector.left;
  var bisectRight = hist_bisector.right;
  var bisect = bisectRight;

  var minimum = function(array, f) {
	var i = -1,
		n = array.length,
		a,
		b;
	if (arguments.length === 1) {
	  while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
	  while (++i < n) if ((b = array[i]) != null && a > b) a = b;
	} else {
	  while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
	  while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
	}
	return a;
  };

  var maximum = function(array, f) {
	var i = -1,
		n = array.length,
		a,
		b;
	if (arguments.length === 1) {
	  while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
	  while (++i < n) if ((b = array[i]) != null && b > a) a = b;
	} else {
	  while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
	  while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
	}
	return a;
  };

  function value(x) {
	if (!arguments.length) return valuer;
	valuer = x;
	return histogram;
  };

  function range(x) {
	if (!arguments.length) return ranger;
	ranger = hist_functor(x);
	return histogram;
  };

  function hist_functor(v) {
	return typeof v === "function" ? v : function() { return v; };
  };

  function bins(x) {
	if (!arguments.length) return binner;
	binner = typeof x === "number"
		? function(range) { return hist_layout_histogramBinFixed(range, x); }
		: hist_functor(x);
	return histogram;
  };

  function frequency(x) {
	if (!arguments.length) return frequency;
	frequency = !!x;
	return histogram;
  };

  function hist_layout_histogramBinSturges(range, values) {
	return hist_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
  }

  function hist_layout_histogramBinFixed(range, n) {
	var x = -1,
		b = +range[0],
		m = (range[1] - b) / n,
		f = [];
	while (++x <= n) f[x] = m * x + b;
	return f;
  }

  function hist_layout_histogramRange(values) {
	return [minimum(values), maximum(values)];
  }

  var frequency = true,
	valuer = Number,
	ranger = hist_layout_histogramRange,
	binner = hist_layout_histogramBinSturges;

  bins(bins_temp)

  var bins = [],
	values = data.map(valuer, this),
	range = ranger.call(this, values, i),
	thresholds = binner.call(this, range, values, i),
	bin,
	i = -1,
	n = values.length,
	m = thresholds.length - 1,
	k = frequency ? 1 : 1 / n,
	x;

  while (++i < m) {
	bin = bins[i] = [];
	bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
	bin.y = 0;
  }

  if (m > 0) {
	i = -1; while(++i < n) {
	  x = values[i];
	  if (x >= range[0] && x <= range[1]) {
		bin = bins[bisect(thresholds, x, 1, m) - 1];
		bin.y += k;
		bin.push(data[i]);
	  }
	}
  }

  return bins;
};


//return the histogram for a openlayers3 layer attribute
window.jsdss.histo.histogram =  function(layer, attribute, nbins=10) {

	//get min/max values for the layer
	var minMax = window.jsdss.colors.attributeMinMax(layer, attribute);

	//define bins and calculate the histogram
	var bins = window.jsdss.histo.linspace(minMax[0], minMax[1], nbins+1);
	var data =[];
	layer.getSource().forEachFeature(function(f){
		data.push(f.getProperties()[attribute])
	});

	return window.jsdss.histo._histogram({
				data : data,
				bins : bins
			});
};

/*
/**
* Initialize a histogram
* @param {string} id - openlayers3 layer
* @param {Number} plot_width -  attribute to use as  filter
* @param {Number} plot_height -  array to store selected features
*/
/*window.jsdss.histo.drawHisto = function( id, plot_width, plot_height){

	window.jsdss.histo.histoplot = Bokeh.Plotting.figure({plot_width:400, plot_height:400});
	Bokeh.Plotting.show(window.jsdss.histo.histoplot, document.getElementById('plot'));
}*/


/**
* Update a histogram
* @param {options} id - options with new data
* @param {Number} plot_width -  attribute to use as  filter
* @param {Number} plot_height -  array to store selected features
*/
/*window.jsdss.histo.refreshHisto = function(options){

	window.jsdss.histo.histoplot.quad({top:options.tp,
			bottom:options.bottom,
			left:options.left,
			right:options.right,
			line_color: options."#f0027f", fill_color:options."#B3DE69"})

}

*/




