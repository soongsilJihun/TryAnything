class FamilyPic40 {
  constructor() {
    this.CameraImg = null;
    this.FamilyImg = null;
    this.btn2 = null;
    this.photoImg = null;

    this.flashAlpha = 0;
    this.flashPhase = "idle"; // "idle", "flashUp", "hold", "fadeOut"
    this.showPhoto = false;
    this.holdStartTime = 0;

    this.photoTaken = false; // ✅ 사진 완전히 찍혔는지 여부
  }

  preload() {
    this.CameraImg = loadImage("assets_yj/camera.png");
    this.FamilyImg = loadImage("assets_yj/family.png");
    this.btn2 = loadImage("assets_yj/text.png");
    this.photoImg = loadImage("assets_yj/familypic.png");
  }

  setup() {
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
  }

  draw() {
    background(255);

    if (this.showPhoto) {
      image(this.photoImg, width / 2, height / 2, 400, 600);
    } else {
      this.drawCameraScene();
    }

    // 플래시 효과 단계별 처리
    if (this.flashPhase === "flashUp") {
      this.flashAlpha += 39;
      if (this.flashAlpha >= 255) {
        this.flashAlpha = 255;
        this.flashPhase = "hold";
        this.holdStartTime = millis();
      }
    } else if (this.flashPhase === "hold") {
      if (millis() - this.holdStartTime > 200) {
        this.flashPhase = "fadeOut";
        this.showPhoto = true;
      }
    } else if (this.flashPhase === "fadeOut") {
      this.flashAlpha -= 10;
      if (this.flashAlpha <= 0) {
        this.flashAlpha = 0;
        this.flashPhase = "idle";
        this.photoTaken = true; // ✅ 플래시 애니메이션이 끝났으니 사진 완료로 간주
      }
    }

    // 흰색 오버레이
    if (this.flashAlpha > 0) {
      fill(255, this.flashAlpha);
      noStroke();
      rect(0, 0, width, height);
    }
  }

  mousePressed() {
    if (this.flashPhase === "idle" && !this.photoTaken) {
      this.flashAlpha = 0;
      this.flashPhase = "flashUp";
      this.showPhoto = false;
    }
  }

  keyPressed() {
    if (key === ' ' && this.flashPhase === "idle" && this.photoTaken) {
      console.log("다음씬으로 전환");
      this.manager.nextScene();
    }
  }

  drawCameraScene() {
    push();
    translate(width / 2, height / 2);
    image(this.CameraImg, 0, 0, 800, 600);
    image(this.FamilyImg, -80, 0, 470, 400);
    pop();

    // 말풍선
    image(this.btn2, 300, 200, 400, 300);
    fill(0);
    textSize(28);
    textAlign(LEFT, CENTER);
    text("자 찍습니다~", 200, 200);

    // 안내 문구
    fill(0);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("마우스를 눌러 사진을 찍습니다.", width / 2, 50);
  }
}
