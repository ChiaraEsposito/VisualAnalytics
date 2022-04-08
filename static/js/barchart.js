//window.onload = function(){
	
//Sex
/*
var svg_sex = d3version7.select("#barchart_sex"),
margin_sex = 100,
width_sex = 230 - margin_sex,
height_sex = 250 - margin_sex;


var xScale = d3version7.scaleBand().range ([0, width_sex]).padding(0.4),
yScale = d3version7.scaleLinear().range ([height_sex, 0]);

var g_sex = svg_sex.append("g")
	   .attr("transform", "translate(" + 40 + "," + 60 + ")");
	   
*/	   
//var dataset = dataset;


function loadBarchart(){
	dataset.then(function(data){
		
		var originalData = data;
		data = data.filter(function(d){ return datasetFiltering(d, true)});
		
		//SEX
		svg_sex = d3version7.select("#barchart_sex"),
			margin_sex = 100,
			width_sex = 230 - margin_sex,
			height_sex = 250 - margin_sex;
		var xScale = d3version7.scaleBand().range ([0, width_sex]).padding(0.4),
		yScale = d3version7.scaleLinear().range ([height_sex, 0]);

		var g_sex = svg_sex.append("g")
			.attr("transform", "translate(" + 40 + "," + 60 + ")");
		
		svg_sex.innerHTML = "";
		data = data.sort(function(a, b) { return d3version7.ascending(a.Sex, b.Sex)});
		originalData = originalData.sort(function(a, b) { return d3version7.ascending(a.Sex, b.Sex)});
		
		xScale.domain(data.map(function(d) { return d.Sex; }));
		yScale.domain([0, d3version7.max(data, function(d) { 
		var countObj = {};

		// count how much each city occurs in list and store in countObj
		data.forEach(function(d) {
			var sex = d.Sex;
			if(countObj[sex] === undefined) {
				countObj[sex] = 1;
			} else {
				countObj[sex] = countObj[sex] + 1;
			}
		});
		// now store the count in each data member
		data.forEach(function(d) {
			var sex = d.Sex;
			d.count = countObj[sex];
		});
		return d.count; })]);
		
		var colorScale = d3version3.scale.category10();
		colorScale.domain(originalData.map(function (d){ return d.Sex; }));
		colorScale.range(["navy", "pink"]);
		
		
		g_sex.append("g")
		 .attr("transform", "translate(0," + height_sex + ")")
		 .call(d3version7.axisBottom(xScale).tickFormat(function (d) {
			 var gender = ["Male", "Female"]
			 return gender[d % 2]
		 }))
		 .style("color", "black")
		 .append("text")
		 .style("font-size", "12px")
		 .attr("y", height_sex - 120)
		 .attr("x", width_sex - 50)
		 .attr("text-anchor", "end")
		 .attr("stroke", "black")
		 .text("Gender");

		g_sex.append("g")
		 .call(d3version7.axisLeft(yScale).tickFormat(function(d){
			 return "" + d;
		 })
		 .ticks(5))
		 .style("color", "black")
		 .append("text")
		 .attr("transform", "rotate(-90)")
		 .attr("y", 7)
		 .attr("dy", "-5.1em")
		 .attr("text-anchor", "end")
		 .attr("stroke", "black")
		 .text("");


		g_sex.selectAll(".bar_sex")
		 .data(data)
		 .enter().append("rect")
		 .on("click", function(c,v){ sexFilter = v.Sex;  return reload();})
		 .attr("class", "bar_sex")
		 .attr("x", function(d) { return xScale(d.Sex); })
		 .attr("y", function(d) { return yScale(d.count); })
		 .attr("width", xScale.bandwidth())
		 .attr("height", function(d) { return height_sex - yScale(d.count); })
		 .attr("fill", function (d){return colorScale(d.Sex)});
		 
		svg_sex.append("circle").attr("cx",180).attr("cy",10).attr("r", 6).style("fill", "navy");
		svg_sex.append("circle").attr("cx",180).attr("cy",25).attr("r", 6).style("fill", "pink");
		svg_sex.append("text").attr("x", 190).attr("y", 10).text("Male").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_sex.append("text").attr("x", 190).attr("y", 25).text("Female").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");


		//Age
		var svg_age = d3version7.select("#barchart_age"),
		margin_age = 100,
		width_age = 230 - margin_age,
		height_age = 250 - margin_age;

		var xScale = d3version7.scaleBand().range ([0, width_age]).padding(0.2),
		yScale = d3version7.scaleLinear().range ([height_age, 0]);

		var g_age = svg_age.append("g")
			   .attr("transform", "translate(" + 40 + "," + 60 + ")");
		
		svg_age.innerHTML = "";
		//data = data.filter(function(d){return datasetFiltering(d)});
		data = data.sort(function(a, b) { return d3version7.ascending(a.Age, b.Age)});
		originalData = originalData.sort(function(a, b) { return d3version7.ascending(a.Age, b.Age)});
		
		xScale.domain(data.map(function(d) { return d.Age; }));
		yScale.domain([0, d3version7.max(data, function(d) { 
		var countObj = {};

		// count how much each city occurs in list and store in countObj
		data.forEach(function(d) {
			var age = d.Age;
			if(countObj[age] === undefined) {
				countObj[age] = 1;
			} else {
				countObj[age] = countObj[age] + 1;
			}
		});
		// now store the count in each data member
		data.forEach(function(d) {
			var age = d.Age;
			d.count = countObj[age];
		});
		return d.count; })]);
			
		//var colorScale = d3version7.scaleOrdinal(d3version7.schemeCategory10);
		var colorScale = d3version3.scale.category10();
		colorScale.domain(originalData.map(function (d){ return d.Age; }));
		colorScale.range(["#7ce8ff", "#60bbf7", "#008fff", "#0080bf", "#0043ae"]);
		//colorScale.range(["black", "blue"]);
			
		g_age.append("g")
		 .attr("transform", "translate(0," + height_age + ")")
		 .call(d3version7.axisBottom(xScale).tickFormat(''))
		 .style("color", "black")
		 .append("text")
		 .style("font-size", "12px")
		 .attr("y", height_age - 120)
		 .attr("x", width_age - 50)
		 .attr("text-anchor", "end")
		 .attr("stroke", "black")
		 .text("Age");

		g_age.append("g")
		 .call(d3version7.axisLeft(yScale).tickFormat(function(d){ 	
			 return "" + d;
		 })
		 .ticks(5))
		 .style("color", "black")
		 .append("text")
		 .attr("transform", "rotate(-90)")
		 .attr("y", 7)
		 .attr("dy", "-5.1em")
		 .attr("text-anchor", "end")
		 .attr("stroke", "black")
		 .text("");

		g_age.selectAll(".bar_age")
		 .data(data)
		 .enter().append("rect")
		 .on("click", function(c,v){ ageFilter = v.Age;  return reload();})
		 .attr("class", "bar_age")
		 .attr("x", function(d) { return xScale(d.Age); })
		 .attr("y", function(d) { return yScale(d.count); })
		 .attr("width", xScale.bandwidth())
		 .attr("height", function(d) { return height_age - yScale(d.count); })
		 .attr("fill", function (d){return colorScale(d.Age)});
		 /*.attr("fill", function (d){ 
				if (ageFilter == null) {
					return colorScale(d.Age);
				} else {
					return c1;
				}
			});*/
		 
		svg_age.append("circle").attr("cx",180).attr("cy",10).attr("r", 6).style("fill", "#7ce8ff");
		svg_age.append("circle").attr("cx",180).attr("cy",25).attr("r", 6).style("fill", "#60bbf7");
		svg_age.append("circle").attr("cx",180).attr("cy",40).attr("r", 6).style("fill", "#008fff");
		svg_age.append("circle").attr("cx",180).attr("cy",55).attr("r", 6).style("fill", "#0080bf");
		svg_age.append("circle").attr("cx",180).attr("cy",70).attr("r", 6).style("fill", "#0043ae");
		svg_age.append("text").attr("x", 190).attr("y", 10).text("0-30").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_age.append("text").attr("x", 190).attr("y", 25).text("30-45").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_age.append("text").attr("x", 190).attr("y", 40).text("45-60").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_age.append("text").attr("x", 190).attr("y", 55).text("60-75").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_age.append("text").attr("x", 190).attr("y", 70).text("75-90").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");

	
		//ChestPainType
		var svg_chest = d3version7.select("#barchart_chestPain"),
		margin_chest = 100,
		width_chest = 230 - margin_chest,
		height_chest = 250 - margin_chest;

		var xScale = d3version7.scaleBand().range ([0, width_chest]).padding(0.4),
		yScale = d3version7.scaleLinear().range ([height_chest, 0]);

		var g_chest = svg_chest.append("g")
			   .attr("transform", "translate(" + 40 + "," + 60 + ")");
		
		svg_chest.innerHTML = "";
		//data = data.filter(function(d){return datasetFiltering(d)});
		data = data.sort(function(a, b) { return d3version7.ascending(a.ChestPainType, b.ChestPainType)});
		originalData = originalData.sort(function(a, b) { return d3version7.ascending(a.ChestPainType, b.ChestPainType)});
		
		xScale.domain(data.map(function(d) { return d.ChestPainType; }));
		yScale.domain([0, d3version7.max(data, function(d) { 
		var countObj = {};

		// count how much each city occurs in list and store in countObj
		data.forEach(function(d) {
			var chest = d.ChestPainType;
			if(countObj[chest] === undefined) {
				countObj[chest] = 1;
			} else {
				countObj[chest] = countObj[chest] + 1;
			}
		});
		// now store the count in each data member
		data.forEach(function(d) {
			var chest = d.ChestPainType;
			d.count = countObj[chest];
		});
		return d.count; })]);
		
		//var colorScale = d3version7.scaleOrdinal(d3version7.schemeCategory10);
		var colorScale = d3version3.scale.category10();
		colorScale.domain(originalData.map(function (d){ return d.ChestPainType; }));
		colorScale.range(["#dc86fa", "#c030ed", "#9600b3", "#770087"]);
		g_chest.append("g")
		 .attr("transform", "translate(0," + height_chest + ")")
		 .call(d3version7.axisBottom(xScale).tickFormat(function (d) {
			 var types = ["ASY", "TA", "ATA", "NAP"]
			 return types[d % 4]
		 }))
		 .style("color", "black")
		 .append("text")
		 .style("font-size", "12px")
		 .attr("y", height_chest -120)
		 .attr("x", width_chest - 20)
		 .attr("text-anchor", "end")
		 .attr("stroke", "black")
		 .text("Chest Pain Types");

		g_chest.append("g")
		 .call(d3version7.axisLeft(yScale).tickFormat(function(d){
			 return "" + d;
		 })
		 .ticks(5))
		 .style("color", "black")
		 .append("text")
		 .attr("transform", "rotate(-90)")
		 .attr("y", 7)
		 .attr("dy", "-5.1em")
		 .attr("text-anchor", "end")
		 .attr("stroke", "black")
		 .text("");

		g_chest.selectAll(".bar_chest")
		 .data(data)
		 .enter().append("rect")
		 .on("click", function(c,v){ chestFilter = v.ChestPainType;  return reload();})
		 .attr("class", "bar_chest")
		 .attr("x", function(d) { return xScale(d.ChestPainType); })
		 .attr("y", function(d) { return yScale(d.count); })
		 .attr("width", xScale.bandwidth())
		 .attr("height", function(d) { return height_chest - yScale(d.count); })
		 .attr("fill", function (d){return colorScale(d.ChestPainType);});
			
		svg_chest.append("circle").attr("cx",140).attr("cy",10).attr("r", 6).style("fill", "#dc86fa");
		svg_chest.append("circle").attr("cx",140).attr("cy",25).attr("r", 6).style("fill", "#c030ed");
		svg_chest.append("circle").attr("cx",140).attr("cy",40).attr("r", 6).style("fill", "#9600b3");
		svg_chest.append("circle").attr("cx",140).attr("cy",55).attr("r", 6).style("fill", "#770087");
		svg_chest.append("text").attr("x", 150).attr("y", 10).text("ASYmptomatic").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_chest.append("text").attr("x", 150).attr("y", 25).text("Typical Angina").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_chest.append("text").attr("x", 150).attr("y", 40).text("A-Typical Angina").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_chest.append("text").attr("x", 150).attr("y", 55).text("Non-Anginal Pain").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");

		//Cholesterol
		var svg_chol = d3version7.select("#barchart_cholesterol"),
		margin_chol = 100,
		width_chol = 230 - margin_chol,
		height_chol = 250 - margin_chol;

		var xScale = d3version7.scaleBand().range ([0, width_chol]).padding(0.2),
		yScale = d3version7.scaleLinear().range ([height_chol, 0]);
		
		var g_chol = svg_chol.append("g")
			.attr("transform", "translate(" + 40 + "," + 60 + ")");
		
		svg_chol.innerHTML = "";
		//data = data.filter(function(d){return datasetFiltering(d)});
		data = data.sort(function(a, b) { return d3version7.ascending(a.Cholesterol, b.Cholesterol)});
		originalData = originalData.sort(function(a, b) { return d3version7.ascending(a.Cholesterol, b.Cholesterol)});
		
		xScale.domain(data.map(function(d) { return d.Cholesterol; }));
		yScale.domain([0, d3version7.max(data, function(d) { 
		var countObj = {};

		// count how much each city occurs in list and store in countObj
		data.forEach(function(d) {
			var chol = d.Cholesterol;
			if(countObj[chol] === undefined) {
				countObj[chol] = 1;
			} else {
				countObj[chol] = countObj[chol] + 1;
			}
		});
		// now store the count in each data member
		data.forEach(function(d) {
			var chol = d.Cholesterol;
			d.count = countObj[chol];
		});
		return d.count; })]);
		
		var colorScale = d3version3.scale.category10();
		//var colorScale = d3version7.scaleOrdinal(d3version7.schemeCategory10);
		colorScale.domain(originalData.map(function (d){ return d.Cholesterol; }));
		colorScale.range(["#ffe134", "#ffbf2e", "#ff9e28", "#fe7c22", "#fe5a1c", "#ed4100"]);
		
		
		g_chol.append("g")
		 .attr("transform", "translate(0," + height_chol + ")")
		 .call(d3version7.axisBottom(xScale).tickFormat(''))
		 .style("color", "black")
		 .append("text")
		 .style("font-size", "12px")
		 .attr("y", height_chol -120)
		 .attr("x", width_chol - 20)
		 .attr("text-anchor", "end")
		 .attr("stroke", "black")
		 .text("Cholesterol levels");

		
		g_chol.append("g")
		 .call(d3version7.axisLeft(yScale).tickFormat(function(d){
			 return "" + d;
		 })
		 .ticks(5))
		 .style("color", "black")
		 .append("text")
		 .attr("transform", "rotate(-90)")
		 .attr("y", 7)
		 .attr("dy", "-5.1em")
		 .attr("text-anchor", "end")
		 .attr("stroke", "black")
		 .text("");
		
		g_chol.selectAll(".bar_chol")
		 .data(data)
		 .enter().append("rect")
		 .on("click", function(c,v){ cholFilter = v.Cholesterol;  return reload();})
		 .attr("class", "bar_chol")
		 .attr("x", function(d) { return xScale(d.Cholesterol); })
		 .attr("y", function(d) { return yScale(d.count); })
		 .attr("width", xScale.bandwidth())
		 .attr("height", function(d) { return height_chol - yScale(d.count); })
		 .attr("fill", function (d){ return colorScale(d.Cholesterol);});
		 
		 
		svg_chol.append("circle").attr("cx",170).attr("cy",10).attr("r", 6).style("fill", "#ffe134"); //("fill", d3.schemeCategory10[1])
		svg_chol.append("circle").attr("cx",170).attr("cy",25).attr("r", 6).style("fill", "#ffbf2e");
		svg_chol.append("circle").attr("cx",170).attr("cy",40).attr("r", 6).style("fill", "#ff9e28");
		svg_chol.append("circle").attr("cx",170).attr("cy",55).attr("r", 6).style("fill", "#fe7c22");
		svg_chol.append("circle").attr("cx",170).attr("cy",70).attr("r", 6).style("fill", "#fe5a1c");
		svg_chol.append("circle").attr("cx",170).attr("cy",85).attr("r", 6).style("fill", "#ed4100");
		svg_chol.append("text").attr("x", 180).attr("y", 10).text("<100").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_chol.append("text").attr("x", 180).attr("y", 25).text("100-200").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_chol.append("text").attr("x", 180).attr("y", 40).text("200-300").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_chol.append("text").attr("x", 180).attr("y", 55).text("300-400").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_chol.append("text").attr("x", 180).attr("y", 70).text("400-500").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_chol.append("text").attr("x", 180).attr("y", 85).text(">500").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		
		//ST Slope Type
		var svg_slope = d3version7.select("#barchart_stSlope"),
		margin_slope = 100,
		width_slope = 230 - margin_slope,
		height_slope = 250 - margin_slope;


		var xScale = d3version7.scaleBand().range ([0, width_slope]).padding(0.4),
		yScale = d3version7.scaleLinear().range ([height_slope, 0]);

		var g_slope = svg_slope.append("g")
			   .attr("transform", "translate(" + 40 + "," + 60 + ")");
			   
		svg_slope.innerHTML = "";
		//data = data.filter(function(d){return datasetFiltering(d)});
		data = data.sort(function(a, b) { return d3version7.ascending(a.ST_Slope, b.ST_Slope)});
		originalData = originalData.sort(function(a, b) { return d3version7.ascending(a.ST_Slope, b.ST_Slope)});
		
		xScale.domain(data.map(function(d) { return d.ST_Slope; }));
		yScale.domain([0, d3version7.max(data, function(d) { 
		var countObj = {};

		// count how much each city occurs in list and store in countObj
		data.forEach(function(d) {
			var slope = d.ST_Slope;
			if(countObj[slope] === undefined) {
				countObj[slope] = 1;
			} else {
				countObj[slope] = countObj[slope] + 1;
			}
		});
		// now store the count in each data member
		data.forEach(function(d) {
			var slope = d.ST_Slope;
			d.count = countObj[slope];
		});
		return d.count; })]);
		
		var colorScale = d3version3.scale.category10();
		colorScale.domain(originalData.map(function (d){ return d.ST_Slope; }));
		colorScale.range(["#ede0d4", "#ddb892", "#7f5539"]);
		
		
		g_slope.append("g")
		 .attr("transform", "translate(0," + height_slope + ")")
		 .call(d3version7.axisBottom(xScale).tickFormat(function (d) {
			 var types = ["Down", "Flat", "Up"]
			 return types[d % 3]
		 }))
		 .style("color", "black")
		 .append("text")
		 .style("font-size", "12px")
		 .attr("y", height_slope -120)
		 .attr("x", width_slope - 40)
		 .attr("text-anchor", "end")
		 .attr("stroke", "black")
		 .text("ST Slope");

		g_slope.append("g")
		 .call(d3version7.axisLeft(yScale).tickFormat(function(d){
			 return "" + d;
		 })
		 .ticks(6))
		 .style("color", "black")
		 .append("text")
		 .attr("transform", "rotate(-90)")
		 .attr("y", 5)
		 .attr("dy", "-5.1em")
		 .attr("text-anchor", "end")
		 .attr("stroke", "black")
		 .text("");


		g_slope.selectAll(".bar_slope")
		 .data(data)
		 .enter().append("rect")
		 .on("click", function(c,v){ slopeFilter = v.ST_Slope;  return reload();})
		 .attr("class", "bar_slope")
		 .attr("x", function(d) { return xScale(d.ST_Slope); })
		 .attr("y", function(d) { return yScale(d.count); })
		 .attr("width", xScale.bandwidth())
		 .attr("height", function(d) { return height_slope - yScale(d.count); })
		 .attr("fill", function (d){ return colorScale(d.ST_Slope);});
		 
		
		svg_slope.append("circle").attr("cx",170).attr("cy",10).attr("r", 6).style("fill", "#ede0d4"); //("fill", d3.schemeCategory10[1])
		svg_slope.append("circle").attr("cx",170).attr("cy",25).attr("r", 6).style("fill", "#ddb892");
		svg_slope.append("circle").attr("cx",170).attr("cy",40).attr("r", 6).style("fill", "#7f5539");
		svg_slope.append("text").attr("x", 180).attr("y", 10).text("Down").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_slope.append("text").attr("x", 180).attr("y", 25).text("Flat").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_slope.append("text").attr("x", 180).attr("y", 40).text("Up").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		

		//MAX Heart Rate
		var svg_hr = d3version7.select("#barchart_maxHR"),
		margin_hr = 100,
		width_hr = 230 - margin_hr,
		height_hr = 250 - margin_hr;

		var xScale = d3version7.scaleBand().range ([0, width_hr]).padding(0.2),
		yScale = d3version7.scaleLinear().range ([height_hr, 0]);
		
		svg_hr.innerHTML = "";
		//data = data.filter(function(d){return datasetFiltering(d)});
		data = data.sort(function(a, b) { return d3version7.ascending(a.MaxHR, b.MaxHR)});
		originalData = originalData.sort(function(a, b) { return d3version7.ascending(a.MaxHR, b.MaxHR)});

		var g_hr = svg_hr.append("g")
			   .attr("transform", "translate(" + 40 + "," + 60 + ")");
			
		xScale.domain(data.map(function(d) { return d.MaxHR; }));
		yScale.domain([0, d3version7.max(data, function(d) { 
		var countObj = {};

		// count how much each city occurs in list and store in countObj
		data.forEach(function(d) {
			var hr = d.MaxHR;
			if(countObj[hr] === undefined) {
				countObj[hr] = 1;
			} else {
				countObj[hr] = countObj[hr] + 1;
			}
		});
		// now store the count in each data member
		data.forEach(function(d) {
			var hr = d.MaxHR;
			d.count = countObj[hr];
		});
		return d.count; })]);
		
		//var colorScale = d3version7.scaleOrdinal(d3version7.schemeCategory10);
		var colorScale = d3version3.scale.category10();
		colorScale.domain(originalData.map(function (d){ return d.MaxHR; }));
		colorScale.range(["#c1ff1c", "#78d23d", "#3aa346", "#1c6646"]);
		
		
		g_hr.append("g")
		 .style("font-size", "12px")
		 .attr("transform", "translate(0," + height_hr + ")")
		 .call(d3version7.axisBottom(xScale).tickFormat(''))
		 .style("color", "black")
		 .append("text")
		 .attr("y", height_hr - 120)
		 .attr("x", width_hr - 10)
		 .attr("text-anchor", "end")
		 .attr("stroke", "black")
		 .text("Maximum heart rate");

		
		g_hr.append("g")
		 .call(d3version7.axisLeft(yScale).tickFormat(function(d){
			 return "" + d;
		 })
		 .ticks(5))
		 .style("color", "black")
		 .append("text")
		 .attr("transform", "rotate(-90)")
		 .attr("y", 7)
		 .attr("dy", "-5.1em")
		 .attr("text-anchor", "end")
		 .attr("stroke", "black")
		 .text("");
		
		g_hr.selectAll(".bar_hr")
		 .data(data)
		 .enter().append("rect")
		 .on("click", function(c,v){ maxhrFilter = v.MaxHR;  return reload();})
		 .attr("class", "bar_hr")
		 .attr("x", function(d) { return xScale(d.MaxHR); })
		 .attr("y", function(d) { return yScale(d.count); })
		 .attr("width", xScale.bandwidth())
		 .attr("height", function(d) { return height_hr - yScale(d.count); })
		 .attr("fill", function (d){ return colorScale(d.MaxHR);});
			
		 
		svg_hr.append("circle").attr("cx",180).attr("cy",10).attr("r", 6).style("fill", "#c1ff1c");
		svg_hr.append("circle").attr("cx",180).attr("cy",25).attr("r", 6).style("fill", "#78d23d");
		svg_hr.append("circle").attr("cx",180).attr("cy",40).attr("r", 6).style("fill", "#3aa346");
		svg_hr.append("circle").attr("cx",180).attr("cy",55).attr("r", 6).style("fill", "#1c6646");
		svg_hr.append("text").attr("x", 190).attr("y", 10).text("<80").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_hr.append("text").attr("x", 190).attr("y", 25).text("80-120").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_hr.append("text").attr("x", 190).attr("y", 40).text("120-160").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		svg_hr.append("text").attr("x", 190).attr("y", 55).text(">160").style("font-size", "8px").attr("alignment-baseline","middle").attr("fill", "black");
		
	}
)}	

loadBarchart();
//}