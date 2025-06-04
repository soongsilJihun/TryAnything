class Yes20AfterHand {
  constructor() {
    this.Teacher = null;
    this.bgimg = null;
    this.sayBalloon = null;

    this.thx = 0;
    this.thy = 0;

    this.dialogue = {
      text: "좋은 질문이네요!!",
      x: 0,
      y: 0,
      align: CENTER,
      speed: 2
    };

    this.charIndex = 0;
    this.typedText = "";
    this.typeTimer = 0;
    this.isTyping = false;
    this.finished = false;
  }

  preload() {
    this.Teacher = loadImage("assets/teacherAndChilpan.png");
    this.sayBalloon = loadImage("assets/sayBalloon.png");
  }

  setup() {
    createCanvas(1366, 768); // 원하는 해상도 유지
    this.cleanupVideoIfAlive();

    this.thx = width / 2;
    this.thy = height / 2 + 200; // 캐릭터를 아래로 내림

    this.dialogue.x = this.thx + 200; // 말풍선 오른쪽 상단
    this.dialogue.y = this.thy - 300;

    this.startTyping();
  }

  update() {
    this.updateDialogue();
  }

  draw() {
    background(255);
    imageMode(CORNER);

    imageMode(CENTER);
    if (this.Teacher) image(this.Teacher, this.thx, this.thy-200, 650, 550); // 🔍 더 크게
    if (this.sayBalloon) image(this.sayBalloon, this.dialogue.x, this.dialogue.y-100, 400, 250); // 더 크게

    this.drawDialogue();

    fill(0);
    textSize(20);
    textAlign(CENTER, BOTTOM);
    if (this.finished) {
      text("마우스 클릭으로 다음 씬으로 ", width / 2, height - 40);
    }
  }

  drawDialogue() {
    fill(0);
    textSize(24);
    textAlign(this.dialogue.align, CENTER);
    text(this.typedText, this.dialogue.x, this.dialogue.y-140);
  }

  updateDialogue() {
    if (!this.isTyping) return;
    if (this.charIndex < this.dialogue.text.length) {
      this.typeTimer++;
      if (this.typeTimer >= this.dialogue.speed) {
        this.typedText += this.dialogue.text[this.charIndex];
        this.charIndex++;
        this.typeTimer = 0;
      }
    } else {
      this.finished = true;
      this.isTyping = false;
    }
  }

  startTyping() {
    this.typedText = "";
    this.charIndex = 0;
    this.typeTimer = 0;
    this.isTyping = true;
  }

  keyPressed() {
    if (this.finished && key === ' ') {
      console.debug("space → nextScene");
      this.manager.nextScene();
    }
  }
  mousePressed(){
    this.manager.nextScene(); // 클릭 시 다음 씬으로 이동
  }

  cleanupVideoIfAlive() {
    const videos = document.querySelectorAll("video");
    videos.forEach(video => {
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
      }
      video.remove();
    });
  }
}
