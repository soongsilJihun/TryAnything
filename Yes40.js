class Yes40 {
  constructor() {
    this.bgImg = null;
    this.oldman = null;
    this.oldcoman = null;
    this.balloonLeft = null;
    this.balloonRight = null;
    this.centerImg = null;

    this.dialogues = [
      { text: "유튜버 도전 해볼래?", x: 0, y: 0, align: CENTER, speed: 2, speaker: "right" },
      { text: "도전한다!", x: 0, y: 0, align: CENTER, speed: 2, speaker: "left" }
    ];

    this.currentIndex = 0;
    this.charIndex = 0;
    this.typedText = "";
    this.typeTimer = 0;
    this.isTyping = false;
    this.finished = false;
  }

  preload() {
    this.bgImg = loadImage("assets_yj/bg.png");
    this.oldman = loadImage("assets_yj/oldman.png");
    this.oldcoman = loadImage("assets_yj/oldcoman.png");
    this.balloonLeft = loadImage("assets_yj/text2.png");  // 말풍선 왼쪽
    this.balloonRight = loadImage("assets_yj/text.png");  // 말풍선 오른쪽
    this.centerImg = loadImage("assets_yj/comeYoutube.png");
  }

  setup() {
    createCanvas(1366, 768);

    this.dialogues[0].x = 1020;
    this.dialogues[0].y = 400;
    this.dialogues[1].x = 160;
    this.dialogues[1].y = 450;

    this.startTyping();
  }

  update() {
    this.updateDialogue();
  }

  draw() {
    background(255);
    imageMode(CORNER);
    image(this.bgImg, 0, 0, width, height);

    imageMode(CENTER);
    image(this.oldman, 300 + 145, 440 + 195, 290, 390);     // 왼쪽 인물
    image(this.oldcoman, 700 + 145, 440 + 195, 290, 390);   // 오른쪽 인물
    image(this.centerImg, 500 + 125, 50 + 175, 250, 350);   // 가운데 배너

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
      image(this.balloonLeft, dlg.x - 0, dlg.y - 80, 300, 200);
    } else {
      image(this.balloonRight, dlg.x + 20, dlg.y - 70, 400, 200);
    }
  }

  drawDialogue() {
    if (this.currentIndex >= this.dialogues.length) return;
    const dlg = this.dialogues[this.currentIndex];
    fill(0);
    textSize(24);
    textAlign(dlg.align, CENTER);
    text(this.typedText, dlg.x, dlg.y - 80);
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
      this.finished = true;  // 마지막 대사 클릭 후 finished 설정
    }
  }

  keyPressed() {
    if (this.finished && key === ' ') {
      this.manager.nextScene(); // 다음 씬으로 이동
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
