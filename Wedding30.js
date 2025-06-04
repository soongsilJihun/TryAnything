class FireworkParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-4, 4);
    this.vy = random(-5, -1);
    this.alpha = 255;
    this.size = random(5, 12);
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1; // gravity
    this.alpha -= 4;
  }

  draw() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
    circle(this.x, this.y, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

class Wedding30 {
  constructor() {
    this.bgimg = null;
    this.img = null;
    this.fireworkParticles = [];
    this.clickCount = 0;
    this.readyForNext = false;
    this.manager = null; // 외부에서 this.manager 설정 필요
  }

  preload() {
    this.bgimg = loadImage('assetsCY/결혼식장 사진.png');
    this.img = loadImage('assetsCY/신랑신부.png');
  }

  setup() {
    createCanvas(1366, 768);
  }

  draw() {
    imageMode(CORNER);
    image(this.bgimg, 0, 0, width, height);
    imageMode(CENTER);
    image(this.img, width / 2, height / 2 + 200, 500, 700);

    // 텍스트 안내
    fill(0);
    textSize(20);
    textAlign(CENTER, BOTTOM);
    if (this.clickCount < 5) {
      text("마우스 클릭으로 축하폭죽 터트리기!", width / 2, 40);
    } else {
      this.readyForNext = true;
      text("스페이스바를 눌러 다음 장면으로", width / 2, 40);
    }

    // 폭죽 파티클 그리기
    for (let i = this.fireworkParticles.length - 1; i >= 0; i--) {
      const p = this.fireworkParticles[i];
      p.update();
      p.draw();
      if (p.isDead()) this.fireworkParticles.splice(i, 1);
    }
  }

  mousePressed() {
    this.clickCount++;

    for (let i = 0; i < 30; i++) {
      this.fireworkParticles.push(new FireworkParticle(mouseX, mouseY));
    }
  }

  keyPressed() {
    if (this.readyForNext && key === ' ') {
      this.manager.nextScene();
      
    }
  }
}
