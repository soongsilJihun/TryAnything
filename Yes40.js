class Yes40 {
  constructor() {
    this.bgImg = null;
    this.btn1 = null;
    this.btn2 = null;
    this.btn3 = null;
    this.btn4 = null;
    this.centerImg = null;
  }

  preload() {
    this.bgImg = loadImage("assets_yj/bg.png");         // 배경 이미지
    this.btn1 = loadImage("assets_yj/oldman.png");       // 왼쪽 사람
    this.btn2 = loadImage("assets_yj/oldcoman.png");     // 오른쪽 사람
    this.btn3 = loadImage("assets_yj/text.png");         // 오른쪽 위 텍스트
    this.btn4 = loadImage("assets_yj/text2.png");        // 왼쪽 위 텍스트
    this.centerImg = loadImage("assets_yj/comeYoutube.png"); // 가운데 배너 이미지
  }

  setup() {
    createCanvas(1366, 768);
  }

  draw() {
    background(255);
    image(this.bgImg, 0, 0, width, height);

    image(this.btn1, 300, 440, 290, 390);      // 왼쪽 인물
    image(this.btn2, 700, 440, 290, 390);      // 오른쪽 인물

    image(this.centerImg, 500, 50, 250, 350);

    image(this.btn3, 950, 300, 400, 200);      // 오른쪽 텍스트
    image(this.btn4, 50, 350, 300, 200);       // 왼쪽 텍스트

    fill(0);
    textSize(40);
    text('유튜버 도전 해볼래?', 1020, 400);

    textSize(30);
    text('도전한다!', 110, 450);
  }
  mousePressed() {
    this.manager.nextScene(); // 다음 씬으로 이동
  }
}
