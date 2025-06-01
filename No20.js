class No20 {
  constructor() {
    this.WithTable = null;
    this.water = null;
    this.Teacher = null;
    this.sayBalloon = null;

    this.waterx = 0;
    this.watery = 0;
    this.chx = 0;
    this.chy = 0;
    this.thx = 0;
    this.thy = 0;

    this.dialogues = [
      { text: "질문 있는 사람?", x: 0, y: 0, align: CENTER, speed: 2, speaker: "prof" },
      { text: "(얘네 표정이 꼬롬한데..)", x: 0, y: 0, align: CENTER, speed: 2, speaker: "prof" },
      { text: "질문 없으면 수업 마치겠습니다!!", x: 0, y: 0, align: CENTER, speed: 2, speaker: "prof" },
      { text: "(아 잘 모르겠는데.. 아...)", x: 0, y: 0, align: CENTER, speed: 2, speaker: "student" }
    ];

    this.currentIndex = 0;
    this.charIndex = 0;
    this.typedText = "";
    this.typeTimer = 0;
    this.isTyping = false;
    this.finished = false;
  }

  preload() {
    this.WithTable = loadImage("assets/20sWithTable.png");
    this.water = loadImage("assets/water.png");
    this.Teacher = loadImage("assets/teacherAndChilpan.png");
    this.sayBalloon = loadImage("assets/sayBalloon.png");
  }

  setup() {
    this.chx = width / 2 + 400;
    this.chy = height / 2;
    this.thx = width / 2 - 400;
    this.thy = height / 2;
    this.waterx = this.chx - 60;
    this.watery = this.chy - 80;

    this.dialogues[0].x = this.thx + 100; this.dialogues[0].y = this.thy - 150;
    this.dialogues[1].x = this.thx + 100; this.dialogues[1].y = this.thy - 150;
    this.dialogues[2].x = this.thx + 100; this.dialogues[2].y = this.thy - 150;
    this.dialogues[3].x = this.chx + 80;  this.dialogues[3].y = this.chy - 250;

    this.startTyping();
  }

  update() {
    this.watery += 2;
    if (this.watery > this.chy - 50) this.watery = this.chy - 80;
    this.updateDialogue();
  }

  draw() {
    if (this.currentIndex === this.dialogues.length - 1) {
      this.finished = true;
    }
    background(255);
    rectMode(CENTER);
    imageMode(CENTER);

    if (this.WithTable) image(this.WithTable, this.chx, this.chy, 400, 400);
    if (this.Teacher) image(this.Teacher, this.thx, this.thy, 500, 400);
    if (this.water) image(this.water, this.waterx, this.watery, 8, 20);
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
    if (this.currentIndex >= this.dialogues.length || !this.sayBalloon) return;
    const dlg = this.dialogues[this.currentIndex];
    const bx = dlg.speaker === "prof" ? this.thx + 100 : this.chx + 80;
    const by = dlg.speaker === "prof" ? this.thy - 150 : this.chy - 250;
    image(this.sayBalloon, bx, by, 300, 200);
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

  drawDialogue() {
    if (this.currentIndex >= this.dialogues.length) return;
    const dlg = this.dialogues[this.currentIndex];
    fill(0);
    textSize(20);
    textAlign(dlg.align, CENTER);
    text(this.typedText, dlg.x, dlg.y);
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
    }
  }

  keyPressed() {
    if (this.finished && key === ' ') {
      console.debug("push space");
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
