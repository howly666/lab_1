function drawSmile(svgSel) {
  const smile = svgSel.append("g")
    .style("stroke", "brown")
    .style("stroke-width", 2)
    .style("fill", "brown");

  // Лицо
  smile.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 50)
    .style("fill", "yellow");

  // Левый глаз
  smile.append("circle")
    .attr("cx", -20)
    .attr("cy", -10)
    .attr("r", 5);

  // Правый глаз
  smile.append("circle")
    .attr("cx", 20)
    .attr("cy", -10)
    .attr("r", 5);

  // Улыбка
  const arc = d3.arc()
    .innerRadius(35)
    .outerRadius(35);

  smile.append("path")
    .attr("d", arc({
      startAngle: Math.PI / 3 * 2,
      endAngle:   Math.PI / 3 * 4
    }))
    .style("stroke", "brown");

  return smile;
}
