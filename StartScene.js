class StartScene {
  constructor() {}

  setup() {
    createCanvas(1366, 768);
    background(225);
  }

  draw() {
    background(225);
    textAlign(CENTER, CENTER);
    textSize(70);
    textStyle(BOLD);
    text('TRY\nANYTHING', width / 2, height / 2 - 150);
    textStyle(NORMAL);
    textSize(28); 
    text('박채연, 이윤재, 최지훈', width / 2, height / 2 + 20);
    text('Click to Start', width / 2, height / 2 + 100);
  }

  mousePressed() {
    this.manager.nextScene(); // SceneManager 연결 필요
  }
}