function checkValues(d){
	var sex;
	if (d.Sex == 0){
		sex = 'Male';
	} else {sex = 'Female';}
	
	var chestPain;
	if (d.ChestPainType == 0) {
		chestPain = 'Asymptomatic';
	} else if (d.ChestPainType == 1){
		chestPain = "Typical Angina";
	} else if (d.ChestPainType == 2){
		chestPain = "Atypical Angina";
	} else {chestPain = "Non-Anginal Pain"};
	
	var slope;
	if (d.ST_Slope == 0) {
		slope = 'Down';
	} else if (d.ST_Slope == 1){
		slope = "Flat";
	} else {slope = "Up"};
	
	var ecg;
	if (d.RestingECG == 0) {
		ecg = 'Normal';
	} else if (d.RestingECG == 1){
		ecg = "ST";
	} else {ecg = "LVH"};
	
	return 'Values \nSex: '+ sex +'\nAge: ' + d.Age + '\nCholesterol: ' + d.Cholesterol + '\nChest Pain Type: ' + chestPain +
							  '\nMax Heart Rate: ' + d.MaxHR + '\nResting ECG: ' + ecg + '\nST Slope: ' + slope;
	
}

function loadScatterplot(){
	//d3version3.csv('./static/datasets/heart_quantitative.csv', function (data) {
	//var dataset_scatter = d3version7.csv('./static/datasets/heart_quantitative.csv');
	dataset_scatter.then(function (data) {
	  // Variables
	  data = data.filter(function(d){ return datasetFiltering(d, false)});
	  var div = d3version3.select('#scatterplot');
	  var margin = { top: 50, right: 50, bottom: 50, left: 50 };
	  var h = 600 - margin.top - margin.bottom;
	  var w = 600 - margin.left - margin.right;
		//var formatPercent = d3version3.format('.2%')
		// Scales
	  var colorScale = d3version3.scale.category20();
	  var min_x, min_y, value_x, value_y;
	  var tendinaX = document.getElementById("tendinaX_scatter").value;
	  var tendinaY = document.getElementById("tendinaY_scatter").value;
	  /*switch(tendinaX) {
		case "Age": value_x = 'd.Age'; break;
		case "Cholesterol": value_x = 'd.Cholesterol'; break;
		case "RestingBP": value_x = 'd.RestingBP'; break;
		case "MaxHR": value_x = 'd.MaxHR'; break;
	  }
	  switch(tendinaY) {
		case "Age": value_y = 'd.Age'; break;
		case "Cholesterol": value_y = 'd.Cholesterol'; break;
		case "RestingBP": value_y = 'd.RestingBP'; break;
		case "MaxHR": value_y = 'd.MaxHR'; break;
	  }*/
	  var response = data.map(function( d ) {
		  var value = {};
			switch(tendinaX) {
				case "Age":  value.x = d.Age;  break;
				case "Cholesterol": value.x = d.Cholesterol; break;
				case "RestingBP": value.x = d.RestingBP; break;
				case "MaxHR": value.x = d.MaxHR; break;
			}
			switch(tendinaY) {
				case "Age":  value.y = d.Age;  break;
				case "Cholesterol": value.y = d.Cholesterol; break;
				case "RestingBP": value.y = d.RestingBP; break;
				case "MaxHR": value.y = d.MaxHR; break;
			}
			value.RestingECG = d.RestingECG;
			return value;
		})
		
		
		var xScale = d3version3.scale.linear()
						.domain([
							//d3version3.min([0,d3version3.min(data,function (d) { return d.Age })]),
							min_x = d3version3.min([d3version3.min(response,function (d) { return parseInt(d.x) }),d3version3.min(response,function (d) { return parseInt(d.x) })]),
							d3version3.max([min_x,d3version3.max(response,function (d) { return parseInt(d.x) })])
							])
						.range([0,w]);
		
		var yScale = d3version3.scale.linear()
			.domain([
				min_y = d3version3.min([d3version3.min(response,function (d) { return parseInt(d.y) }),d3version3.max(response,function (d) { return parseInt(d.y) })]),
				d3version3.max([min_y,d3version3.max(response,function (d) { return parseInt(d.y) })])
				])
			.range([h,0]);
			
		/*var colorScale = d3version3.scale.threshold()
			.domain([0, 1, 2])
			.range(["#27AE60", "#e67e22", "#eff542", "#e33320"]);*/
		var colorScale = d3version3.scale.category10()
			.domain([0, 1, 2])
			.range(["#ef87be", "#ed30cd", "#b30041"]);
		// SVG
		var svg = div.append('svg')
			.attr("id", "svg_scatterplot")
			.attr('height',h + margin.top + margin.bottom)
			.attr('width',w+250 + margin.left + margin.right)
		  .append('g')
			.attr('transform','translate(' + margin.left + ',' + margin.top + ')');
		// X-axis
		var xAxis = d3version3.svg.axis()
		  .scale(xScale)
		  //.tickFormat(formatPercent)
		  .ticks(10)
		  .orient('bottom');
	  // Y-axis
		var yAxis = d3version3.svg.axis()
		  .scale(yScale)
		  //.tickFormat(formatPercent)
		  .ticks(10)
		  .orient('left');
	  // Circles
	  var circles = svg.selectAll('circle')
		  .data(response)
		  .enter()
		  .append('circle')
		  .attr('cx',function (d) { return xScale(d.x) })
		  .attr('cy',function (d) { return yScale(d.y) })
		  .attr('r','8')
		  .attr('stroke','black')
		  .attr('stroke-width',1)
		  .attr('fill',function (d,i) { return colorScale(d.RestingECG) })
		  .on('mouseover', function () {
			d3version3.select(this)
			  .transition()
			  .duration(500)
			  .attr('r',20)
			  .attr('stroke-width',1)
		  })
		  .on('mouseout', function () {
			d3version3.select(this)
			  .transition()
			  .duration(500)
			  .attr('r',8)
			  .attr('stroke-width',1)
		  })
	    .data(data)
		.append('title') // Tooltip
		  .text(function (d) { return checkValues(d);});
	  // X-axis
	  svg.append('g')
		  .attr('class','axis')
		  .attr('transform', 'translate(0,' + h + ')')
		  .call(xAxis)
		  .attr("fill", "black")
		.append('text') // X-axis Label
		  .attr('class','label')
		  .attr('y',-10)
		  .attr('x',w)
		  .attr('dy','.71em')
		  .style('text-anchor','end')
		  .text('');
	  // Y-axis
	  svg.append('g')
		  .attr('class', 'axis')
		  .call(yAxis)
		  .attr("fill", "black")
		.append('text') // y-axis Label
		  .attr('class','label')
		  .attr('transform','rotate(-90)')
		  .attr('x',0)
		  .attr('y',5)
		  .attr('dy','.71em')
		  .style('text-anchor','end')
		  .text('');
		  
	  svg.append("circle").attr("cx",550).attr("cy",30).attr("r", 10).style("fill", "#ef87be")
	  svg.append("circle").attr("cx",550).attr("cy",60).attr("r", 10).style("fill", "#ed30cd")
	  svg.append("circle").attr("cx",550).attr("cy",90).attr("r", 10).style("fill", "#b30041")
	  svg.append("text").attr("x", 570).attr("y", 30).text("ECG Normal").style("font-size", "18px").attr("alignment-baseline","middle").attr("fill", "black")
	  svg.append("text").attr("x", 570).attr("y", 60).text("ECG ST").style("font-size", "18px").attr("alignment-baseline","middle").attr("fill", "black")
	  svg.append("text").attr("x", 570).attr("y", 90).text("ECG LVH").style("font-size", "18px").attr("alignment-baseline","middle").attr("fill", "black")
	});
	
		
	
}

loadScatterplot();