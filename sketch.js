var song;
var fft;
let t = 0; // time variable

function preload() {
  song = loadSound("ugo.mp3");
}


  function setup () {
  createCanvas(600, 600)
  // userStartAudio();

  fft = new p5.FFT(0.9, 64); // numbe of bands first # smoothes range
}

function mousePressed () {
  if (song.isLoaded()){
    loadTime = millis();
    print (loadTime);
    song.play();
  }
}

function draw() {
  colorMode (RGB);
  angleMode(RADIANS);
  background(10, 10); // translucent background (creates trails)
  noStroke();
  fill(30);
  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 30) {
    for (let y = 0; y <= height; y = y + 30) {
      // starting point of each circle depends on mouse position
      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      const myX = x + 20 * cos(2 * PI * t + angle);
      const myY = y + 20 * sin(2 * PI * t + angle);

      ellipse(myX, myY, 19); // draw particle
    }
  }

  t = t + 0.01; // update time

  // background(0);

// }

    colorMode (HSB);
  angleMode(DEGREES);
  var spectrum = fft.analyze();
  // console.log(spectrum);
  // noStroke();
  translate(width / 2, height / 2);
  //beginShape();
  for (var i =0; i <spectrum.legnth; i++) {
    var angle = map(i, 0, spectrum.legnth, 0, 360) ;
    var amp = spectrum[i];
    var r = map(amp, 0, 256, 20, 100); // last two is size
    //fill(i, 255, 255);
    var x = r * cos(angle);
    var y = r * sin(angle);
    stroke(i, 255, 255)
    line(0, 0, x, y);
  }



//     //vertex (x, y);
//     //var y = map(amp, 0, 256, height, 0);
//     //rect(i * w, y, w-2, height - y);
  
//   //endShape();
}



