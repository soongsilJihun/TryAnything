class Imjong {
  constructor() {
    this.bgimg = null;
    this.img = null;
    this.img1 = null;

    this.tears = []; // 눈물 객체 배열
    this.tearCount = 0;
    this.finished = false;
  }

  preload() {
    this.bgimg = loadImage('assetsCY/no임종배경.png');
    this.img = loadImage('assetsCY/no임종.png');
    this.img1 = loadImage('assetsCY/눈물.png');
  }

  setup() {
    createCanvas(1366, 768);
    this.tears = [];
    this.tearCount = 0;
    this.finished = false;
  }

  update() {
    for (let i = this.tears.length - 1; i >= 0; i--) {
      const tear = this.tears[i];
      tear.y += 2;
      tear.alpha -= 2;
      if (tear.y > 650 || tear.alpha <= 0) {
        this.tears.splice(i, 1);
      }
    }
  }

  draw() {
    background(255);
    imageMode(CORNER);
    image(this.bgimg, 0, 0, width, height);

    imageMode(CENTER);
    image(this.img, width / 2 + 30, height / 2 + 200, 500, 500);

    for (let tear of this.tears) {
      tint(255, tear.alpha);
      image(this.img1, tear.x, tear.y, 15, 35);
    }
    noTint();

    // 안내 텍스트
    fill(0);
    textSize(20);
    textAlign(CENTER, BOTTOM);
    if (this.finished) {
      text("스페이스바를 눌러 다음 씬으로", width / 2, height - 40);
    } else {
      text("마우스를 클릭해 눈물 흘리기 (5번)", width / 2, height - 40);
    }
  }

  mousePressed() {
    this.tears.push({
      x: width / 2 - 30,
      y: height / 2 + 100,
      alpha: 255
    });
    this.tearCount++;
    if (this.tearCount >= 5) {
      this.finished = true;
    }
  }

  keyPressed() {
    if (this.finished && key === ' ') {
      this.manager.nextScene();
    }
  }
}
