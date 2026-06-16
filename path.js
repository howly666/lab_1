function createPathG() {
  const svgEl  = d3.select("svg");
  const width  = +svgEl.attr("width");
  const height = +svgEl.attr("height");

  const data   = [];
  const padding = 80;
  const step    = 5;

  let posX = padding;
  let posY = height - padding;

  while (posY > padding) {
    data.push({ x: posX, y: posY });
    posY -= step;
  }

  while (posX < width - padding) {
    data.push({ x: posX, y: posY });
    posX += step;
  }

  return data;
}

function createPathCircle() {
  const svgEl  = d3.select("svg");
  const width  = +svgEl.attr("width");
  const height = +svgEl.attr("height");

  const data = [];

  for (let t = 0; t <= Math.PI * 2; t += 0.05) {
    data.push({
      x: width  / 2 + width  / 3 * Math.sin(t),
      y: height / 2 + height / 3 * Math.cos(t)
    });
  }

  return data;
}

function drawPath(typePath) {
  const svgEl      = d3.select("svg");
  const dataPoints = (typePath === 0) ? createPathG() : createPathCircle();

  const line = d3.line()
    .x(d => d.x)
    .y(d => d.y);

  const path = svgEl.append("path")
    .attr("d", line(dataPoints))
    .attr("stroke", "none") 
    .attr("fill",   "none");

  return path;
}

function translateAlong(pathNode) {
  const length = pathNode.getTotalLength();
  return function () {
    return function (t) {
      const { x, y } = pathNode.getPointAtLength(t * length);
      return `translate(${x},${y})`;
    };
  };
}
