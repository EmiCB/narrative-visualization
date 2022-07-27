async function init() {
  // load data 
  // downloaded from: https://www.kaggle.com/datasets/gregorut/videogamesales?resource=download
  const full_data = await d3.csv('vgsales.csv');

  // group data
  // code adapted from: http://www.d3noob.org/2014/02/grouping-and-summing-data-using-d3nest.html
  const genre_totals = d3.nest()
    .key(function(d){ return d.Genre; })
    .rollup(function(d){
      return d3.sum(d, function(g){ return g.Global_Sales; });
    })
    .entries(full_data);

  // sort data
  // code adapted from: https://stackoverflow.com/questions/46205118/how-to-sort-a-d3-bar-chart-based-on-an-array-of-objects-by-value-or-key
  genre_totals.sort(function(a, b){ return d3.descending(a.value, b.value) });

  // collect chart canvases
  const main_chart = d3.select("#main_chart");
  const secondary_chart = d3.select("#secondary_chart");

  // draw visualizations
  draw_main_chart(main_chart, genre_totals);
}

function draw_main_chart(svg, data) {
  // display settings
  const width = parseInt(svg.style("width"));
  const height = parseInt(svg.style("height"));
  const margin = 50;
  const w = width - 2 * margin;
  const h = height - 2 * margin;
  const bar_width = w / d3.keys(data).length;
  const max_height = d3.max(data, function(d) { return d.value; } );

  // display main bar chart
  svg 
    .attr("width", width + 2 * margin)
    .attr("height", height + 2 * margin)
    .append("g")
      .attr("transform", "translate("+margin+","+margin+")")
    .selectAll().data(data).enter().append("rect")
      .attr("x",function(d,i){ return i*bar_width; })
      .attr("y",function(d){ return h-(d.value*h/max_height); })
      .attr("width", bar_width)
      .attr("height", function(d){ return d.value*h/max_height; });

  // axis scales
  // code adapted from: https://www.tutorialsteacher.com/d3js/create-bar-chart-using-d3js
  var x_scale = d3.scaleBand()
    .domain(data.map(function(d){ return d.key }))
    .range([0, w]);
  var y_scale = d3.scaleLinear()
    .domain([0, max_height])
    .range([h, 0]);

  // add x-axis
  svg.append("g")
    .attr("transform", "translate("+margin+","+(height-margin)+")")
    .call(d3.axisBottom(x_scale));

  // add y-axis
  svg.append("g")
    .attr("transform", "translate("+margin+","+margin+")")
    .call(d3.axisLeft(y_scale)
      .tickFormat(function(d){ return d; })
      .ticks(10));

  // TODO: add annotations
  // code adapted from: https://d3-annotation.susielu.com ?
}