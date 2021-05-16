// Setting variable for height and width for ease of calculations
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper,append an SVG group that will hold chart and set margins
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import and format the data to numerical values 
d3.csv("assets/data/data.csv").then(function(CensusData) {
  CensusData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
    // console.log(data);
  });

  // Create Scales
  var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(CensusData, d => d.poverty)])
      .range([2, width]);
    var yLinearScale = d3.scaleLinear()
      .domain([3, d3.max(CensusData, d => d.healthcare)])
      .range([height,0]);
  
  // Create Axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);


// Append axes to the chartGroup
  chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);
  chartGroup.append("g").call(leftAxis);

// Generate scatter plot
chartGroup.selectAll("circle")
.data(CensusData)
.enter()
.append("circle")
.attr("cx", d=>xLinearScale(d.poverty))
.attr("cy", d=>yLinearScale(d.healthcare))
.attr("r", "15")
.attr("stroke-width", "1")
.classed("stateCircle", true)
.attr("opacity", 0.85);

// add texts to each datapoint
chartGroup.append("g")
  .selectAll('text')
  .data(CensusData)
  .enter()
  .append("text")
  .attr("x", d=>xLinearScale(d.poverty))
  .attr("y", d=>yLinearScale(d.healthcare))
  .attr("dy", ".35em") 
  .text(d=>d.abbr)
  .classed(".stateText", true)
  .attr("font-family", "sans-serif")
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .attr("font-size", "10px")
  .style("font-weight", "bold")
  .attr("alignment-baseline", "central");
  
  //add axes titles
  chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .style("font-weight", "bold")
        .text("In Poverty (%)");

        chartGroup.append("text")
        .attr("y", 0 - ((margin.left / 2)))
        .attr("x", 0 - (height / 2))
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .style("font-weight", "bold")
        .attr("transform", "rotate(-90)")
        .text("Lacks Healthcare (%)");
}).catch(function(error) {
  console.log(error);
});
// completed