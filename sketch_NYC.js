// https://p5js.org/reference/

// Declare variable table, with global scope
let table
let circles = [];
let fadeInSpeed = 0.1
var angle = 2.0;
var offset = 500;
var scalar = 30;
var speed = 1.5;

async function preload() {
  // my table is comma separated value "csv"
  // and has a header specifying the columns labels
  table = await loadTable('assets/School_Quality_Reports_High_Schools.csv', 'csv', 'header');
  // return table;
}

function setup() {

  //Check if table is loaded
  if (!table) {
    console.error('Table not loaded.');
    return;
  }

  createCanvas(windowWidth, windowHeight);
  background('white');
  
  console.log(table);

  // print object to table
  print(table);

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
    angle: angle,
    radius: 0,
    x: offset + cos(angle) * scalar,
    y: offset + sin(angle) * scalar,
    opacity: 0,
    score: score,
});

 angle += speed;
 scalar += speed;

 // Sort circles by size (descending order)
 circles.sort((a, b) => b.size - a.size);
}

}

function mouseOverCircle(x, y, r) {
  let d = dist(mouseX, mouseY, x, y);
  return (d < r);
}

function draw() {
  
  for (let j = 0; j < circles.length; j++) {

    fill(circles[j].color);
    noStroke();
    ellipse(circles[j].x, circles[j].y, circles[j].size + 20, circles[j].size + 20);
   
    console.log(mouseX, mouseY);

    if(mouseOverCircle(circles[j].x, circles[j].y, circles[j].size + 20)){
      // ellipse(x,y, circles[j].size + 50, circles[j].size + 50)
      fill('gray');
      textAlign(CENTER, CENTER)
      textSize(14);
      text(`${circles[j].name}\nSAT Score: ${circles[j].score}\nQuality: ${circles[j].quality}`,circles[j].x, circles[j].y);
      
    }
  }
}

function getCircleSize(score) {
  return map(score, 900, 2200, 0, 70);
}
