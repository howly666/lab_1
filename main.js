const W = 600;
const H = 600;

document.addEventListener("DOMContentLoaded", function () {
  d3.select("svg")
    .attr("width",  W)
    .attr("height", H);

  const pict = drawSmile(d3.select("svg"));
  pict.attr("transform", `translate(${W / 2}, ${H / 2})`);
});

function v(id) {
  return +document.getElementById(id).value;
}

function buildTransform(cx, cy, sx, sy, rot) {
  return `translate(${cx},${cy}) scale(${sx},${sy}) rotate(${rot})`;
}

function doDraw() {
  const svg  = d3.select("svg");
  const pict = drawSmile(svg);
  pict.attr("transform", buildTransform(
    v("cx"), v("cy"),
    v("sx"), v("sy"),
    v("rot")
  ));
}

function doClear() {
  d3.select("svg").selectAll("*").remove();
}

const easeMap = {
  linear:  d3.easeLinear,
  elastic: d3.easeElastic,
  bounce:  d3.easeBounce
};

function getEase() {
  const val = document.getElementById("ease-select").value;
  return easeMap[val] || d3.easeLinear;
}

function runAnimation() {
  const svg    = d3.select("svg");
  const isPath = document.getElementById("chk-path").checked;
  const pict   = drawSmile(svg);

  if (!isPath) {
    const startT = buildTransform(
      v("cx"),        v("cy"),
      v("sx"),        v("sy"),
      v("rot")
    );
    const endT = buildTransform(
      v("cx_finish"), v("cy_finish"),
      v("sx_finish"), v("sy_finish"),
      v("rot_finish")
    );

    pict.attr("transform", startT)
      .transition()
      .duration(6000)
      .ease(getEase())
      .attr("transform", endT);

  } else {
    const typeVal = +document.getElementById("path-type").value;
    const path    = drawPath(typeVal);

    pict.transition()
      .ease(getEase())
      .duration(6000)
      .attrTween("transform", translateAlong(path.node()));
  }
}

function doAnimate() {
  runAnimation();
}


function toggleAnimMode() {
  const on = document.getElementById("chk-anim").checked;

  document.querySelectorAll(".anim-only").forEach(el => {
    el.classList.toggle("hidden", !on);
  });

  document.querySelectorAll(".draw-only").forEach(el => {
    el.classList.toggle("hidden", on);
  });

  if (!on) {
    document.getElementById("chk-path").checked = false;
    togglePathMode();
  }
}

function togglePathMode() {
  const on = document.getElementById("chk-path").checked;

  document.getElementById("block-coords").classList.toggle("hidden",  on);
  document.getElementById("block-path").classList.toggle("hidden",   !on);
  document.getElementById("block-scale").classList.toggle("hidden",   on);
  document.getElementById("block-rotate").classList.toggle("hidden",  on);
}
