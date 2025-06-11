class ReturnScene {
  constructor() {
    this.bg = null;
    this.hourHand = null;
    this.minuteHand = null;

    this.minuteAngle = 0;
    this.hourAngle = 0;

    this.totalRotation = 0;
    this.rotationThreshold = 7200; // 예: 2바퀴
    this.readyForNext = false;
    this.manager = null; // SceneManager 연결 필요
  }

  preload() {
    this.bg = loadImage('assetsCY/시계.png');
    this.hourHand = loadImage('assetsCY/시침.png');
    this.minuteHand = loadImage('assetsCY/분침.png');
  }

  setup() {
    createCanvas(1366, 768);
    angleMode(DEGREES);
    imageMode(CENTER);
  }

  update() {
    let dx = mouseX - pmouseX;
    if (dx > 0) return; // 시계방향 움직임 무시

    const rotationAmount = dx; // 음수 유지 → 반시계 방향
    this.minuteAngle += rotationAmount;
    this.hourAngle += rotationAmount / 3;

    this.minuteAngle = (this.minuteAngle % 360 + 360) % 360;
    this.hourAngle = (this.hourAngle % 360 + 360) % 360;

    this.totalRotation -= rotationAmount; // 회전 누적값도 반대로 누적
    if (this.totalRotation >= this.rotationThreshold) {
      this.readyForNext = true;
    }
  }
  draw() {
    background(50);

    image(this.bg, width / 2, height / 2, 500, 500);

    push();
    translate(width / 2, height / 2);
    rotate(this.minuteAngle - 90);
    image(this.minuteHand, -30, 85, 70, 180);
    pop();

    push();
    translate(width / 2, height / 2);
    rotate(this.hourAngle - 90);
    image(this.hourHand, 35, -45, 80, 100);
    pop();

    fill(255);
    textSize(24);
    textAlign(CENTER, BOTTOM);
    if (this.readyForNext) {
      text("스페이스바를 눌러 다음 장면으로", width / 2, height - 40);
    } else {
      text("마우스를 왼쪽으로 움직여 시계를 돌려보세요", width / 2, height - 40);
    }
  }

  mousePressed() {
    // 필요 시 추가 가능
  }

  keyPressed() {
    if (this.readyForNext && key === ' ') {
      this.manager.nextScene();
    }
  }
}
