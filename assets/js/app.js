// @TODO: YOUR CODE HERE!
// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("data.csv").then(function(Data) {

  // Print the tvData
  console.log(Data);

  // Cast the hours value to a number for each piece of tvData
  Data.forEach(function(data) {
    data.healthcare = +data.healthcare;
  });

  var barSpacing = 10; // desired space between each bar
  var scaleY = 10; // 10x scale on rect height

  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  var barWidth = (chartWidth - (barSpacing * (Data.length - 1))) / Data.length;

  // @TODO
  // Create code to build the bar chart using the tvData.
  chartGroup.selectAll(".bar")
    .data(Data)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d => barWidth)
    .attr("height", d => d.healthcare * scaleY)
    .attr("x", (d, i) => i * (barWidth + barSpacing))
    .attr("y", d => chartHeight - d.hours * scaleY);
}).catch(function(error) {
  console.log(error);
});
