class SceneManager {
  constructor() {
    this.scenes = [];
    this.currentIndex = 0;
    this.currentScene = null;
  }

  addScene(scene) {
    this.scenes.push(scene);
    scene.manager = this; // 씬에서 this.manager로 접근 가능
  }

  setScene(index) {
    this.currentIndex = index;
    this.currentScene = this.scenes[index];
    this.currentScene.setup();
  }

  nextScene() {
    if (this.currentIndex + 1 < this.scenes.length) {
      this.setScene(this.currentIndex + 1);
    }
  }

  update() {
    if (this.currentScene && this.currentScene.update) {
      this.currentScene.update();
    }
  }

  draw() {
    if (this.currentScene && this.currentScene.draw) {
      this.currentScene.draw();
    }
  }

  mousePressed() {
    if (this.currentScene && this.currentScene.mousePressed) {
      this.currentScene.mousePressed();
    }
  }
}
