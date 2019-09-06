const canvas  = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
document.body.style.margin = 0;

let minimumDistance = prompt("amount of magnetic distance");
let population = prompt("amount of population number");
let repellingForce = prompt("amount of repellance force");
let points = [];

for(let i = 0; i < population; i++)
{
  let x = getRandomInt(100, canvas.width-10);
  let y = getRandomInt(100, canvas.height-10);

  let velocity = getRandomVelocity(-1, 1);
  
  let point = new Point(x, y, 5);
  point.setVelocity(velocity);
  points.push(point);  
}

function main()
{
  let deltaTime = getDeltaTime();
  clearScreen();
  drawGrid();
  for(let [index, point] of points.entries())
  {
    point.draw();
    point.update();
    for(let i = 0; i < points.length; i++)
    {
      let pointA = point;
      let pointB = points[i];
      if( getDisplacement(pointA, pointB) <= minimumDistance )
      {
        drawLine(pointA, pointB, 'orange');
        let direction = getDirection(pointA, pointB);
        let dirX = direction.getX() * repellingForce;
        let dirY = direction.getY() * repellingForce;
        
        pointA.setVelocity(
          new Vector(
            pointA.getVelocity().getX() + dirX,
            pointA.getVelocity().getY() + dirY
          )
        );

        pointB.setVelocity(
          new Vector(
            pointB.getVelocity().getX() - dirX,
            pointB.getVelocity().getY() - dirY
          )
        );
      }
    }
    if( isOutOfBounds(point) )
    {
      let newVelocity = point.getVelocity();

      newVelocity.multiply(-1);
      point.setVelocity(newVelocity);
    }
  }
}

function drawGrid()
{
  for(let i = 0; i < canvas.width || i < canvas.height; i+= 35)  
  {
    drawLine(
      new Vector(i, 0),
      new Vector(i, canvas.height),
      'green'
    );
    drawLine(
      new Vector(0, i),
      new Vector(canvas.width, i),
      'green'
    );
  }
}

function drawLine(pointA, pointB, colour)
{
  context.beginPath();
  context.strokeStyle = colour;
  context.moveTo(pointA.getX(), pointA.getY());
  context.lineTo(pointB.getX(), pointB.getY());
  context.stroke();
  context.closePath();
}

function getRandomVelocity(min, max)
{
  let velX = getRandomInt(min, max);
  let velY = getRandomInt(min, max);
  let velocity = new Vector(velX, velY);
  let magnitude = velocity.getMagnitude();
  velocity.setMagnitude(magnitude);
  return velocity;
}

function getDeltaTime()
{
  let startFrame = Date.now();
  let endFrame = Date.now();
  endFrame = startFrame;
  startFrame = Date.now();

  let deltaTime = (startFrame - endFrame) / 1000;
  if (deltaTime > 1) deltaTime = 1;

  return deltaTime;
}

function getDirection(pointA, pointB)
{
  let x = pointA.getX() - pointB.getX();
  let y = pointA.getY() - pointB.getY();
  let vec = new Vector(x, y);
  vec.normalise();
  return vec;
}

function getDisplacement(pointA, pointB)
{
  let x = pointA.getX() - pointB.getX();
  let y = pointA.getY() - pointB.getY();
  let result = Math.sqrt( x**2 + y**2 );

  if(isNaN(result)) return 0;

  return result;
}

function isOutOfBounds(point)
{
  let left = point.getX() - point.getRadius()/2 <= 0;
  let right = point.getX() + point.getRadius()/2 >= canvas.width;
  let up = point.getY() - point.getRadius()/2 <= 0; 
  let down = point.getY() + point.getRadius()/2 >= canvas.height;

  return left || right || up || down;
}

function getRandomInt(min, max)
{
  let result = Math.random() * (max - min + 1) + min;
  return result;
}

function clearScreen()
{
  context.save();
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.restore();
}

(function ()
{
  let onEachFrame;

  if( window.requestAnimationFrame )
  {
    onEachFrame = function(callback)
    {
      let _callback = function()
      {
        callback();
        window.requestAnimationFrame(_callback);
      };
      _callback();
    }
  } else if( window.mozRequestAnimationFrame ) {

    onEachFrame = function(callback)
    {
      let _callback = function()
      {
        callback();
        window.mozRequestAnimationFrame(_callback);
      };
      _callback();
    }
  } else {
    onEachFrame = function(callback)
    {
      window.setInterval(callback, 1000/60);
    }
  }
window.onEachFrame = onEachFrame;
})();
window.onEachFrame(main);
canvas.resize = function()
{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', canvas.resize);
