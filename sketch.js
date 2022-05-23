let particles = [];
let num = 50;
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < num; i++) {
    particles[i] = new Particle();
  } //initializes the particles once through the setup function with no. particles controlled by global variable num
}

function draw() {
  background(220, 100);

  //particle class functions are looped in an array with no. particles controlled by global variable num
  for (let i = 0; i < num; i++) {
    // let gravity = createVector(0, 1);
    // particles[i].applyForce(gravity);

    if (keyIsPressed && key == "d") {
      let windWest = createVector(0.1, 0);
      particles[i].applyForce(windWest);
    } //if 'd' is pressed then a wind force is applied from the west

    if (keyIsPressed && key == "a") {
      let windEast = createVector(-0.1, 0);
      particles[i].applyForce(windEast);
    } //if 'a' is pressed then a wind force is applied from the east
    
    //particles[i].direction();
    particles[i].friction();
    particles[i].edges();
    particles[i].update();
    particles[i].show();

  }
}
