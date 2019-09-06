/**
  * author       :ormuseldesu
  * date         :2019/09/06 (September 6)
  * description  :my customer two-dimensional vector library
*/

class Vector
{
  constructor(x = 0, y = 0)
  {
    this.x = x;
    this.y = y;
  }

  set(x, y)
  {
    this.x = x;
    this.y = y;
  }

  setX(scalar)
  {
    this.x = scalar;
  }

  setY(scalar)
  {
    this.x = scalar;
  }

  setMagnitude(scalar)
  {
    this.normalise();
    this.x *= scalar;
    this.y *= scalar;
  }

  getMagnitude()
  {
    let magnitude = (this.x**2) + (this.y**2);
    return magnitude;
  }

  getX()
  {
    return this.x;
  }

  getY()
  {
    return this.y;
  }

  normalise()
  {
    let magnitude = this.getMagnitude();
    this.x = this.x / magnitude || 0;
    this.y = this.y / magnitude || 0;
  }

  add(vector)
  {
    let scalar = vector;
    if(vector instanceof Vector)  
    {
      this.x += vector.x;
      this.y += vector.y;
    } else {
      this.x += scalar;
      this.y += scalar;
    }
  }

  sub(vector)
  {
    let scalar = vector;
    if(vector instanceof Vector)
    {
      this.x -= vector.x;
      this.y -= vector.y;
    } else {
      this.x -= scalar;
      this.y -= scalar;
    }
  }

  multiply(vector)
  {
    let scalar = vector;
    if(vector instanceof Vector)
    {
      this.x *= vector.x;
      this.y *= vector.y;
    } else {
      this.x *= scalar;
      this.y *= scalar;
    }
  }

  divide(vector)
  {
    let scalar = vector;
    if(vector instanceof Vector)
    {
      this.x /= vector.x;
      this.y /= vector.y;
    } else {
      this.x /= scalar;
      this.y /= scalar;
    }
  }
}
