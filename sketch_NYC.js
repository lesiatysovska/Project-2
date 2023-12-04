// https://p5js.org/reference/

// Declare variable table, with global scope
let table
let circles = [];
let fadeInSpeed = 5

async function preload() {
  // my table is comma separated value "csv"
  // and has a header specifying the columns labels
  table = await loadTable('assets/School_Quality_Reports_High_Schools.csv', 'csv', 'header');
  // return table;
}

function setup() {

  //Check if table is loaded
  if (!table) {
    console.error("Table not loaded.")
    return;
  }

  createCanvas(3000, 1200);
  background('white')
  
  console.log(table);

  // print object to table
  print(table)

  // loop through table object
  for (let r = 0; r < table.getRowCount(); r++) {
    let name = table.getString(r, 'School Name');
    let score = table.getNum(r, 'AverageSATScore');
    let quality = table.getString(r, 'Quality Review Rating');

    // use map to scale output size
    let ratingColor;
    if(quality == "Well Developed"){
      ratingColor = color(169, 207, 85, 150);}  //green '#A9CF55'
      else if(quality == "Proficient"){
      ratingColor = color(112, 183, 185, 150);}   //blue '#70B7B9'
      else if(quality == "Developing"){
      ratingColor = color(247, 232, 103, 150); }  //yellow '#F7E867'
      else {
      ratingColor = color(241, 68, 64, 150);}  //red '#F14440'

  // Map size
  let circleSize = getCircleSize(score);

  // Store circle data in the array
  circles.push({
    name: name,
    size: circleSize,
    quality: quality,
    color: ratingColor,
    x: random(width),
    y: random(height),
    opacity: 0
});

 // Sort circles by size (descending order)
 circles.sort((a, b) => a.size - b.size);
}

noLoop()

}

function draw() {
  
  for (let i=0; i<circles.length; i++) {

    // Calculate distance from mouse to the circle's center
    let distanceToMouse = dist(mouseX, mouseY, circles [i].x, circles[i].y);

    // Hover effect: change size
    if (distanceToMouse < circles[i].size * 2); {
    newSize = circles[i].size * 1.5;
    // Display information
    fill(0);
    textAlign(CENTER)
    textSize(14);
    text(
      '${circles[i].School Name}\nAverageSATScore: ${circles[i].AverageSATScore}\nRating: ${circles[i].quality}'
    )
  }

  // // Fading
  // circles[i].opacity += fadeInSpeed;
  // circles[i].opacity = constrain(circles[i].opacity, 0, 255);

  // //Draw the circle with the calculated opacity
  // noStroke();
  // fill(
  //   circles[i].color.levels[0], 
  //   circles[i].color.levels[1], 
  //   circles[i].color.levels[2], 
  //   circles[i].color.opacity);
    
  // circle(circles[i].x, circles[i].y, circles[i].size / 2 + 8);
  
  let angle = 100;
  let offset = 600;
  let scalar = 10;
  let rotationspeed = 2;

  for (let i = 0; i < circles.length; i++) {

    angle += rotationspeed;
    scalar += rotationspeed;
 
    let x = offset + cos(angle) * scalar;
    let y = offset + sin(angle) * scalar;

    fill(circles[i]['color']);
    noStroke();
    circle(x, y, circles[i]['size']+20)

    // textSize(11);
    // fill(circles[i]['color']);
    // text(circles[i]['name'], x, y + circles[i]['size']/2 + 8);
    // ellipse(x, y, 1, 1);
    
  }

}
}

function getCircleSize(score) {
  return map(score, 900, 2200, 0, 70);
}


// Draw circles based on the sorted array

  // let x = 200;
  // let y = 200;

  // for (let i = 0; i < circles.length; i++) {
  
  //  fill(circles[i]['color']);

  //  textAlign(CENTER,TOP)
  //  noStroke();
  //  circle(x, y, circles[i]['size']+20)
  //  textSize(11);
  //  fill(circles[i]['color']);
  //  text(name, x, y + circles[i]['size']/2 + 8);

  // }
    // print(name) // print to console, console.log(name) will do the same thing
    

// Resizes canvas to new window width and height  
// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
//   }