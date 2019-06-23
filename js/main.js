
// SVG Size
var margin = {top: 20, right: 10, bottom: 20, left: 10};
var width = 700 - margin.right - margin.left
var height = 500 - margin.top - margin.bottom;
var padding = 30;
var axisPadding = 50;

// 3. Append a new SVG area with D3
// The ID of the target div container in the html file is #chart-area
// Use the variables height and width for the SVG element
// Save the new D3 selection in a variable (var svg = d3.select("#chart-area")...)
var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load CSV file
d3.csv("data/wealth-health-2014.csv", function(data){

	// Analyze the dataset in the web console
	console.log(data);
	console.log("Countries: " + data.length)
	data.sort(function(a,b){return b.Population - a.Population});

    // 4. Create linear scales by using the D3 scale functions
	// You will need an income scale (x-axis) and a scale function for the life expectancy (y-axis).
	// Call them incomeScale and lifeExpectancyScale.
	// Use d3.min() and d3.max() for the input domain
	// Use the variables height and width for the output range
	var incomeExtents = d3.extent(data, function(d) { return +d.Income; });
    incomeExtents[0] = incomeExtents[0] - 10;
    incomeExtents[1] = incomeExtents[1] + 10;
    var incomeScale = d3.scaleLog()
						.domain(incomeExtents)
						.range([padding + axisPadding, width - padding - axisPadding]);

    var lifeExpectancyExtents = d3.extent(data, function(d) { return +d.LifeExpectancy; }).reverse();
    lifeExpectancyExtents[0] = lifeExpectancyExtents[0] + 10;
    lifeExpectancyExtents[1] = lifeExpectancyExtents[1] - 10;
	var lifeExpectancyScale = d3.scaleLinear()
								.domain(lifeExpectancyExtents)
								.range([padding + axisPadding, height - padding - axisPadding]);
	// console.log(incomeScale(5000));
	// console.log(lifeExpectancyScale(68));

    // 1. Add a scale function for the circle radius
	// Create a population-dependent linear scale function. The radius should be between 4 - 30px.
	// Then use the scale function to specify a dynamic radius
	// 2. Change the drawing order
	// Larger circles should not overlap or cover smaller circles.
	// Sort the countries by population before drawing them.
	// 3. Color the circles (countries) depending on their regions
    // Use a D3 color scale.
	var populationExtent = d3.extent(data, function(d) { return +d.Population; });
	var populationScale = d3.scaleLinear()
							.domain(populationExtent)
							.range([4,30]);


	var regions = new Set(data.map(function(d) { return d.Region; }));
	var colorPalette = d3.scaleOrdinal(d3.schemeCategory10);
	colorPalette.domain(regions);


    // Use D3 to bind the data to visual elements, as you have done before (using D3's select(),data(), enter(), append(), etc.).
	// Use svg circles as marks.
	// Instead of setting the x- and y-values directly, you have to use your scale functions to convert the
	// data values to pixel measures// Ice Cream Example.attr("cx", function(d){ return iceCreamScale(d.sales); })
	// Specify the circle attributes: r, stroke and fill
	svg.selectAll("circle")
        .data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d) { return incomeScale(d.Income); })
		.attr("cy", function(d) { return lifeExpectancyScale(d.LifeExpectancy); })
		.attr("r", function(d) { return populationScale(d.Population);})
		.attr("stroke", "gray")
		.attr("fill", function(d){ return colorPalette(d.Region); });

    var xAxis = d3.axisBottom().scale(incomeScale).ticks(7,",d");
    var yAxis = d3.axisLeft().scale(lifeExpectancyScale).ticks(10);

    // Axis Labels
    var axes = svg.append("g");

    axes.append("g")
		.append("g")
		.attr("class", "axis x-axis")
        .attr("transform", "translate(0," + (height - padding  - axisPadding) + ")")
		.call(xAxis);

    axes.append("g")
		.append("text")
		.attr("class", "axis-label")
		.text("Income ($)")
		.attr("x",width/2)
		.attr("y",height - padding);

    axes.append("g")
		.append("text")
        .attr("class", "axis-label")
        .text("Life Expectancy (years)")
        .attr("transform", "translate(" + padding + "," + height/2 + ") rotate(270)")

	axes.append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate(" +(padding + axisPadding) + " ,0)")
        .call(yAxis);
});



