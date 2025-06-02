class HandCheckScene {
  constructor() {
    this.video = null;
    this.handpose = null;
    this.predictions = [];
    this.ready = false;

    this.startHoldTime = null;
    this.holdDuration = 0;
    this.transitioned = false;

    this.onPredict = null;
    this.predicting = false;
  }

  async setup() {
    createCanvas(640, 480);
    imageMode(CENTER);

    this.video = createCapture(VIDEO);
    this.video.size(320, 240);
    this.video.hide();

    await this.waitForVideoReady(this.video.elt);

    this.handpose = ml5.handpose(this.video, () => {
      console.log("🧠 Handpose ready");
      this.ready = true;
    });

    this.predicting = true;
    this.onPredict = results => {
      if (!this.predicting) return;
      this.predictions = results;
    };
    this.handpose.on("predict", this.onPredict);
  }

  async waitForVideoReady(videoElement) {
    return new Promise(resolve => {
      const checkReady = () => {
        if (videoElement.readyState >= 2) {
          resolve();
        } else {
          requestAnimationFrame(checkReady);
        }
      };
      checkReady();
    });
  }

  draw() {
    background(255);

    if (!this.video || !this.video.elt || !this.video.elt.videoWidth) {
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(20);
      text("비디오 로딩 중...", width / 2, height / 2);
      return;
    }

    image(this.video, width / 2, height / 2, width, height);
    this.drawHandKeypoints();

    if (this.isHandRaised()) {
      if (this.startHoldTime === null) {
        this.startHoldTime = millis();
      } else {
        this.holdDuration = millis() - this.startHoldTime;
      }
    } else {
      this.startHoldTime = null;
      this.holdDuration = 0;
    }

    if (this.holdDuration >= 3000 && !this.transitioned) {
      this.transitioned = true;
      this.cleanup();
      setTimeout(() => this.manager.nextScene(), 500);
    }

    this.drawProgressBar();
  }

  isHandRaised() {
    if (this.predictions.length > 0) {
      const hand = this.predictions[0];
      const wrist = hand.landmarks[0];
      const middleTip = hand.landmarks[12];
      return middleTip[1] < wrist[1];
    }
    return false;
  }

  drawHandKeypoints() {
    const srcW = this.video.elt.videoWidth;
    const srcH = this.video.elt.videoHeight;
    if (!srcW || !srcH) return;

    const scaleX = width / srcW;
    const scaleY = height / srcH;

    for (let hand of this.predictions) {
      const indices = [8, 12, 16, 20]; // indexTip, middleTip, ringTip, pinkyTip
      for (let i of indices) {
        const [x, y] = hand.landmarks[i];
        fill(0, 255, 0);
        noStroke();
        ellipse(x * scaleX, y * scaleY, 12, 12);
      }
    }
  }

  drawProgressBar() {
    const totalTime = 3000;
    const progress = constrain(this.holdDuration / totalTime, 0, 1);

    const barW = 400;
    const barH = 30;
    const barX = width / 2 - barW / 2;
    const barY = height - barH - 40;

    // 배경 박스
    fill(255, 255, 255, 230);
    noStroke();
    rectMode(CORNER);
    rect(barX, barY - 20, barW, barH + 40, 15);

    // 게이지 배경
    fill(220);
    rect(barX, barY, barW, barH, 10);

    // 진행률 컬러: 초록(0,200,100) → 밝은연두(150,255,180)
    const r = lerp(0, 150, progress);
    const g = lerp(200, 255, progress);
    const b = lerp(100, 180, progress);
    fill(r, g, b);
    rect(barX, barY, barW * progress, barH, 10);

    // 텍스트 (% 증가)
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(18);
    const percent = floor(progress * 100);
    text(
      progress < 1 ? `인식 중... ${percent}%` : "✅ 인식 완료!",
      width / 2,
      barY + barH / 2
    );
  }

  cleanup() {
    this.predicting = false;

    if (this.handpose && this.onPredict) {
      this.handpose.on("predict", () => {});
      this.onPredict = null;
    }

    if (this.video && this.video.elt && this.video.elt.srcObject) {
      const tracks = this.video.elt.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      this.video.elt.srcObject = null;
    }

    if (this.video) {
      this.video.remove();
      this.video = null;
    }

    this.handpose = null;
    this.predictions = [];

    console.log("🧼 cleanup 완료 - 웹캠 꺼짐");
  }
}
