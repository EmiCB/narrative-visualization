// TODO: write up main text
const text = document.getElementById("annotation-text");

function display_annotation_overview() {
  text.innerHTML = "Overview (games released from 1980-2020)"

  display_svg_annotation(50, 50, bar_width*3, 300, 10, 350, 10, 
    "Annotations :)", 
    "Longer text to show text wrapping",
    200);
}

function display_annotation_na() {
  text.innerHTML = "NA"

  display_svg_annotation(50, 50, bar_width*3, 300, 10, 350, 10, 
    "Annotations :)", 
    "Longer text to show text wrapping",
    200);
}

function display_annotation_eu() {
  text.innerHTML = "EU"

  display_svg_annotation(50+bar_width*3, 50, bar_width*4, 300, 10, 280, 120, 
    "Annotations :)", 
    "Longer text to show text wrapping",
    200);
}

function display_annotation_jp() {
  text.innerHTML = "JP"

  display_svg_annotation(50, 50, bar_width*3, 300, 10, 350, 10, 
    "Annotations :)", 
    "Longer text to show text wrapping",
    200);

  display_svg_annotation(50+bar_width*11, 50, bar_width, 300, 10, -100, 150, 
    "Annotations :)", 
    "Longer text to show text wrapping",
    200);
}

function display_annotation_other() {
  text.innerHTML = "Other"

  display_svg_annotation(50, 50, bar_width*3, 300, 10, 350, 10, 
    "Annotations :)", 
    "Longer text to show text wrapping",
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
    .notePadding(15)
    .textWrap(wrap)
    .type(type)
    .annotations(annotations)

  d3.select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations)
}

// TODO: move tooltips into here?