class Youtube40 {
  constructor() {
    this.bg = null;
    this.silverImg = null;
    this.goldImg = null;
    this.diaImg = null;

    this.isfinished = false;
    this.channelName = "";
    this.submitted = false;
    this.startTime = 0;
    this.duration = 3000;

    this.targetSubs = 1000000;
    this.targetViews = 999999999;
    this.currentSubs = 1;
    this.currentViews = 1;
    this.keyCount = 0;

    this.input = null;
    this.button = null;

    this.canvas = null; // canvas DOM 참조용
  }

  preload() {
    this.bg = loadImage("assets_yj/youtube.png");
    this.silverImg = loadImage("assets_yj/silver.png");
    this.goldImg = loadImage("assets_yj/gold.png");
    this.diaImg = loadImage("assets_yj/dia.png");
  }

  setup() {
    this.canvas = createCanvas(1366, 768);

    if (this.input && this.button) {
      console.log("이미 input/button 있음 - setup 스킵");
      return;
    }

    console.log("input/button 생성!");

    this.input = createInput();
    this.input.size(280);

    this.button = createButton("입력 완료");
    this.button.mousePressed(() => this.saveName());

    this.updateUIPosition(); // ✅ 초기 위치 설정
  }

  updateUIPosition() {
    if (!this.canvas || !this.input || !this.button) return;

    const canvasX = this.canvas.position().x;
    const canvasY = this.canvas.position().y;

    this.input.position(canvasX + 600, canvasY + 200);
    this.button.position(canvasX + 600 + 280 + 10, canvasY + 200);
  }

  draw() {
    imageMode(CORNER);
    image(this.bg, 0, 0, width, height);
    imageMode(CENTER);

    this.updateUIPosition(); // ✅ draw마다 위치 재확인 (캔버스 위치 바뀌는 경우 대응)

    if (!this.submitted) {
      this.input.show();
      this.button.show();

      fill(0);
      textAlign(CENTER);
      textSize(24);
      text("입력완료를 누른 뒤 3초간 키보드를 연타하세요.", width / 2, 100);

      textSize(20);
      textAlign(LEFT);
      text("유튜브 채널명을 입력하세요.", 600, 200);
    } else {
      this.input.hide();
      this.button.hide();

      fill(0);
      textSize(32);
      textAlign(LEFT);
      text("채널명: " + this.channelName, 600, 250);

      const elapsed = millis() - this.startTime;

      if (elapsed < this.duration) {
        const progress = elapsed / this.duration;
        this.currentSubs = int(progress * this.targetSubs);
        this.currentViews = int(progress * this.targetViews);
      } else {
        this.currentSubs = this.targetSubs;
        this.currentViews = this.targetViews;
      }

      text("구독자 수: " + nf(this.currentSubs, 1, 0), 600, 300);
      text("조회수: " + nf(this.currentViews, 1, 0), 600, 350);

      textAlign(CENTER);
      textSize(28);
      text("키보드 연타 횟수: " + this.keyCount, width / 2, 680);

      if (elapsed >= this.duration) {
        this.showResult();
        this.isfinished = true;
      }
    }
  }

  keyPressed(key) {
    if (this.submitted && millis() - this.startTime < this.duration) {
      this.keyCount++;
    }
  }

  cleanup() {
    if (this.input) {
      this.input.remove();
      this.input = null;
    }

    if (this.button) {
      this.button.remove();
      this.button = null;
    }
  }

  saveName() {
    this.channelName = this.input.value();
    if (this.channelName.trim() === "") return;
    this.submitted = true;
    this.startTime = millis();
    this.keyCount = 0;
    this.cleanup();
  }

  showResult() {
    background(200);

    let resultImg;
    let resultText;

    if (this.keyCount <= 10) {
      resultImg = this.silverImg;
      resultText = "실버버튼을 받으셨습니다!";
    } else if (this.keyCount <= 20) {
      resultImg = this.goldImg;
      resultText = "골드버튼을 받으셨습니다!";
    } else {
      resultImg = this.diaImg;
      resultText = "다이아버튼을 받으셨습니다!";
    }

    imageMode(CENTER);
    image(resultImg, width / 2, height / 2, 400, 400);

    fill(1);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(resultText, width / 2, height / 2 - 220);
  }

  mousePressed() {
    if (this.isfinished) {
      this.manager.nextScene();
    }
  }
}
