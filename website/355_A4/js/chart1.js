//////////////////////////////////////////////////////////////////// CO2 IN ATMOSTHPHERE (historic) /////////////////////////////////////////////////////////////////
var url = "http://www.sfu.ca/~rmichels/355_Data/co2-concentration-long-term_noBC.csv";


//Function to keep everything local
(function(){
  // Append SVG object with defined margins. Append group.
  var svg = d3.select("#CH1")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  //Read data
  d3.csv(url,
    // Format data
    function(d){
      return { year : d3.timeParse("%-Y")(d.year), co2 : d.co2 }
    },

    // Use dataset for visualization
    function(data) {

      ///////////////////////////////////////// X Axis
      var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.year; }))
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
          .tickFormat(d3.timeFormat("%Y")));

      // text label for the x axis
      svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.bottom) + ")")
      .style("text-anchor", "middle")
      .text("Date");


      ///////////////////////////////////////// Y Axis
      var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.co2; })])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // text label for the y axis
      var yLabels = ["Atmospheric", "concentration", "of CO2,", "measured in", "parts per", "million (ppm)" ];
      yLabelText(yLabels, svg);

      // Add the line
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", colCo2Concentration)
        .attr("stroke-width", 2)
        .attr("d", d3.line()
          .x(function(d) { return x(d.year) })
          .y(function(d) { return y(d.co2) })
          )

  })
})();

