// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Select chart and append SVG area to it. Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


// Append a group to the SVG area translate it to the right and to the bottom
var chart = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Census Data 
d3.csv("D3_data_journalism/data/data.csv").then(function(censusData) {

    // Step 1: Parse Data/Cast as numbers
  
  censusData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    console.log(data.poverty, data.healthcare);
  });

  // Step 2: Create scale functions
  
  var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(censusData, d => d.poverty)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(censusData, d => d.healthcare)])
    .range([height, 0]);

// Step 3: Create axis functions
  
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  
  chart.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chart.append("g")
    .call(leftAxis);

// Step 5: Create Circles
 
  var circles = chart.selectAll("circle")
    .data(censusData)
    .enter();
  circles.append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("class", "stateCircle")
    .text(function(d){
        return d.abbr;
    })
    .attr("opacity", ".5");

    // Append text to Cirle Group
  circles.append("text")
  .text(function(d){
    return d.abbr;
  })
  .attr("dx", d => xLinearScale(d.poverty))
  .attr("dy", d => yLinearScale(d.healthcare)+10/2.5)
  .attr("font-size","9")
  .attr("class","stateText")
  .on("mouseover", function(data, index) {
    toolTip.show(data,this);
d3.select(this).style("stroke","#323232")
  })
  .on("mouseout", function(data, index) {
      toolTip.hide(data,this)
    d3.select(this).style("stroke","#e3e3e3")
  });
  chart.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);
chart.append("g")
  .call(leftAxis);




});