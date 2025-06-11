let CameraImg, FamilyImg, btn2, photoImg;
let flashAlpha = 0;
let flashPhase = "idle"; // "idle", "flashUp", "hold", "fadeOut"
let showPhoto = false;
let holdStartTime = 0;

function preload() {
  CameraImg = loadImage("assets_yj/camera.png");
  FamilyImg = loadImage("assets_yj/family.png");
  btn2 = loadImage("assets_yj/text.png");
  photoImg = loadImage("assets_yj/familypic.png"); // 촬영된 액자 사진
}

function setup() {
  createCanvas(1366, 768);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255);

  // 1. 기본 화면 or 사진 출력
  if (showPhoto) {
    image(photoImg, width / 2, height / 2, 400, 600);
  } else {
    drawCameraScene(); 
  }

  // 2. 플래시 처리
  if (flashPhase === "flashUp") {
    flashAlpha += 39; // 아주 빠르게 밝아짐
    if (flashAlpha >= 255) {
      flashAlpha = 255;
      flashPhase = "hold";
      holdStartTime = millis();
    }
  } else if (flashPhase === "hold") {
    if (millis() - holdStartTime > 200) { // 300ms 정지
      flashPhase = "fadeOut";
      showPhoto = true;
    }
  } else if (flashPhase === "fadeOut") {
    
    flashAlpha -= 10; // 느리게 사라짐
    if (flashAlpha <= 0) {
      flashAlpha = 0;
      flashPhase = "idle";
    }
  }

  // 3. 흰색 오버레이
  if (flashAlpha > 0) {
    fill(255, flashAlpha);
    noStroke();
    rect(0, 0, width, height);
  }
}

function mousePressed() {
  if (flashPhase === "idle") {
    flashAlpha = 0;
    flashPhase = "flashUp";
    showPhoto = false;
  }
}

function keyPressed() {
    if(key === ' ' && flashPhase === "idle"){
        //다음씬으로 전환환
        console.log("다음씬으로 전환 ");
    }
}

function drawCameraScene() {
  push();
  translate(width / 2, height / 2);
  image(CameraImg, 0, 0, 800, 600);
  image(FamilyImg, -80, 0, 470, 400);
  pop();

  // 말풍선
  image(btn2, 300, 200, 400, 300);
  fill(0);
  textSize(28);
  textAlign(LEFT, CENTER);
  text("자 찍습니다~", 200, 200);

  // 안내 텍스트
  fill(0);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("마우스를 눌러 사진을 찍습니다.", width / 2, 50);
}
