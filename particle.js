class Particle {
  //constructor setting initial particle attributes
  constructor() {
    this.pos = createVector(
      random(windowWidth / 2 - 10, windowWidth / 2 + 10),
      random(0, windowHeight)
    ); //initial position of particles set along the middle of the screen
    this.vel = createVector(random(-2, 2), random(-2, 2));
    // this.vel = createVector(0, 0)
    this.acc = createVector(0, 0);
    this.mass = random(0.1, 1.2);
    this.r = 4;

    //variables to set up angle velocity changing with perlin noise
    this.angle = 0;
    this.angleA = 0;
    this.angleV = 0;

    //this.colour = color(random(255), random(255), random(255));
    this.colour = color(20);
  }

  //friction function
  friction() {
    this.vel.mult(0.99);
  }

  //simulates a drag force on the particles as they gain velocity,
  //could also be achieved by placing a limit on the velocity. However,
  //this slows the particles as the velocity increases rather than accelerates up to a point
  drag() {
    //direction of drag force
    let drag = this.vel.copy();
    drag.normalize();
    drag.mult(-1);

    //magnitude of drag force
    let cofd = 0.001;
    let speedSq = this.vel.magSq();
    drag.setMag(cofd * speedSq);

    this.applyForce(drag);
  }

  changeAngle() {
    //if the particle is moving left, it changes direction with perlin noise limited to between 45 deg and 135 deg
    //if particles is moving right, it changes direction with perlin noise limited to between 45 deg and 135 deg
  }

  //edges function makes particles reverse their x,y velocities (by * by -1) if they touch the edge of the window
  edges() {
    if (this.pos.x >= windowWidth - this.r) {
      this.pos.x = windowWidth - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= 0 + this.r) {
      this.pos.x = 0 + this.r;
      this.vel.x *= -1;
    }
    if (this.pos.y >= windowHeight - this.r) {
      this.pos.y = windowHeight - this.r;
      this.vel.y *= -1;
    } else if (this.pos.y <= 0 + this.r) {
      this.pos.y = 0 + this.r;
      this.vel.y *= -1;
    }
  }

  //creates an apply force function into which different external forces can be passed
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f); //add. ADDS all the forces applied together
  }

  //update updates the position of the particles every frame
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // this.angleA = this.acc.y / 5;

    // this.angleV += this.angleA;
    // this.angle += this.angleV;

    this.acc.set(0, 0); //sets the acceleration vector to 0 at the end of every frame, i.e. if the force goes away it should go back to 0
  }
  //show draws the object on the screen
  show() {
    strokeWeight(0);
    fill(this.colour);

    push();
    translate(this.pos.x, this.pos.y);
    this.angle = this.vel.heading();
    rotate(this.angle);
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();

    // circle(this.pos.x, this.pos.y, this.r * 2);
  }
}
