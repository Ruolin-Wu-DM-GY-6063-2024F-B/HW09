// original image, to use as reference for pixel colors
let oImg;

// display image, to modify and display on canvas
let mImg;

let img;

let sliderRed;

let redVal;
let greenVal;
let blueVal;
let alphaVal;

let p5Idx;
let pixIdx;

let randomNum

function preload() {
  oImg = loadImage("../assets/mondriaan.jpg");
  mImg = loadImage("../assets/mondriaan.jpg");
  img = loadImage("../assets/Danielle.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  oImg.resize(0, height);
  mImg.resize(0, height);
  img.resize(0, height);

  // we'll read pixel color info from the oImg, so let's load its pixels
  oImg.loadPixels();

  let rectDim = 5;
  noStroke();
  for (let y = 0; y < height; y += rectDim) {
    for (let x = 0; x < width; x += rectDim) {
      p5Idx = 4 * pixIdx;
      pixIdx = y * oImg.width + x;
      redVal = oImg.pixels[p5Idx + 0];
      greenVal = oImg.pixels[p5Idx + 1];
      blueVal = oImg.pixels[p5Idx + 2];
      alphaVal = oImg.pixels[p5Idx + 3];
    }

  }
  // TODO: setup sliders and other DOM/html elements here

  sliderRed = createSlider(0, 255, 178);
  sliderRed.position(10, 10);
  sliderRed.style("width", width - 20 + "px");
}

function draw() {
  clear();

  let threshold = sliderRed.value();

  mImg.loadPixels();
  img.loadPixels();

  randomNum = sliderRed.value();
  randomSeed(randomNum)

  let rectDim = 15;
  noStroke();

  for (let y = 0; y < height; y += rectDim) {
    for (let x = 0; x < oImg.width; x += rectDim) {
      pixIdx = y * oImg.width + x;
      p5Idx = 4 * pixIdx;

      redVal = oImg.pixels[p5Idx + 0];
      greenVal = oImg.pixels[p5Idx + 1];
      blueVal = oImg.pixels[p5Idx + 2];
      alphaVal = oImg.pixels[p5Idx + 3];

      if (redVal - greenVal > threshold && redVal - blueVal > threshold) {
        let bgPixIdx = (y * img.width + x) * 4;
        let bgRed = img.pixels[bgPixIdx];
        let bgGreen = img.pixels[bgPixIdx + 1];
        let bgBlue = img.pixels[bgPixIdx + 2];
        let bgAlpha = 255;

        fill(bgRed, bgGreen, bgBlue, bgAlpha);
      } else {
        let bgalphaVal = sliderRed.value()
        fill(redVal, greenVal, blueVal, bgalphaVal);
      }

      rect(x, y, random(8,32), random(8,32));
    }
  }

  mImg.updatePixels();


  mImg.resize(100,0)
  image(mImg,0,0);
}
