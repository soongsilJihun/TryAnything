class Wedding30 {
  constructor() {
    this.bgimg = null;
    this.img = null;
  }

  preload() {
    this.bgimg = loadImage('assetsCY/결혼식장 사진.png');
    this.img = loadImage('assetsCY/신랑신부.png');
  }

  setup() {
    createCanvas(1366, 768);
    background(this.bgimg);
    
  }

  draw() {
    imageMode(CORNER);
    image(this.bgimg, 0,0,width, height);
    imageMode(CENTER);
    image(this.img, width / 2, height / 2 + 200, 500, 700);
  }

  mousePressed() {
    // 필요 시 다음 씬 전환 기능 삽입 가능
    this.manager.nextScene();
  }
}
