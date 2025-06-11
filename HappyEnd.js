class HappyEnd {
  constructor() {
    this.bgimg = null;
    this.img = null;
    this.manager = null; // SceneManager 연결 필요
  }

  preload() {
    this.bgimg = loadImage('assetsCY/yes임종배경.png');
    this.img = loadImage('assetsCY/yes임종.png');
  }

  setup() {
    createCanvas(1366, 768);
    imageMode(CENTER);
  }

  update() {
    // 업데이트 로직 없음
  }

  draw() {
    background(255);
    imageMode(CORNER);
    image(this.bgimg, 0, 0, width, height);
    imageMode(CENTER);
    image(this.img, 350, height / 2 + 50, 900, 650);

    fill(0);
    textSize(24);
    textAlign(CENTER, BOTTOM);
    text("스페이스바를 눌러 마지막 장면으로", width / 2, height - 40);
  }

  keyPressed() {
    if (key === ' ') {
      this.manager.nextScene();
    }
  }

  mousePressed() {
    // 필요 시 추가 가능
  }
}
