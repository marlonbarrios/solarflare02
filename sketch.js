//SOLAR FLARE 02
//A Visualized Song
//Created by: Marlon Barrios Solano
// Date: 2022-09-04
// Music by Grigoriy Nuzhny

var song
var fft
var particles = []

function preload() {
  song = loadSound('m.mp3')
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  angleMode(DEGREES)
  background(40)
  noFill()
  fft = new p5.FFT()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background(random(200, 255), 30)
}

function draw() {
 background(random(200, 255), 30)
//  background(random(255), random(255), random(255), 30)
 fft.analyze()
amp = fft.getEnergy(20, 250)
 
stroke(random(255))
  strokeWeight(amp * 0.08)
  fill(random(0,255), random(0,255), random(0,255), 30)
 

translate(width/2, height/2)


  var wave = fft.waveform()

  for (var t = -1 ; t <= 1; t += 2) {
beginShape()

  for (var i = 0; i <= 180; i += 4.5) {
    var index = floor(map(i, 0, 180, 0, wave.length-1))
    
    var r = map(wave[index], -1, 1, 50, 250 + amp * 0.4)
  
    var x = r * sin(i)  * t
    var y = r * cos(i)
    vertex(x, y)
  }
  endShape()
}

var p = new Particle()
particles.push(p)

for (var i = particles.length -1 ; i >= 0 ; i--) {

 if(!particles[i].edges()){
  particles[i].show()
particles[i].update(amp > 220)
} else {
  particles.splice(i, 1)
}
}
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause()
    noLoop()
  } else {
    song.play()
    loop()
  }
}

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(random( 80 + amp, 350))
    this.vel = createVector(0,0)
    this.acc = this.pos.copy().mult(random(0.0001, 0.00000009))

    this.w = random(3, 10)

    this.color = color(random(100, 255), random(100, 255), random(100, 255), random(100, 255))
  }

  update(cond) {

this.vel.add(this.acc)
this.pos.add(this.vel)
if(cond) {
this.pos.add(this.vel)
this.pos.add(this.vel)
this.pos.add(this.vel)
this.pos.add(this.vel)
}

  }

  edges() {
    if(this.pos.x < -width/2 || this.pos.x > width/2 || this.pos.y < -height/2 || this.pos.y > height/2) {
    return true
    } else { 
    return false
    }
  }


 show() {
  // noStroke()
 fill(this.color)
 stroke(random(amp))
 strokeWeight(amp * 0.03)
  ellipse(this.pos.x, this.pos.y, this.w + amp * 0.05 )
 }
}

