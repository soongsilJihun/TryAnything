
class No40 {
  constructor() {
    this.bgImg = null;
    this.btn1 = null;
    this.btn2 = null;
    this.btn3 = null;
    this.btn4 = null;
    this.btn5 = null;
    this.btn6 = null;
    this.btn7 = null;
  }

  preload() {
    this.bgImg = loadImage("assets_yj/bg.png");
    this.btn1 = loadImage("assets_yj/silver.png");
    this.btn2 = loadImage("assets_yj/gold.png");
    this.btn3 = loadImage("assets_yj/dia.png");
    this.btn4 = loadImage("assets_yj/oldman.png");
    this.btn5 = loadImage("assets_yj/oldcoman.png");
    this.btn6 = loadImage("assets_yj/text.png");
    this.btn7 = loadImage("assets_yj/text2.png");
  }

  setup() {
    createCanvas(1366, 768);
    imageMode(CORNER);
  }

  update() {}

  draw() {
    image(this.bgImg, 0, 0, width, height);
    // image(this.btn1, 150, 80, 200, 250);
    // image(this.btn2, 550, 80, 200, 250);
    // image(this.btn3, 900, 150, 200, 150);
    image(this.btn4, 300, 440, 290, 390);
    image(this.btn5, 700, 440, 290, 390);
    image(this.btn6, 950, 300, 400, 200);
    image(this.btn7, 50, 350, 300, 200);
    textAlign(LEFT, CENTER);
    fill(0);
    textSize(30);
    text('유튜버 도전 해볼래?', 1020, 400);

    fill(0);
    textSize(30);
    text('무서워 안 할래..', 110, 450);
  }

  mousePressed() {
    this.manager.nextScene();
  }
}
