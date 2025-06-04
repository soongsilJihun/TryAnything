class Imjong {
  constructor() {
    this.img = null;
    this.img1 = null;
    this.bgimg = null;
  }

  preload() {
    this.bgimg = loadImage('assetsCY/no임종배경.png');
    this.img = loadImage('assetsCY/no임종.png');
    this.img1 = loadImage('assetsCY/눈물.png');
  }

  setup() {
    createCanvas(1366, 768);
  }

  draw() {
    imageMode(CORNER);
    image(this.bgimg, 0, 0, width, height);
    imageMode(CENTER);
    image(this.img, width / 2 + 30, height / 2 + 200, 500, 500);
    image(this.img1, width / 2 - 30, height / 2 + 100, 15, 35);
  }

  mousePressed(){
    // 필요 시 다음 씬 전환 기능 삽입 가능
    this.manager.nextScene();
  }
}