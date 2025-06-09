class No30 {
  constructor() {
    this.bgimg = null;
    this.companyman = null;
    this.friend = null;
    this.balloonLeft = null;
    this.balloonRight = null;

    this.dialogues = [
      { text: "소개팅 받으실래염", x: 0, y: 0, align: CENTER, speed: 2, speaker: "right" },
      { text: "아.. 조금만 생각해 볼게요..", x: 0, y: 0, align: CENTER, speed: 2, speaker: "left" }
    ];

    this.currentIndex = 0;
    this.charIndex = 0;
    this.typedText = "";
    this.typeTimer = 0;
    this.isTyping = false;
    this.finished = false;
  }

  preload() {
    this.friend = loadImage('assetsCY/회사동료.png');
    this.companyman = loadImage('assetsCY/30대회사원.png');
    this.bgimg = loadImage('assetsCY/30대배경.png');
    this.balloonLeft = loadImage('assetsCY/말풍선.png');
    this.balloonRight = loadImage('assetsCY/말풍선오.png');
  }

  setup() {
    createCanvas(1366, 768);

    this.dialogues[0].x = width / 2 + 350;
    this.dialogues[0].y = height / 2 - 50;
    this.dialogues[1].x = width / 2 - 350;
    this.dialogues[1].y = height / 2 - 60;

    this.startTyping();
  }

  update() {
    this.updateDialogue();
  }

  draw() {
    background(255);
    imageMode(CORNER);
    image(this.bgimg, 0, 0, width, height);

    imageMode(CENTER);
    image(this.friend, width / 2 + 150, height / 2 + 200, 300, 400);
    image(this.companyman, width / 2 - 180, height / 2 + 200, 280, 400);

    this.drawBalloon();
    this.drawDialogue();

    fill(0);
    textSize(20);
    textAlign(CENTER, BOTTOM);
    if (this.finished) {
      text("스페이스바를 눌러 다음 씬으로", width / 2, height - 40);
    } else {
      text("말풍선을 클릭해보세요", width / 2, height - 40);
    }
  }

  drawBalloon() {
    if (this.currentIndex >= this.dialogues.length) return;
    const dlg = this.dialogues[this.currentIndex];
    if (dlg.speaker === "left") {
      image(this.balloonRight, dlg.x, dlg.y, 300, 150);
    } else {
      image(this.balloonLeft, dlg.x, dlg.y, 300, 150);
    }
  }

  drawDialogue() {
    if (this.currentIndex >= this.dialogues.length) return;
    const dlg = this.dialogues[this.currentIndex];
    fill(0);
    textSize(24);
    textAlign(dlg.align, CENTER);
    text(this.typedText, dlg.x, dlg.y);
  }

  updateDialogue() {
    if (!this.isTyping || this.currentIndex >= this.dialogues.length) return;
    const dlg = this.dialogues[this.currentIndex];
    if (this.charIndex < dlg.text.length) {
      this.typeTimer++;
      if (this.typeTimer >= dlg.speed) {
        this.typedText += dlg.text[this.charIndex];
        this.charIndex++;
        this.typeTimer = 0;
      }
    }
  }

  mousePressed() {
    if (this.finished) return;

    const dlg = this.dialogues[this.currentIndex];
    if (this.charIndex < dlg.text.length) {
      this.typedText = dlg.text;
      this.charIndex = dlg.text.length;
      this.isTyping = false;
    } else if (this.currentIndex < this.dialogues.length - 1) {
      this.currentIndex++;
      this.startTyping();
    } else {
      this.finished = true; // ✅ 마지막 대사 클릭 후 finished 설정
    }
  }

  keyPressed() {
    if (this.finished && key === ' ') {
      this.manager.nextScene();
    }
  }

  startTyping() {
    const dlg = this.dialogues[this.currentIndex];
    this.typedText = "";
    this.charIndex = 0;
    this.typeTimer = 0;
    this.isTyping = true;
  }
}
