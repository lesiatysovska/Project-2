// https://p5js.org/reference/

// Delare variable table, with global scope
let table
let circles = []

function preload() {
  // my table is comma separated value "csv"
  // and has a header specifying the columns labels
  table = loadTable('assets/School_Quality_Reports_High_Schools.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('white')
  // print object to table
  print(table)
}

function draw() {
  // loop through table object
  for (let r = 0; r < table.getRowCount(); r++) {
    let name = table.getString(r, 'School Name');
    let score = table.getNum(r, 'AverageSATScore');
    let quality = table.getString(r, 'Quality Review Rating');

    // use map to scale output size
    let circle_size = map(score, 900,2200,0,50)
    let ratingColor;
    if(quality == "Well Developed"){
      ratingColor = color('#A9CF55');}  //green
      else if(quality == "Proficient"){
      ratingColor = color('#70B7B9');}   //blue
      else if(quality == "Developing"){
      ratingColor = color('#F7E867'); }  //yellow
      else {
      ratingColor = color('#F14440');}  //red

// Store circle data in the array
circles.push({
  name: name,
  size: circle_size,
  quality: quality,
  color: ratingColor
});

 // Sort circles by size (descending order)
 circles.sort((a, b) => b.size - a.size);
  }

// Draw circles based on the sorted array

  let x = 200;
  let y = 200;

  for (let i = 0; i < circles.length; i++) {
  
   fill(circles[i]['color']);

   textAlign(CENTER,TOP)
   noStroke();
   circle(x, y, circles[i]['size']+200)
   textSize(11);
   fill(circles[i]['color']);
   text(name, x, y + circles[i]['size']/2 + 8);

  }
    // print(name) // print to console, console.log(name) will do the same thing
    
  noLoop()
}

// Resizes canvas to new window width and height  
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }