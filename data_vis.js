async function init() {
  // load data downlaoded from: https://www.kaggle.com/datasets/gregorut/videogamesales?resource=download
  const full_data = await d3.csv('vgsales.csv');

  // group data
  // code adapted from: http://www.d3noob.org/2014/02/grouping-and-summing-data-using-d3nest.html
  var genre_totals = d3.nest()
    .key(function(d){ return d.Genre; })
    .rollup(function(d){
      return d3.sum(d, function(g){ return g.Global_Sales; });
    })
    .entries(full_data);

  // sort data
  // code adapted from: https://stackoverflow.com/questions/46205118/how-to-sort-a-d3-bar-chart-based-on-an-array-of-objects-by-value-or-key
  genre_totals.sort(function(a, b){ return d3.descending(a.value, b.value) });

  // collect chart canvases
  const svg1 = d3.select("#main_chart");
  const svg2 = d3.select("#secondary_chart");

  draw_main_chart(svg1, genre_totals);
}

function draw_main_chart(svg1, genre_totals) {
  // display settings
  var width = 600;
  var height = 400;
  var margin = 50;
  var w = width - 2 * margin;
  var h = height - 2 * margin;

  var bar_width = width / 12; // FIXME: figure out how to get number of keys
  
  var max_global_sales = d3.max(genre_totals, function(d) { return d.value; } );

  // FIXME: remove debug
  genre_totals.forEach(function(d) {
    console.log(d.key, d.value);
  });

  // display main bar chart
  svg1 
    .attr("width", width + 2 * margin)
    .attr("height", height + 2 * margin)
    .append("g")
      .attr("transform", "translate("+margin+","+margin+")")
    .selectAll().data(genre_totals).enter().append("rect")
      .attr("x",function(d,i){ return i*bar_width; })
      .attr("y",function(d){ return h-(d.value*h/max_global_sales); })
      .attr("width", bar_width)
      .attr("height", function(d){ return d.value*h/max_global_sales; });

  // axis scales
  // code adapted from: https://www.tutorialsteacher.com/d3js/create-bar-chart-using-d3js
  var x_scale = d3.scaleBand()
    .domain(genre_totals.map(function(d){ return d.key }))
    .range([0, width]); // FIXME: why is this wiidth, but the other is h?
  var y_scale = d3.scaleLinear()
    .domain([0, max_global_sales])
    .range([h, 0]);

  // add x-axis
  svg1.append("g")
    .attr("transform", "translate("+margin+","+(height-margin)+")")
    .call(d3.axisBottom(x_scale));

  // add y-axis
  svg1.append("g")
    .attr("transform", "translate("+margin+","+margin+")")
    .call(d3.axisLeft(y_scale)
      .tickFormat(function(d){ return d; })
      .ticks(10));

  // TODO: add annotations
  // code adapted from: https://d3-annotation.susielu.com ?
}