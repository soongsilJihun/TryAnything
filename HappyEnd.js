class HappyEnd {
  setup() { createCanvas(1366, 768); }
  update() {}
  draw() {
    background(240);
    textAlign(CENTER, CENTER);
    textSize(36);
    fill(0);
    text('해피임종 씬입니다', width / 2, height / 2);
  }
  mousePressed() {
    this.manager.nextScene();
  }
}