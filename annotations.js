const text = document.getElementById("annotation-text");

function display_annotation_overview() {
  text.innerHTML = "This overview chart shows the total global sales (in millions of copies) of video games released from 1980-2020 classified by genre. Only games that sold over 100,000 copies have been included."

  display_svg_annotation(50, 50, bar_width*3, 300, 10, 350, 10, 
    "Top 3 Genres", 
    "Overall, action, sports, and shooter games sell the best",
    200);
}

function display_annotation_na() {
  text.innerHTML = "North America contributes to about half of game sales globally, which would heavily influence genre popularity in the overview chart. However, we see roleplaying games shift from 4th to 7th."

  display_svg_annotation(50, 50, bar_width*3, 300, 10, 350, 10, 
    "North America", 
    "The top 3 genres stay consistent with the global model",
    200);
}

function display_annotation_eu() {
  text.innerHTML = "In Europe, the most popular genres again stay the same. However, there is a signifcant shift in the middle group, again with RPGs moving from 4th to 7th."

  display_svg_annotation(50+bar_width*3, 50, bar_width*4, 300, 10, 300, 100, 
    "Europe", 
    "The middle most popular genres are reversed from the global popularity",
    200);
}

function display_annotation_jp() {
  text.innerHTML = "Japan overall buys fewer video game copies than North America and Europe. However, the market is also very different. RPGs are immensely popular, while shooters are the least. Racing is also far less popular."

  display_svg_annotation(50, 50, bar_width*3, 300, 10, 350, 10, 
    "Japan", 
    "RPGs are much more popular in Japan than in any other region",
    200);

  display_svg_annotation(50+bar_width*11, 50, bar_width, 300, 10, -100, 140, 
    "Shooters", 
    "The 3rd most popular genre globally sells the least",
    200);
}

function display_annotation_other() {
  text.innerHTML = "This section is a compilation of all the other regions. They seem to follow the global trends resonably closely. However, the lower popularity genres are slightly different."

  display_svg_annotation(50, 50, bar_width*3, 300, 10, 350, 10, 
    "Other Regions", 
    "The top 3 genres also stay consistent in other regions",
    200);
}

// add extra annotations
// https://d3-annotation.susielu.com/#examples
function display_svg_annotation(x_pos, y_pos, w, h, offset, dx_pos, dy_pos, title_text, content, wrap) {
  const type = d3.annotationCalloutRect

  const annotations = [{
    note: {
      label: content,
      title: title_text
    },
    //can use x, y directly instead of data
    x: x_pos - offset/2,
    y: y_pos - offset/2,
    dy: dy_pos,
    dx: dx_pos,
    subject: {
      width: w + offset,
      height: h + offset
    }
  }]

  const makeAnnotations = d3.annotation()
    .notePadding(10)
    .textWrap(wrap)
    .type(type)
    .annotations(annotations)

  d3.select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations)
}

// TODO: move tooltips into here?