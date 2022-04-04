//window.onload = function(){
	
//Sex
var svg_sex = d3version7.select("#barchart_sex"),
margin_sex = 100,
width_sex = 230 - margin_sex,
height_sex = 250 - margin_sex;


var xScale = d3version7.scaleBand().range ([0, width_sex]).padding(0.4),
yScale = d3version7.scaleLinear().range ([height_sex, 0]);

var g_sex = svg_sex.append("g")
	   .attr("transform", "translate(" + 40 + "," + 60 + ")");
	   
	   
//var dataset = dataset;
function datasetFiltering(d){
	//console.log(d.ChestPainType <1);
	if(sexFilter != null ){
		return d.Sex == sexFilter;
	} else {
		return (true);	
	}
	/*var bool = true;
	if(filterSex == true){
		bool == bool && d.Sex == filterSexValue
	}
	
	return bool;*/
}
//console.log(dataset.data);
function loadBarchart(){
dataset.then(function(data){
	
	svg_sex = d3version7.select("#barchart_sex"),
		margin_sex = 100,
		width_sex = 230 - margin_sex,
		height_sex = 250 - margin_sex;
	svg_sex.innerHTML = "";
	
	data = data.filter(function(d){return datasetFiltering(d)});
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
	
	
	
	g_sex.append("g")
	 .attr("transform", "translate(0," + height_sex + ")")
	 .call(d3version7.axisBottom(xScale).tickFormat(function (d) {
		 var gender = ["Male", "Female"]
		 return gender[d % 2]
	 }))
	 .append("text")
	 .style("font-size", "10px")
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
	 .on("click", function(c,v){ sexFilter = v.Sex; return loadBarchart();})
	 .attr("class", "bar_sex")
	 .attr("x", function(d) { return xScale(d.Sex); })
	 .attr("y", function(d) { return yScale(d.count); })
	 .attr("width", xScale.bandwidth())
	 .attr("height", function(d) { return height_sex - yScale(d.count); });
});

//Age
var svg_age = d3version7.select("#barchart_age"),
margin_age = 100,
width_age = 230 - margin_age,
height_age = 250 - margin_age;




var xScale = d3version7.scaleBand().range ([0, width_age]).padding(0.2),
yScale = d3version7.scaleLinear().range ([height_age, 0]);

var g_age = svg_age.append("g")
	   .attr("transform", "translate(" + 40 + "," + 60 + ")");
	
var ranges = {};
dataset.then(function(data){
	
	var c1, c2, c3, c4, c5;
	
	function groupBy(data, keyFunc) {
		  var r = {};
		  data.forEach(function(x) {
			var y = keyFunc(x.Age);
			r[y] = (r[y] || []).concat(x);
		  });
		  return Object.keys(r).map(function(y) {
			  //console.log(r[y]);
			return r[y];
			
		  });
		}
		g = groupBy(data, function(x) { return Math.floor(x / 15) });
		
		var r1 = Object.entries(g)[0];
		var r2 = Object.entries(g)[1];
		var r3 = Object.entries(g)[2];
		var r4 = Object.entries(g)[3];
		var r5 = Object.entries(g)[4];

		ranges [0] = r1[1].length;
		ranges [1] = r2[1].length;
		ranges [2] = r3[1].length;
		ranges [3] = r4[1].length;
		ranges [4] = r5[1].length;
		
		var ranges_dict ={
			"0-30":ranges[0],
			"30-45":ranges[1],
			"45-60":ranges[2],
			"60-75":ranges[3],
			"75-90":ranges[4]};
		

	
	xScale.domain(data.map(function(d) { 
	var i =0;
		data.forEach(function(d) {
			
			var x = parseInt(d.Age);

			if (i==0){
				d.Age = Object.keys(ranges_dict)[i];
			}
			else if (i==1){
				d.Age = Object.keys(ranges_dict)[i];
			}
			else if (i==2){
				d.Age = Object.keys(ranges_dict)[i];
			}
			else if (i==3){
				d.Age = Object.keys(ranges_dict)[i];
			}
			else if (i==4){
				d.Age = Object.keys(ranges_dict)[i];
			}
			i++;
			if (i==5){
				i =0;
			}
		});

		return d.Age; }));
	yScale.domain([0, d3version7.max(data, function(d) {
		// now store the count in each data member
		data.forEach(function(d) {
			var x = parseInt(d.Age);
			if(x<30){
				d.count = ranges_dict["0-30"];
			}
			else if(x<45){
				d.count = ranges_dict["30-45"];
			}
			else if(x<60){
				d.count = ranges_dict["45-60"];
			}
			else if(x<75){
				d.count = ranges_dict["60-75"];
			}
			else if(x<90){
				d.count = ranges_dict["75-90"];
			}
		});
		return d.count;

		//return Object.keys(ranges_dict)
		})]);
	var colorScale = d3version7.scaleOrdinal(d3version7.schemeCategory10);
	colorScale.domain(data.map(function (d){ return d.Age; }));
	
	g_age.append("g")
	 .style("font-size", "10px")
	 .attr("transform", "translate(0," + height_age + ")")
	 .call(d3version7.axisBottom(xScale).tickFormat(''))
	 .append("text")
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
	 .append("text")
	 .attr("transform", "rotate(-90)")
	 .attr("y", 4)
	 .attr("dy", "-5.1em")
	 .attr("text-anchor", "end")
	 .attr("stroke", "black")
	 .text("");
	var i=0;
	g_age.selectAll(".bar_age")
	 .data(data)
	 .enter().append("rect")
	 .attr("class", "bar_age")
	 .attr("x", function(d) { return xScale(d.Age); })
	 .attr("y", function(d) { return yScale(d.count); })
	 .attr("width", xScale.bandwidth())
	 .attr("height", function(d) { return height_age - yScale(d.count); })
	 .attr("fill", function (d){ 
		if(i==0){
			c1 = colorScale(d.Age);
		}
		else if(i==1){
			c2 = colorScale(d.Age);
		}
		else if(i==2){
			c3 = colorScale(d.Age);
		}
		else if(i==3){
			c4 = colorScale(d.Age);
		}
		else if(i==4){
			c5 = colorScale(d.Age);
		}
		i++;
		if (i==5){
			i=0;
		}
		return colorScale(d.Age); });
				
	 
	svg_age.append("circle").attr("cx",180).attr("cy",10).attr("r", 6).style("fill", c1)
	svg_age.append("circle").attr("cx",180).attr("cy",25).attr("r", 6).style("fill", c2)
	svg_age.append("circle").attr("cx",180).attr("cy",40).attr("r", 6).style("fill", c3)
	svg_age.append("circle").attr("cx",180).attr("cy",55).attr("r", 6).style("fill", c4)
	svg_age.append("circle").attr("cx",180).attr("cy",70).attr("r", 6).style("fill", c5)
	svg_age.append("text").attr("x", 190).attr("y", 10).text("0-30").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_age.append("text").attr("x", 190).attr("y", 25).text("30-45").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_age.append("text").attr("x", 190).attr("y", 40).text("45-60").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_age.append("text").attr("x", 190).attr("y", 55).text("60-75").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_age.append("text").attr("x", 190).attr("y", 70).text("75-90").style("font-size", "8px").attr("alignment-baseline","middle")
});


//ChestPainType
var svg_chest = d3version7.select("#barchart_chestPain"),
margin_chest = 100,
width_chest = 230 - margin_chest,
height_chest = 250 - margin_chest;


var xScale = d3version7.scaleBand().range ([0, width_chest]).padding(0.4),
yScale = d3version7.scaleLinear().range ([height_chest, 0]);

var g_chest = svg_chest.append("g")
	   .attr("transform", "translate(" + 40 + "," + 60 + ")");
	   

dataset.then(function(data){
	
	var c1, c2, c3, c4;

	xScale.domain(data.map(function(d) { return d.ChestPainType; }));
	yScale.domain([0, d3version7.max(data, function(d) { 
		var countObj = {};

		// count how much each city occurs in list and store in countObj
		data.forEach(function(d) {
			var chest = d.ChestPainType;
			if(countObj[chest] === undefined) {
				countObj[chest] = 0;
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
	
	var colorScale = d3version7.scaleOrdinal(d3version7.schemeCategory10);
	colorScale.domain(data.map(function (d){ return d.ChestPainType; }));
	
	g_chest.append("g")
	 .attr("transform", "translate(0," + height_chest + ")")
	 .call(d3version7.axisBottom(xScale).tickFormat(function (d) {
		 var types = ["ASY", "TA", "ATA", "NAP"]
		 return types[d % 4]
	 }))
	 .append("text")
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
	 .append("text")
	 .attr("transform", "rotate(-90)")
	 .attr("y", 7)
	 .attr("dy", "-5.1em")
	 .attr("text-anchor", "end")
	 .attr("stroke", "black")
	 .text("");

	var i =0;
	g_chest.selectAll(".bar_chest")
	 .data(data)
	 .enter().append("rect")
	 .attr("class", "bar_chest")
	 .attr("x", function(d) { return xScale(d.ChestPainType); })
	 .attr("y", function(d) { return yScale(d.count); })
	 .attr("width", xScale.bandwidth())
	 .attr("height", function(d) { return height_chest - yScale(d.count); })
	 .attr("fill", function (d){ 
		if(i==0){
			c1 = colorScale(d.ChestPainType);
		}
		else if(i==1){
			c2 = colorScale(d.ChestPainType);
		}
		else if(i==2){
			c3 = colorScale(d.ChestPainType);
		}
		else if(i==3){
			c4 = colorScale(d.ChestPainType);
		}
		i++;
		if (i==4){
			i=0;
		}
		return colorScale(d.ChestPainType); });
		
	svg_chest.append("circle").attr("cx",140).attr("cy",10).attr("r", 6).style("fill", c1)
	svg_chest.append("circle").attr("cx",140).attr("cy",25).attr("r", 6).style("fill", c2)
	svg_chest.append("circle").attr("cx",140).attr("cy",40).attr("r", 6).style("fill", c3)
	svg_chest.append("circle").attr("cx",140).attr("cy",55).attr("r", 6).style("fill", c4)
	svg_chest.append("text").attr("x", 150).attr("y", 10).text("A-Typical Angina").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_chest.append("text").attr("x", 150).attr("y", 25).text("Non-Anginal Pain").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_chest.append("text").attr("x", 150).attr("y", 40).text("ASYmptomatic").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_chest.append("text").attr("x", 150).attr("y", 55).text("Typical Angina").style("font-size", "8px").attr("alignment-baseline","middle")
});


//Cholesterol
var svg_chol = d3version7.select("#barchart_cholesterol"),
margin_chol = 100,
width_chol = 230 - margin_chol,
height_chol = 250 - margin_chol;




var xScale = d3version7.scaleBand().range ([0, width_chol]).padding(0.2),
yScale = d3version7.scaleLinear().range ([height_chol, 0]);

var g_chol = svg_chol.append("g")
	   .attr("transform", "translate(" + 40 + "," + 60 + ")");
	
var rangesChol = {};
dataset.then(function(data){
	
	var c1, c2, c3, c4, c5, c6;
	
	function groupBy(data, keyFunc) {
		  var rChol = {};
		  data.forEach(function(x) {
			var y = keyFunc(x.Cholesterol);
			rChol[y] = (rChol[y] || []).concat(x);
		  });
		  return Object.keys(rChol).map(function(y) {
			  //console.log(rChol[y]);
			return rChol[y];
			
		  });
		}
		g = groupBy(data, function(x) { return Math.floor(x / 100) });
		
		var r1 = Object.entries(g)[0];
		var r2 = Object.entries(g)[1];
		var r3 = Object.entries(g)[2];
		var r4 = Object.entries(g)[3];
		var r5 = Object.entries(g)[4];
		var r6 = Object.entries(g)[5];

		rangesChol [0] = r1[1].length;
		rangesChol [1] = r2[1].length;
		rangesChol [2] = r3[1].length;
		rangesChol [3] = r4[1].length;
		rangesChol [4] = r5[1].length;
		rangesChol [5] = r6[1].length;
		
		var rangesChol_dict ={
			"0-100":rangesChol[0],
			"100-200":rangesChol[1],
			"200-300":rangesChol[2],
			"300-400":rangesChol[3],
			"400-500":rangesChol[4],
			"500-605":rangesChol[5]};
		

	
	xScale.domain(data.map(function(d) { 
	var i =0;
		data.forEach(function(d) {
			
			var x = parseInt(d.Cholesterol);
			if(i==0){
				d.Cholesterol = Object.keys(rangesChol_dict)[0];
			}
			else if(i==1){
				d.Cholesterol = Object.keys(rangesChol_dict)[1];
			}
			else if(i==2){
				d.Cholesterol = Object.keys(rangesChol_dict)[2];
			}
			else if(i==3){
				d.Cholesterol = Object.keys(rangesChol_dict)[3];
			}
			else if(i==4){
				d.Cholesterol = Object.keys(rangesChol_dict)[4];
			}
			else if(i==5){
				d.Cholesterol = Object.keys(rangesChol_dict)[5];
			}
			i++;
			if (i==6){
				i=0;
			}
		});

		return d.Cholesterol; }));
	
	
	yScale.domain([0, d3version7.max(data, function(d) {
		// now store the count in each data member
		data.forEach(function(d) {
			var x = parseInt(d.Cholesterol);
			if(x<100){
				d.count = rangesChol_dict["0-100"];
			}
			else if(x<200){
				d.count = rangesChol_dict["100-200"];
			}
			else if(x<300){
				d.count = rangesChol_dict["200-300"];
			}
			else if(x<400){
				d.count = rangesChol_dict["300-400"];
			}
			else if(x<500){
				d.count = rangesChol_dict["400-500"];
			}
			else if(x<605){
				d.count = rangesChol_dict["500-605"];
			}
		});
		return d.count;

		//return Object.keys(ranges_dict)
		})]);
	var colorScale = d3version7.scaleOrdinal(d3version7.schemeCategory10);
	colorScale.domain(data.map(function (d){ return d.Cholesterol; }));
	
	g_chol.append("g")
	 .style("font-size", "10px")
	 .attr("transform", "translate(0," + height_chol + ")")
	 .call(d3version7.axisBottom(xScale).tickFormat(''))
	 .append("text")
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
	 .append("text")
	 .attr("transform", "rotate(-90)")
	 .attr("y", 7)
	 .attr("dy", "-5.1em")
	 .attr("text-anchor", "end")
	 .attr("stroke", "black")
	 .text("");
	
	var i=0;
	g_chol.selectAll(".bar_chol")
	 .data(data)
	 .enter().append("rect")
	 .attr("class", "bar_chol")
	 .attr("x", function(d) { return xScale(d.Cholesterol); })
	 .attr("y", function(d) { return yScale(d.count); })
	 .attr("width", xScale.bandwidth())
	 .attr("height", function(d) { return height_chol - yScale(d.count); })
	 .attr("fill", function (d){ 
		if(i==0){
			c1 = colorScale(d.Cholesterol);
		}
		else if(i==1){
			c2 = colorScale(d.Cholesterol);
		}
		else if(i==2){
			c3 = colorScale(d.Cholesterol);
		}
		else if(i==3){
			c4 = colorScale(d.Cholesterol);
		}
		else if(i==4){
			c5 = colorScale(d.Cholesterol);
		}
		else if(i==5){
			c6 = colorScale(d.Cholesterol);
		}
		i++;
		if (i==6){
			i=0;
		}
		return colorScale(d.Cholesterol); });
	 
	 
	svg_chol.append("circle").attr("cx",170).attr("cy",10).attr("r", 6).style("fill", c1)
	svg_chol.append("circle").attr("cx",170).attr("cy",25).attr("r", 6).style("fill", c2)
	svg_chol.append("circle").attr("cx",170).attr("cy",40).attr("r", 6).style("fill", c3)
	svg_chol.append("circle").attr("cx",170).attr("cy",55).attr("r", 6).style("fill", c4)
	svg_chol.append("circle").attr("cx",170).attr("cy",70).attr("r", 6).style("fill", c5)
	svg_chol.append("circle").attr("cx",170).attr("cy",85).attr("r", 6).style("fill", c6)
	svg_chol.append("text").attr("x", 180).attr("y", 10).text("<100").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_chol.append("text").attr("x", 180).attr("y", 25).text("100-200").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_chol.append("text").attr("x", 180).attr("y", 40).text("200-300").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_chol.append("text").attr("x", 180).attr("y", 55).text("300-400").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_chol.append("text").attr("x", 180).attr("y", 70).text("400-500").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_chol.append("text").attr("x", 180).attr("y", 85).text(">500").style("font-size", "8px").attr("alignment-baseline","middle")
	 
	 
});


//MAX Heart Rate
var svg_hr = d3version7.select("#barchart_maxHR"),
margin_hr = 100,
width_hr = 230 - margin_hr,
height_hr = 250 - margin_hr;

var xScale = d3version7.scaleBand().range ([0, width_hr]).padding(0.2),
yScale = d3version7.scaleLinear().range ([height_hr, 0]);

var g_hr = svg_hr.append("g")
	   .attr("transform", "translate(" + 40 + "," + 60 + ")");
	
var rangesHR = {};
dataset.then(function(data){
	
	var c1, c2, c3, c4;
	
	function groupBy(data, keyFunc) {
		  var rHR = {};
		  data.forEach(function(x) {
			var y = keyFunc(x.MaxHR);
			rHR[y] = (rHR[y] || []).concat(x);
		  });
		  return Object.keys(rHR).map(function(y) {
			  //console.log(rHR[y]);
			return rHR[y];
			
		  });
		}
		g = groupBy(data, function(x) {return Math.floor( x / 40) });
		
		var r1 = Object.entries(g)[0];
		var r2 = Object.entries(g)[1];
		var r3 = Object.entries(g)[2];
		var r4 = Object.entries(g)[3];
		var r5 = Object.entries(g)[4];

		rangesHR [0] = r1[1].length;
		rangesHR [1] = r2[1].length;
		rangesHR [2] = r3[1].length;
		rangesHR [3] = r4[1].length;
		rangesHR [4] = r5[1].length;
		
		var rangesHR_dict ={
			"40-80":rangesHR[0],
			"80-120":rangesHR[1],
			"120-160":rangesHR[2],
			"160-205":rangesHR[3]};
		

	
	xScale.domain(data.map(function(d) { 
	var i =0;
		data.forEach(function(d) {
			
			var x = parseInt(d.MaxHR);
			
			if (i==0){
				d.MaxHR = Object.keys(rangesHR_dict)[i];
			}
			else if (i==1){
				d.MaxHR = Object.keys(rangesHR_dict)[i];
			}
			else if (i==2){
				d.MaxHR = Object.keys(rangesHR_dict)[i];
			}
			else if (i==3){
				d.MaxHR = Object.keys(rangesHR_dict)[i];
			}
			i++;
			if (i==4){
				i =0;
			}
		});

		return d.MaxHR; }));
	
	yScale.domain([0, d3version7.max(data, function(d) {
		// now store the count in each data member
		data.forEach(function(d) {
			var x = parseInt(d.MaxHR);
			if(x<80){
				d.count = rangesHR_dict["40-80"];
			}
			else if(x<120){
				d.count = rangesHR_dict["80-120"];
			}
			else if(x<160){
				d.count = rangesHR_dict["120-160"];
			}
			else if(x<205){
				d.count = rangesHR_dict["160-205"];
			}
		});
		//console.log(d.count);
		return d.count;

		//return Object.keys(ranges_dict)
		})]);
	
	var colorScale = d3version7.scaleOrdinal(d3version7.schemeCategory10);
	colorScale.domain(data.map(function (d){ return d.MaxHR; }));
	
	g_hr.append("g")
	 .style("font-size", "10px")
	 .attr("transform", "translate(0," + height_hr + ")")
	 .call(d3version7.axisBottom(xScale).tickFormat(''))
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
	 .append("text")
	 .attr("transform", "rotate(-90)")
	 .attr("y", 7)
	 .attr("dy", "-5.1em")
	 .attr("text-anchor", "end")
	 .attr("stroke", "black")
	 .text("");
	
	var i=0;
	g_hr.selectAll(".bar_hr")
	 .data(data)
	 .enter().append("rect")
	 .attr("class", "bar_hr")
	 .attr("x", function(d) { return xScale(d.MaxHR); })
	 .attr("y", function(d) { return yScale(d.count); })
	 .attr("width", xScale.bandwidth())
	 .attr("height", function(d) { return height_hr - yScale(d.count); })
	 .attr("fill", function (d){ 
		if(i==0){
			c1 = colorScale(d.MaxHR);
		}
		else if(i==1){
			c2 = colorScale(d.MaxHR);
		}
		else if(i==2){
			c3 = colorScale(d.MaxHR);
		}
		else if(i==3){
			c4 = colorScale(d.MaxHR);
		}
		i++;
		if (i==4){
			i=0;
		}
		return colorScale(d.MaxHR); });
		
	 
	svg_hr.append("circle").attr("cx",180).attr("cy",10).attr("r", 6).style("fill", c1)
	svg_hr.append("circle").attr("cx",180).attr("cy",25).attr("r", 6).style("fill", c2)
	svg_hr.append("circle").attr("cx",180).attr("cy",40).attr("r", 6).style("fill", c3)
	svg_hr.append("circle").attr("cx",180).attr("cy",55).attr("r", 6).style("fill", c4)
	svg_hr.append("text").attr("x", 190).attr("y", 10).text("<80").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_hr.append("text").attr("x", 190).attr("y", 25).text("80-120").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_hr.append("text").attr("x", 190).attr("y", 40).text("120-160").style("font-size", "8px").attr("alignment-baseline","middle")
	svg_hr.append("text").attr("x", 190).attr("y", 55).text(">160").style("font-size", "8px").attr("alignment-baseline","middle")
});



//ST Slope Type
var svg_slope = d3version7.select("#barchart_stSlope"),
margin_slope = 100,
width_slope = 230 - margin_slope,
height_slope = 250 - margin_slope;


var xScale = d3version7.scaleBand().range ([0, width_slope]).padding(0.4),
yScale = d3version7.scaleLinear().range ([height_slope, 0]);

var g_slope = svg_slope.append("g")
	   .attr("transform", "translate(" + 40 + "," + 60 + ")");
	   

dataset.then(function(data){
	
	xScale.domain(data.map(function(d) { return d.ST_Slope; }));
	yScale.domain([0, d3version7.max(data, function(d) { 
		var countObj = {};

		// count how much each city occurs in list and store in countObj
		data.forEach(function(d) {
			var slope = d.ST_Slope;
			if(countObj[slope] === undefined) {
				countObj[slope] = 0;
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
	
	
	
	g_slope.append("g")
	 .attr("transform", "translate(0," + height_slope + ")")
	 .call(d3version7.axisBottom(xScale).tickFormat(function (d) {
		 var types = ["Down", "Flat", "Up"]
		 return types[d % 3]
	 }))
	 .append("text")
	 .style("font-size", "10px")
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
	 .attr("class", "bar_slope")
	 .attr("x", function(d) { return xScale(d.ST_Slope); })
	 .attr("y", function(d) { return yScale(d.count); })
	 .attr("width", xScale.bandwidth())
	 .attr("height", function(d) { return height_slope - yScale(d.count); });
});
}

loadBarchart();
//}