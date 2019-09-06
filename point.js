/**
  @ author       :ormuseldesu
  @ date         :2019/09/06 (September 6)
  @ description  :my custom point class to spawn particles
*/

class Point
{
  constructor(x, y, radius)
  {
    this.vector = new Vector(x, y);
    this.velocity = new Vector();
    this.colour = this.getRandomColour();
    this.r = radius;
  }

  draw()
  {
    context.beginPath();
    context.arc(
      this.vector.getX(), 
      this.vector.getY(), 
      this.r, 0, Math.PI * 2
    );
    context.fillStyle = this.colour;
    context.fill();
    context.closePath();
  }

  update()
  {
    this.vector.add (this.velocity);
  }

  setVelocity(vector)
  {
      this.velocity = vector;
  }

  getVelocity()
  {
    return this.velocity;
  }

  getRandomColour()
  {
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    return `rgb(${red},${green},${blue})`;
  }

  getX()
  {
    return this.vector.getX();
  }

  getY()
  {
    return this.vector.getY();
  }

  getRadius()
  {
    return this.r;
  }
}
