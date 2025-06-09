class StartScene {
  constructor() {
    // 전체화면 버튼
    this.fullBtnW = 260;
    this.fullBtnH = 50;
    this.fullBtnX = (1366 - this.fullBtnW) / 2;
    this.fullBtnY = 520;

    // 시작 버튼
    this.startBtnW = 200;
    this.startBtnH = 50;
    this.startBtnX = (1366 - this.startBtnW) / 2;
    this.startBtnY = this.fullBtnY + 70;

    this.isFullscreen = false;
  }

  setup() {
    createCanvas(1366, 768);
  }

  draw() {
    background(225);
    fill(0);
    // 제목
    textAlign(CENTER, CENTER);
    textSize(70);
    textStyle(BOLD);
    text('TRY\nANYTHING', width / 2, height / 2 - 150);

    // 팀원 이름
    textStyle(NORMAL);
    textSize(28); 
    text('박채연, 이윤재, 최지훈', width / 2, height / 2 + 10);

    // 전체화면 버튼
    fill(40);
    stroke(80);
    strokeWeight(1);
    rect(this.fullBtnX, this.fullBtnY, this.fullBtnW, this.fullBtnH, 10);
    noStroke();
    fill(255);
    textSize(20);
    const fullText = this.isFullscreen ? "전체화면 해제" : "전체화면으로 전환";
    text(fullText, this.fullBtnX + this.fullBtnW / 2, this.fullBtnY + this.fullBtnH / 2);

    // 시작 버튼
    fill(20);
    stroke(60);
    rect(this.startBtnX, this.startBtnY, this.startBtnW, this.startBtnH, 10);
    noStroke();
    fill(255);
    textSize(20);
    text("Click to Start", this.startBtnX + this.startBtnW / 2, this.startBtnY + this.startBtnH / 2);
  }

  mousePressed() {
    // 전체화면 버튼 클릭
    if (mouseX > this.fullBtnX && mouseX < this.fullBtnX + this.fullBtnW &&
        mouseY > this.fullBtnY && mouseY < this.fullBtnY + this.fullBtnH) {
      this.isFullscreen = !this.isFullscreen;
      fullscreen(this.isFullscreen);
    }

    // 시작 버튼 클릭
    if (mouseX > this.startBtnX && mouseX < this.startBtnX + this.startBtnW &&
        mouseY > this.startBtnY && mouseY < this.startBtnY + this.startBtnH) {
      this.manager.nextScene();
    }
  }

  cleanup() {}
}
