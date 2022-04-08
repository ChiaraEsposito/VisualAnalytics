function check(c, x, y){
	
	switch(x){
		case "Age": ageFilter = c.x; break;
		case "Sex": sexFilter = c.x; break;
		case "ChestPainType": chestFilter = c.x; break;
		case "Cholesterol": cholFilter = c.x; break;
		case "MaxHR": maxhrFilter = c.x; break;
		case "ST_Slope": slopeFilter = c.x; break;
	}
	switch(y){
		case "Age": ageFilter = c.y; break;
		case "Sex": sexFilter = c.y; break;
		case "ChestPainType": chestFilter = c.y; break;
		case "Cholesterol": cholFilter = c.y; break;
		case "MaxHR": maxhrFilter = c.y; break;
		case "ST_Slope": slopeFilter = c.y; break;
	}
	
}

function loadHeatmap(){
	
	
	var itemSize = 45,
      cellSize = itemSize - 1,
      margin = {top: 120, right: 20, bottom: 20, left: 210};
      
	var width = 750 - margin.right - margin.left,
      height = 600 - margin.top - margin.bottom;

	var formatDate = d3version3.time.format("%Y-%m-%d");
	//var dataset = d3version7.csv('./static/datasets/heart_quantitative2.csv');

	  //d3version3.csv('./static/datasets/heart_quantitative2.csv', function ( response ) {
	  dataset.then(function ( response ) {
		response = response.filter(function(d){ return datasetFiltering(d, true)});
		var tendinaX = document.getElementById("tendinaX").value;
		var tendinaY = document.getElementById("tendinaY").value;
		//console.log(tendinaX);
		//console.log(tendinaY);
		var label_x, label_y, n_x, n_y;
		var data = response.map(function( item ) {
			var newItem = {};
			
			switch(tendinaX) {
				case "Age": newItem.x = item.Age; label_x = ['0-30', '30-45', '45-60', '60-75', '75-90']; n_x=5; break;
				case "Sex": newItem.x = item.Sex; label_x = ['Male', 'Female']; n_x=2; break;
				case "ChestPainType": newItem.x = item.ChestPainType; label_x = ['ASY', 'TA', 'ATA', 'NAP']; n_x=4; break;
				case "Cholesterol": newItem.x = item.Cholesterol; label_x = ['<100', '100-200', '200-300', '300-400', '400-500', '>500']; n_x=6; break;
				case "RestingBP": newItem.x = item.RestingBP; label_x = ['<80', '80-110', '110-140', '>170']; n_x=4;break;
				case "MaxHR": newItem.x = item.MaxHR; label_x = ['<80', '80-120', '120-160', '>160']; n_x=4;break;
				case "RestingECG": newItem.x = item.RestingECG; label_x = ['Normal', 'ST', 'LVH']; n_x =3; break;
				case "ST_Slope": newItem.x = item.ST_Slope; label_x = ['Down', 'Flat', 'Up']; n_x=3; break;
			}
			switch(tendinaY) {
				case "Age": newItem.y = item.Age; label_y = ['0-30', '30-45', '45-60', '60-75', '75-90']; n_y=5; break;
				case "Sex": newItem.y = item.Sex; label_y = ['Male', 'Female']; n_y=2; break;
				case "ChestPainType": newItem.y = item.ChestPainType; label_y = ['ASY', 'TA', 'ATA', 'NAP']; n_y=4; break;
				case "Cholesterol": newItem.y = item.Cholesterol; label_y = ['<100', '100-200', '200-300', '300-400', '400-500', '>500']; n_y=6; break;
				case "RestingBP": newItem.y = item.RestingBP; label_y = ['<80', '80-110', '110-140', '>170']; n_y=4; break;
				case "MaxHR": newItem.y = item.MaxHR; label_y = ['<80', '80-120', '120-160', '>160']; n_y=4; break;
				case "RestingECG": newItem.y = item.RestingECG; label_y = ['Normal', 'ST', 'LVH']; n_y =3; break;
				case "ST_Slope": newItem.y = item.ST_Slope; label_y = ['Down', 'Flat', 'Up']; n_y=3; break;
			}
			//newItem.x = item.ST_Slope;
			//newItem.y = item.ChestPainType;
			newItem.HeartDisease = item.HeartDisease;
			return newItem;
		})

		var x_elements = d3version3.set(data.map(function( item ) { return item.y; } )).values(),
			y_elements = d3version3.set(data.map(function( item ) { return item.x; } )).values();

		var xScale = d3version3.scale.ordinal()
			.domain(x_elements)
			.rangeBands([0, x_elements.length * itemSize]);

		var xAxis = d3version3.svg.axis()
			.scale(xScale)
			.tickFormat(function (d) {
				return label_y[d % n_y];
			})
			.orient("top");

		var yScale = d3version3.scale.ordinal()
			.domain(y_elements)
			.rangeBands([0, y_elements.length * itemSize]);

		var yAxis = d3version3.svg.axis()
			.scale(yScale)
			.tickFormat(function (d) {
				return label_x[d % n_x];
			})
			.orient("left");
			
		var colorScale = d3version3.scale.category10()
			.domain([0, 1])
			.range(["#73db0b", "#db0b0b"]);
			
		var svg = d3version3.select('#heatmap')
			.append("svg")
			.attr("id", "svg_heatmap")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var cells = svg.selectAll('rect')
			.data(data)
			.enter().append('g').append('rect')
			//.on("click", function(c,v){ ageFilter = v.Age;  return reload();})
			.attr('class', 'cell')
			.attr('width', cellSize)
			.attr('height', cellSize)
			.attr('color', 'black')
			.attr('y', function(d) { return yScale(d.x); })
			.attr('x', function(d) { return xScale(d.y); })
			.on("click", function(c,v){ check(c, tendinaX, tendinaY); reload();})
			.attr('fill', function(d) { return colorScale(d.HeartDisease); });

		svg.append("g")
			.attr("class", "y axis")
			.attr("fill", "black")
			.call(yAxis)
			.selectAll('text')
			.attr('font-weight', 'normal');

		svg.append("g")
			.attr("class", "x axis")
			.attr("fill", "black")
			.call(xAxis)
			.selectAll('text')
			.attr('font-weight', 'normal')
			.style("text-anchor", "start")
			.attr("dx", ".8em")
			.attr("dy", ".5em")
			.attr("transform", function (d) {
				return "rotate(-65)";
			});
			
		svg.append("circle").attr("cx",300).attr("cy",30).attr("r", 10).style("fill", "#73db0b")
		svg.append("circle").attr("cx",300).attr("cy",60).attr("r", 10).style("fill", "#db0b0b")
		//svg.append("circle").attr("cx",300).attr("cy",90).attr("r", 10).style("fill", "purple")
		svg.append("text").attr("x", 320).attr("y", 30).text("No Heart Disease").style("font-size", "18px").attr("alignment-baseline","middle").attr("fill", "black")
		svg.append("text").attr("x", 320).attr("y", 60).text("Heart Disease").style("font-size", "18px").attr("alignment-baseline","middle").attr("fill", "black")
		//svg.append("text").attr("x", 320).attr("y", 90).text("ST Slope Up").style("font-size", "18px").attr("alignment-baseline","middle")
	  });
}

loadHeatmap();