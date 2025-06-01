
class Yes30 {
  constructor() {
    this.bgimg = null;
    this.img = null;
    this.img1 = null;
    this.img2 = null;
    this.img3 = null;
  }

  preload() {
    this.img = loadImage('assetsCY/회사동료.png');
    this.img1 = loadImage('assetsCY/30대하트직장인.png');
    this.bgimg = loadImage('assetsCY/30대배경.png');
    this.img2 = loadImage('assetsCY/말풍선.png');
    this.img3 = loadImage('assetsCY/말풍선오.png');
  }

  setup() {
    createCanvas(1366, 768);
  }

  update() {}

  draw() {
     imageMode(CORNER);
    image(this.bgimg, 0,0, width, height);
    imageMode(CENTER);
    image(this.img, width / 2 + 150, height / 2 + 200, 300, 400);
    image(this.img1, width / 2 - 180, height / 2 + 200, 280, 400);
    image(this.img2, width / 2 + 350, height / 2 - 50, 300, 150);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(30);
    text('소개팅 받으실래염', width / 2 + 350, height / 2 - 50);
    image(this.img3, width / 2 - 350, height / 2 - 50, 300, 150);
    textSize(28);
    text('좋아', width / 2 - 350, height / 2 - 60);
  }

  mousePressed() {
    this.manager.nextScene();
  }
}
