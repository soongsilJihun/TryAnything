class SceneManager {
  constructor() {
    this.scenes = [];
    this.currentIndex = 0;
    this.currentScene = null;

    // 전환 애니메이션용 변수
    this.isTransitioning = false;
    this.transitionX = 0;
    this.transitionSpeed = 40;
    this._nextScene = null; // ← 함수와 이름 충돌 방지를 위해 변수명 변경
  }

  addScene(scene) {
    this.scenes.push(scene);
    scene.manager = this;
  }

  setScene(index) {
    this.currentIndex = index;
    this.currentScene = this.scenes[index];
    if (this.currentScene.setup) {
      this.currentScene.setup();
    }
  }

  nextScene() {
    if (this.isTransitioning || this.currentIndex >= this.scenes.length - 1) return;
    this.isTransitioning = true;
    this.transitionX = 0;
    this._nextScene = this.scenes[this.currentIndex + 1];
    if (this._nextScene.setup) {
      this._nextScene.setup();
    }
  }

  update() {
    if (this.isTransitioning) {
      this.transitionX += this.transitionSpeed;
      if (this.transitionX >= width) {
        this.isTransitioning = false;
        this.setScene(this.currentIndex + 1);
        this.transitionX = 0;
        this._nextScene = null;
      }
    } else if (this.currentScene && this.currentScene.update) {
      this.currentScene.update();
    }
  }

  draw() {
    if (this.isTransitioning) {
      push();
      translate(-this.transitionX, 0);
      if (this.currentScene && this.currentScene.draw) {
        this.currentScene.draw();
      }
      pop();

      push();
      translate(width - this.transitionX, 0);
      if (this._nextScene && this._nextScene.draw) {
        this._nextScene.draw();
      }
      pop();
    } else if (this.currentScene && this.currentScene.draw) {
      this.currentScene.draw();
    }
  }

  mousePressed() {
    if (this.currentScene && this.currentScene.mousePressed) {
      this.currentScene.mousePressed();
    }
  }

  keyPressed() {
    if (this.currentScene && this.currentScene.keyPressed) {
      this.currentScene.keyPressed();
    }
  }
}
