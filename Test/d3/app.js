window.onload = function()
{
  width = window.innerWidth;
  height = window.innerHeight;
  dataset = [];
  var randomPositions = [];
  var x = 0, y = 0, scale = 1, offsetx = 300, offsety = 30;
  for(var i = 0; i < IMAGE.length; i++)
  {

    switch (IMAGE[i]) {
      case "0":
        y++;
        x = 0;
        break;
      case "@":
        var point = new Point(x * scale + offsetx, y * scale + offsety);
         
          randomPositions.push(point);
          var size = 1;
          dataset.push(new Duck(Math.random() * width, Math.random() * height, 1 / (2 * size), 1 / (6 * size), (Math.random() * Math.PI), (2 * Math.PI)/(size), size, "black"));
         
        x++;
        break;
      case ",":
      case ":":
        var point = new Point(x * scale + offsetx, y * scale + offsety);
         
          randomPositions.push(point);
        var size = 1;
         dataset.push(new Duck(Math.random() * width, Math.random() * height, 1 / (2 * size), 1 / (6 * size), (Math.random() * Math.PI), (2 * Math.PI)/(size), size, "yellow"));
        
        x++;
        break;
      default:
        x++;
      }
  }
  var lmouseCheck = false;
  var rmouseCheck = false;
  var mouseX = 0;
  var mouseY = 0;
  var mouseMoving = false;
  svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
            displ();
  function displ()
  {
    var circles = svg
      .selectAll("circle")
    	.data(dataset)
    	.enter()
    	.append("circle")
      .attr("cx", function(d) { return d.x; } )
      .attr("cy", function(d) { return d.y; } )
      .attr("r", function(d) { return d.size; } )
      .attr("fill", function(d){ return d.color; });
  }
  function update()
  {
    document.body.oncontextmenu = function()
    {
    return false;
    }
    document.body.onmousedown = function()
    {
      switch (event.which) {
      case 1:
        lmouseCheck = true;
        break;
      case 2:
        break;
      case 3:
        rmouseCheck = true;
        break;
      }
    }
    document.body.onmouseup = function()
    {
      switch (event.which) {
      case 1:
        lmouseCheck = false;
        break;
      case 2:
        break;
      case 3:
        rmouseCheck = false;
        break;
      }       
    }
    document.body.onmousemove = function() 
    {
      mouseX = event.clientX - 5;
      mouseY = event.clientY - 5;
      mouseMoving = true;
    }
      if(lmouseCheck)
      {
        dataset[0].angle += dataset[0].as;
      }
      if(rmouseCheck)
      {
       dataset[0].angle -= dataset[0].as;
      }
      for (var i = 0; i < dataset.length; i++) {
        dataset[i].maxMs = controls.maxSpeed/ (2 * dataset[i].size);
        dataset[i].acc = controls.accel/dataset[i].size;
        dataset[i]=stalk(dataset[i], mouseMoving, mouseX, mouseY, randomPositions[i].x, randomPositions[i].y);
        //dataset[i]=warp(dataset[i], width, height);

      };
    svg.selectAll("circle")
    .data(dataset)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
    mouseMoving = false;
  }
  window.setInterval(update,5);
}