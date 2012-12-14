function getDistance(x1,y1,x2,y2)
{
  xs = x2 - x1;
  xs = xs * xs;
  ys = y2 - y1;
  ys = ys * ys;
  return Math.sqrt( xs + ys );
}
function vectorialAdvance(object)
{
	var x = object.x;
	var y = object.y;
	var ms = object.ms;
	var angle = object.angle;
	object.x += Math.cos(angle)*ms;
	object.y += Math.sin(angle)*ms;
	return object;
};
function follow(mouseX,mouseY,object)
{
	var x = object.x;
	var y = object.y;
	var angle = object.angle;
	var as = object.as;
	var difX = mouseX - x;
	var difY = mouseY - y
	var followAngle = Math.atan(difY/difX);
	while(angle > Math.PI * 2)
	{
		angle -= Math.PI * 2;
	}
	while(angle < 0)
	{
		angle += Math.PI * 2;
	}
	while(followAngle > Math.PI * 2)
	{
		followAngle -= Math.PI * 2;
	}
	if(difX > 0 && difY > 0)
	{
	}
	else if(difX > 0 && difY < 0)
	{
		followAngle += Math.PI*2;
	}
	else if(difX < 0 && difY > 0)
	{
		followAngle += Math.PI;
	}
	else
	{
		followAngle += Math.PI;
	}
		if(followAngle - angle > Math.PI)
		{
			angle += Math.PI*2;
		}
		if(angle - followAngle > Math.PI)
		{
			followAngle += Math.PI*2;
		}
			if(angle > followAngle)
			{
				if(Math.abs(angle - followAngle) < as)
				{
					angle -= Math.abs(angle - followAngle);
				}
				else
				{
					angle -= as;
				}
			}
			else if(angle < followAngle)
			{
				if(Math.abs(angle - followAngle) < as)
				{
					angle += Math.abs(angle - followAngle);
				}
				else
				{
					angle += as;
				}
			}
	object.angle = angle;
	return object;
};
function warp(object,maxW,maxH)
{
	var x = object.x;
	var y = object.y;
	if (x > maxW)
	{
		x = 0;
	}
		if (y > maxH)
	{
		y = 0;
	}
	if (x < 0)
	{
		x = maxW;
	}
	if (y < 0)
	{
		y = maxH;
	}
	object.x = x;
	object.y = y;
	return object;
};
function realign(object, coordX, coordY)
{
	var x = object.x;
	var y = object.y;
	var ms = object.ms;
	var acc = object.acc;
	var as = object.as * 3;
	var dist = getDistance(x, y, coordX, coordY);
	var minDist = (2 * ms) / acc;
	if(dist == 0)
	{
		ms = 0;
	}
	object = follow(coordX, coordY, object);
	object.ms = ms;
	if(dist <= minDist)
	{
		object.breaks();

	}
		var angle = object.angle;
		object.x += Math.cos(angle)*ms;
		object.y += Math.sin(angle)*ms;
	return object;
};
function stalk(object, moving, mouseX, mouseY, fixedX, fixedY)
{
	if(moving)
	{
		object.accelerate();
		object = follow(mouseX, mouseY, object);
		object = vectorialAdvance(object);
		return object;
	}
	else
	{
		object = realign(object, fixedX, fixedY);
		return object;
	}
};
