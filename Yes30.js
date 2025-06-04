class HeartParticle {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.vx = random(-10, 10);
    this.vy = random(-3, 3);
    this.alpha = 255;
    this.size = random(15, 30);
    this.img = img;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  draw() {
    tint(255, this.alpha);
    image(this.img, this.x, this.y, this.size, this.size);
    noTint();
  }

  isDead() {
    return this.alpha <= 0;
  }
}

class Yes30 {
  constructor() {
    // 이미지 리소스
    this.img = null;
    this.img1 = null;
    this.img2 = null;
    this.img3 = null;
    this.bgimg = null;
    this.heart = null;

    // 하트 위치
    

    // 하트 크기 상태
    this.heartLWidth = 30;
    this.heartLHeight = 25;
    this.heartRWidth = 30;
    this.heartRHeight = 25;

    this.heartSize = 1.33; // 하트 크기 증가 비율
    this.shrinkRate = 0.97;
    this.maxWidth = 100;
    this.minWidth = 30;
    this.minHeight = 25;
    this.heartLPos = { x: 1366/2 - 205, y: 768/2 + 123 }; // 눈 위치 기준
    this.heartRPos = { x: 1366/2 - 155, y: 768/2 + 123 };
    // 폭발 관련
    this.heartParticles = [];
    this.heartExplosionTriggered = false;
    this.loveConfirmed = false; // ♥ 상태 고정 여부
  }

  preload() {
    this.img = loadImage('assetsCY/회사동료.png');
    this.img1 = loadImage('assetsCY/30대회사원.png');
    this.bgimg = loadImage('assetsCY/30대배경.png');
    this.img2 = loadImage('assetsCY/말풍선.png');
    this.img3 = loadImage('assetsCY/말풍선오.png');
    this.heart = loadImage('assetsCY/Heart.png'); // 폭발에도 재사용
  }

  draw() {
    imageMode(CORNER);
    image(this.bgimg, 0, 0, width, height);
    imageMode(CENTER);
    image(this.img, width / 2 + 150, height / 2 + 200, 300, 400);
    image(this.img1, width / 2 - 180, height / 2 + 200, 280, 400);
    image(this.img2, width / 2 + 350, height / 2 - 50, 300, 150);
    textAlign(CENTER, CENTER);
    textSize(30);
    text('소개팅 받으실래염', width / 2 + 350, height / 2 - 50);
    fill(0);
    textSize(20);
    textAlign(CENTER, BOTTOM);
    if(this.loveConfirmed){
        
      text("스페이스바를 눌러 다음씬으로", width / 2, height - 40);
    }else {
      
    
      text("마우스를 연타해서 호감을 키우세요!", width / 2, height - 40);
    }

    
    // 하트 그리기
    image(this.heart, this.heartLPos.x, this.heartLPos.y, this.heartLWidth, this.heartLHeight);
    image(this.heart, this.heartRPos.x, this.heartRPos.y, this.heartRWidth, this.heartRHeight);

    // 하트 줄어들기 (사랑 고정 아닐 때만)
    if (!this.loveConfirmed) {
      this.heartLWidth *= this.shrinkRate;
      this.heartLHeight *= this.shrinkRate;
      this.heartRWidth *= this.shrinkRate;
      this.heartRHeight *= this.shrinkRate;

      this.heartLWidth = max(this.minWidth, this.heartLWidth);
      this.heartLHeight = max(this.minHeight, this.heartLHeight);
      this.heartRWidth = max(this.minWidth, this.heartRWidth);
      this.heartRHeight = max(this.minHeight, this.heartRHeight);
    }

    const showLove = this.heartLWidth >= this.maxWidth || this.heartRWidth >= this.maxWidth;

    if (showLove) {
      // 사랑 상태 고정
      this.loveConfirmed = true;

      // 말풍선 고정 출력
      image(this.img3, width / 2 - 350, height / 2 - 50, 300, 150);
      textSize(28);
      text('좋아!!', width / 2 - 350, height / 2 - 60);

      // 하트 크기 고정
      this.heartLWidth = this.maxWidth;
      this.heartLHeight = this.maxWidth * 0.8;
      this.heartRWidth = this.maxWidth;
      this.heartRHeight = this.maxWidth * 0.8;

      // 이펙트 지속적으로 발생
      this.triggerHeartExplosion();
    }

    // 파티클 이펙트
    for (let i = this.heartParticles.length - 1; i >= 0; i--) {
      const p = this.heartParticles[i];
      p.update();
      p.draw();
      if (p.isDead()) this.heartParticles.splice(i, 1);
    }
  }

  // 파티클 계속 생성되도록!
  triggerHeartExplosion() {
    const cx = (this.heartLPos.x + this.heartRPos.x) / 2;
    const cy = this.heartLPos.y;
    for (let i = 0; i < 2; i++) { // 1프레임당 2개 정도만 추가
      this.heartParticles.push(new HeartParticle(cx, cy, this.heart));
    }
  }

  biggerHeart() {
    if (!this.loveConfirmed) {
      this.heartLWidth *= this.heartSize;
      this.heartLHeight *= this.heartSize;
      this.heartRWidth *= this.heartSize;
      this.heartRHeight *= this.heartSize;
    }
  }

  mousePressed() {
    this.biggerHeart();
  }

  keyPressed() {
    console.log("Key pressed:", key);
    if (key === ' ' && this.loveConfirmed) {
      this.manager.nextScene(); 
      // 여기에 장면 전환 코드 삽입
      // 예: sceneManager.goTo('nextScene');
    }
  }
}