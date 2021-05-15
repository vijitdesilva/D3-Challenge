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
// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// Import Data
d3.csv("assets/data/data.csv").then(function(csvData) {
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    csvData.forEach(function(data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
      data.age     = +data.age;
      data.smokes     = +data.smokes;
      data.obesity    = +data.obesity;
      data.income     = +data.income;
    });
    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(csvData, d => d.healthcare)])
      .range([0, width]);
    var yLinearScale = d3.scaleLinear()
      .domain([2, d3.max(csvData, d => d.poverty)])
      .range([height, 0]);
    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
    chartGroup.append("g")
      .call(leftAxis);
    
      
    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(csvData)
    .enter()
    .append("circle")
    // .append("text")
    // .attr(d => d.abbr)
    //NEED to recheck?
    //.text(d => d.abbr)
    //NEED TO RECHECK above??
    
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "lightblue")
    .attr("opacity", ".5");
    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        // return (`${d.abbr}<br>Health: ${d.healthcare}<br>Poverty: ${d.poverty}`);
      });
    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);
    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
      
//============add texts to each datapoint=========
chartGroup.append("g")
.selectAll('text')
.data(csvData)
.enter()
.append("text")
.text(d=>d.abbr)
.classed(".stateText", true)
.attr("font-family", "sans-serif")
.attr("text-anchor", "middle")
.attr("fill", "white")
.attr("font-size", "10px")
.style("font-weight", "bold")
.attr("alignment-baseline", "central");
    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");
    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  }).catch(function(error) {
    console.log(error);
  });


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

// // ====Create an SVG wrapper,append an SVG group that will hold chart and set margins=====
// var svg = d3
//   .select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // ==========Import and format the data to numerical values =======================
// d3.csv("assets/data/data.csv").then(function(CensusData) {
//   CensusData.forEach(function(data) {
//     data.age = +data.age;
//     data.smokes = +data.smokes;
//     // console.log(data);
//   });

//   // ==============Create Scales====================
//   const xScale = d3.scaleLinear()
//     .domain(d3.extent(CensusData, d => d.age))
//     .range([0, width])
//     .nice(); //makes the intersection of axes crisp

//   const yScale = d3.scaleLinear()
//     .domain([6,d3.max(CensusData, d => d.smokes)])
//     .range([height, 0])
//     .nice();
  
//   // =============Create Axes=========================
//   const xAxis = d3.axisBottom(xScale);
//   const yAxis = d3.axisLeft(yScale);


// // ============Append axes to the chartGroup==========
//   chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
//   chartGroup.append("g").call(yAxis);

// //============Generate scatter plot=========
// chartGroup.selectAll("circle")
// .data(CensusData)
// .enter()
// .append("circle")
// .attr("cx", d=>xScale(d.age))
// .attr("cy", d=>yScale(d.smokes))
// .attr("r", "10")
// .attr("stroke-width", "1")
// .classed("stateCircle", true)
// .attr("opacity", 0.75);

// //============add texts to each datapoint=========
// chartGroup.append("g")
//   .selectAll('text')
//   .data(CensusData)
//   .enter()
//   .append("text")
//   .text(d=>d.abbr)
//   .attr("x",d=>xScale(d.age))
//   .attr("y",d=>yScale(d.smokes))
//   .classed(".stateText", true)
//   .attr("font-family", "sans-serif")
//   .attr("text-anchor", "middle")
//   .attr("fill", "white")
//   .attr("font-size", "10px")
//   .style("font-weight", "bold")
//   .attr("alignment-baseline", "central");
  
//   //============add axes titles=========
//   chartGroup.append("text")
//         .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
//         .attr("text-anchor", "middle")
//         .attr("font-size", "16px")
//         .attr("fill", "black")
//         .style("font-weight", "bold")
//         .text("Median Age");

//         chartGroup.append("text")
//         .attr("y", 0 - ((margin.left / 2) + 2))
//         .attr("x", 0 - (height / 2))
//         .attr("text-anchor", "middle")
//         .attr("font-size", "16px")
//         .attr("fill", "black")
//         .style("font-weight", "bold")
//         .attr("transform", "rotate(-90)")
//         .text("Smokers (%)");
// }).catch(function(error) {
//   console.log(error);
// });