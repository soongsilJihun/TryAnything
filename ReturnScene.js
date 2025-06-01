class ReturnScene {
  setup() { createCanvas(1366, 768); }
  update() {}
  draw() {
    background(240);
    textAlign(CENTER, CENTER);
    textSize(36);
    fill(0);
    text('회귀 씬입니다', width / 2, height / 2);
  }
  mousePressed() {
    this.manager.nextScene();
  }
}