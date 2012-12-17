window.onload = function()
{
  var img = new Image();
  img.src = 'yo.jpg'; 
  var check = false;
  var pixel = [];
  img.onload = function ()
    {
      var context = document.getElementById('canvas').getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      width = window.innerWidth;
      height = window.innerHeight;
      dataset = [];
      var randomPositions = [];
      var x = 0, y = 0, scale = 10, offsetx = 300, offsety = 100;
      var imgData = context.getImageData(0, 0, canvas.height, canvas.width);
      for(i = 0; i < imgData.data.length; i+=4){
            var point = new Point(x * scale + offsetx, y * scale + offsety);
            var size = 20;
            randomPositions.push(point);
            dataset.push(new Duck(Math.random() * width, Math.random() * height, 30 / size, 1 / (6 * size), (Math.random() * Math.PI * 2), (Math.PI * 2)/(size), size, d3.rgb(imgData.data[i],
            imgData.data[i + 1],
            imgData.data[i + 2])));
            x++;
            if(x >= img.width)
              {
              y++;
              x = 0;
              }
          }
      context.clearRect(0, 0, canvas.width, canvas.height);
      /*for(var i = 0; i < IMAGE.length; i++)
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
      }*/
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
          .selectAll("rect")
        	.data(dataset)
        	.enter()
        	.append("rect")
          .attr("x", function(d) { return d.x; } )
          .attr("y", function(d) { return d.y; } )
          .attr("width", function(d) { return d.size/2; } )
          .attr("height", function(d) { return d.size/2; } )
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
            mouseMoving = false;
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
            mouseMoving = true;
          }
          if(rmouseCheck)
          {
          }
          for (var i = 0; i < dataset.length; i++) {
            dataset[i].maxMs = controls.maxSpeed/ (dataset[i].size);
            dataset[i].acc = 2*controls.accel/dataset[i].size;
            dataset[i] = stalk(dataset[i], mouseMoving, mouseX, mouseY, randomPositions[i].x, randomPositions[i].y);
            //dataset[i]=warp(dataset[i], width, height);

          };
        svg.selectAll("rect")
        .data(dataset)
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
        mouseMoving = false;
      }
      window.setInterval(update,5);
  }
}