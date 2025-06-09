class No40 {
  constructor() {
    this.bgImg = null;
    this.silver = null;
    this.gold = null;
    this.dia = null;
    this.oldman = null;
    this.oldcoman = null;
    this.balloonLeft = null;
    this.balloonRight = null;

    this.dialogues = [
      { text: "유튜버 도전 해볼래?", x: 1020, y: 400, align: LEFT, speed: 2, speaker: "right" },
      { text: "무서워 안 할래..", x: 160, y: 450, align: LEFT, speed: 2, speaker: "left" }
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
    this.silver = loadImage("assets_yj/silver.png");
    this.gold = loadImage("assets_yj/gold.png");
    this.dia = loadImage("assets_yj/dia.png");
    this.oldman = loadImage("assets_yj/oldman.png");
    this.oldcoman = loadImage("assets_yj/oldcoman.png");
    this.balloonLeft = loadImage("assets_yj/text2.png");   // 왼쪽 말풍선
    this.balloonRight = loadImage("assets_yj/text.png");   // 오른쪽 말풍선
  }

  setup() {
    createCanvas(1366, 768);
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
    image(this.oldman, 300 + 145, 440 + 195, 290, 390);
    image(this.oldcoman, 700 + 145, 440 + 195, 290, 390);

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
    imageMode(CENTER);
    if (this.currentIndex >= this.dialogues.length) return;

    const dlg = this.dialogues[this.currentIndex];
    const balloonY = dlg.y - 80;

    if (dlg.speaker === "left") {
      image(this.balloonLeft, dlg.x + 50, balloonY, 350, 200);
    } else {
      image(this.balloonRight, dlg.x + 50, balloonY, 400, 200);
    }
  }

  drawDialogue() {
    if (this.currentIndex >= this.dialogues.length) return;
    const dlg = this.dialogues[this.currentIndex];

    fill(0);
    textSize(20);
    textAlign(dlg.align, CENTER);
    text(this.typedText, dlg.x , dlg.y - 80);
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
    } else if (this.currentIndex === this.dialogues.length - 1) {
      this.finished = true;
    }
  }

  mousePressed() {
    if (this.finished) return;

    const dlg = this.dialogues[this.currentIndex];
    if (this.charIndex < dlg.text.length) {
      this.typedText = dlg.text;
      this.charIndex = dlg.text.length;
      this.isTyping = false;

      if (this.currentIndex === this.dialogues.length - 1) {
        this.finished = true;
      }
    } else if (this.currentIndex < this.dialogues.length - 1) {
      this.currentIndex++;
      this.startTyping();
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
