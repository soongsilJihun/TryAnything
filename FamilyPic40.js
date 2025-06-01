class FamilyPic40 {
  constructor() {
    this.btn1 = null;
  }

  preload() {
    this.btn1 = loadImage("assets_yj/familypic.png");
  }

  setup() {
    imageMode(CORNER);
    // 캔버스는 sketch.js에서 생성하므로 생략
  }

  update() {
    // 애니메이션 등 필요한 로직이 있다면 여기에
  }

  draw() {
    background(255); // 흰 배경
    if (this.btn1) {
      image(this.btn1, 470, 100, 500, 650);
    }

    // 예시 텍스트 (선택 사항)
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("가족사진 장면입니다", width / 2, 50);
  }

  mousePressed() {
    // 예: 다음 씬으로 넘기려면 아래 사용
    this.manager.nextScene();
  }

  keyPressed() {
    // 예: 스페이스바로 넘어가려면
    // if (key === ' ') this.manager.nextScene();
  }
}
