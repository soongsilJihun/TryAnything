class LastScene {
  constructor() {}

  setup() {
    createCanvas(1366, 768);
    background(225);
  }

  draw() {
    fill(0);
    background(225);
    textAlign(CENTER, CENTER);
    textSize(30);
    textStyle(BOLD);
    text('느낀 점', width / 2, height / 2 - 300);

    textStyle(NORMAL);
    textSize(28);
    text('최지훈:  JS에서 let 하나로 모든 자료형을 선언하는 게 아직은 좀 어색하더라구요. \n익숙해질 때까지는 좀 더 연습이 필요할 것 같아요 ㅠㅠ', width / 2, height / 2 - 200);
    text('이윤재: 첫 팀플을 p5.js를 활용해서 하게 되어 흥미로웠습니다.', width / 2, height / 2 - 100);
    text('박채연: p5.js를 활용하여 다양한 화면을 구성할 수 있다는 점이 신기했습니다.', width / 2, height / 2);
    text('(현재)AI 사용 비율 : 30% ', width / 2, height / 2 +100);
    text('화면 전환등에 필요한 class구조, \n협업에 유용하도록 js파일을 여러개로 나눠서 관리하는 코드의 형식 작성하는데 AI도움을 많이 받았습니다.\n앞으로 여러 인터렉션등을 추가로 넣으면서 사용비율은 올라갈것 같습니다.', width / 2, height / 2+200);
    
  }

  mousePressed() {

    this.manager.nextScene();
  }
}
