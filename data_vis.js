var full_data;
var genre_total_sales_global;
var genre_total_sales_NA;
var genre_total_sales_JP;
var genre_total_sales_EU;
var genre_total_sales_other;
var main_chart;

async function init() {
  // load data 
  // downloaded from: https://www.kaggle.com/datasets/gregorut/videogamesales?resource=download
  full_data = await d3.csv('vgsales.csv');

  // group data
  // code adapted from: http://www.d3noob.org/2014/02/grouping-and-summing-data-using-d3nest.html
  genre_total_sales_global = d3.nest()
    .key(function(d){ return d.Genre; })
    .rollup(function(d){
      return d3.sum(d, function(g){ return g.Global_Sales; });
    })
    .entries(full_data);

  genre_total_sales_NA = d3.nest()
    .key(function(d){ return d.Genre; })
    .rollup(function(d){
      return d3.sum(d, function(g){ return g.NA_Sales; });
    })
    .entries(full_data);

  genre_total_sales_JP = d3.nest()
    .key(function(d){ return d.Genre; })
    .rollup(function(d){
      return d3.sum(d, function(g){ return g.JP_Sales; });
    })
    .entries(full_data);

  genre_total_sales_EU = d3.nest()
    .key(function(d){ return d.Genre; })
    .rollup(function(d){
      return d3.sum(d, function(g){ return g.EU_Sales; });
    })
    .entries(full_data);

  genre_total_sales_other = d3.nest()
    .key(function(d){ return d.Genre; })
    .rollup(function(d){
      return d3.sum(d, function(g){ return g.EU_Sales; });
    })
    .entries(full_data);

  // sort data
  // code adapted from: https://stackoverflow.com/questions/46205118/how-to-sort-a-d3-bar-chart-based-on-an-array-of-objects-by-value-or-key
  genre_total_sales_global.sort(function(a, b){ return d3.descending(a.value, b.value) });
  genre_total_sales_NA.sort(function(a, b){ return d3.descending(a.value, b.value) });
  genre_total_sales_JP.sort(function(a, b){ return d3.descending(a.value, b.value) });
  genre_total_sales_EU.sort(function(a, b){ return d3.descending(a.value, b.value) });
  genre_total_sales_other.sort(function(a, b){ return d3.descending(a.value, b.value) });

  // collect chart canvases
  main_chart = d3.select("#main_chart");

  // draw visualizations
  draw_chart(main_chart, genre_total_sales_global);

  // add tooltip (main: region breakdowns, other: top games)
  // code adapted from: https://mappingwithd3.com/tutorials/basics/tooltip/
  d3.select('body').append('div')
    .attr('id', 'tooltip')
    .attr('style', 'position: absolute; opacity: 0;');
}

function draw_chart(svg, data) {
  svg.html("");

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
    //.attr("width", width + 2 * margin)
    //.attr("height", height + 2 * margin)
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

  // add tooltips
  // code adapted from: https://mappingwithd3.com/tutorials/basics/tooltip/
  const tooltip_offset = 20;
  svg.selectAll('rect').data(data)
    .on(`mouseover`, function(d) {
      d3.select('#tooltip')
        .transition().duration(200)
        .style('opacity', 1).text(d3.format('0.1f')(d.value));
    })
    .on(`mouseout`, function() {
      d3.select('#tooltip').style('opacity', 0);
    })
    .on(`mousemove`, function() {
      d3.select('#tooltip')
        .style('left', (d3.event.pageX+tooltip_offset) + 'px')
        .style('top', (d3.event.pageY-tooltip_offset) + 'px');
    })
}

// TODO: add annotations
// code adapted from: https://d3-annotation.susielu.com ?

// TODO: expand on tooltip info

// TODO: add chart and axis titles

// TODO: overaly region specific data for each slide