function Duck(initialX,initialY,maxMs,acc,initialAngle,as,size,color)
{
	this.x = initialX;
	this.y = initialY;
	this.maxMs = maxMs;
	this.acc = acc;
	this.angle = initialAngle;
	this.ms = maxMs;
	this.as = as;
	this.size = size;
	this.color = color;
	this.accelerate = function()
	{
		if(this.ms + this.acc >= this.maxMs)
		{
			this.ms = this.maxMs;
		}
		else
		{
			this.ms += this.acc;
		}
	}
	this.breaks = function()
	{
		if(this.ms - (this.acc) < 0)
		{
			this.ms = 0;
		}
		else
		{
			this.ms -= this.acc;
		}
	}
}
function Point(x, y)
{
	this.x = x;
	this.y = y;
}