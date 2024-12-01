let mCamera;
let faceMesh;
let faces = [];
let overlayImg;

function preload() {
  mCamera = createCapture(VIDEO);
  mCamera.size();
  mCamera.hide();
  faceMesh = ml5.faceMesh();
  overlayImg = loadImage('../assets/mask.png');

}

function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  faceMesh.detectStart(mCamera, gotFaces);
}

function draw() {
  background(180, 200, 255);
  image(mCamera, 0, 0);

  if (faces.length > 0) {
    let face = faces[0];
    if (face.keypoints && face.keypoints.length > 0) {

      let centerX = 0;
      let centerY = 0;
      for (let i = 0; i < face.keypoints.length; i++) {
        centerX += face.keypoints[i].x;
        centerY += face.keypoints[i].y;
      }
      centerX /= face.keypoints.length;
      centerY /= face.keypoints.length;

      fill(0, 255, 0);
      ellipse(centerX, centerY, 10);


      let imgWidth = overlayImg.width / 4;
      let imgHeight = overlayImg.height / 4;
      image(overlayImg, centerX - imgWidth / 2, centerY - imgHeight / 2, imgWidth, imgHeight);
  }
}
}
