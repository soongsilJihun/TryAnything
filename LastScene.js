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
    text('최지훈: ml5.js 라이브러리의 예상보다 훨씬 높은 성능에 놀랐습니다.또한 씬을 클래스로 나누어 관리해보면서, \n클래스가 왜 필요한지 더 잘 체감할 수 있었고, 클래스 구조에 대한 감각도 많이 늘어난 것 같습니다.', width / 2, height / 2 - 200);
    text('이윤재: 팀이번 과제를 통해서 팀프로젝트를 처음 하게 되었는데 팀원들과 소통의 중요성을 느꼈다. \n또한 지금까지 배웠던 인터렉션을 실제로 적용하여 스토리를 진행시킨 점이 인상깊었다.  ', width / 2, height / 2 - 100);
    text('박채연: p5.js를 활용해 다양한 화면을 구성할 수 있다는 점이 신기했습니다. \n초기에 디버깅에 어려움을 겪었지만 팀원들과 함께 해결하며 작품을 완성할 수 있었습니다.', width / 2, height / 2);
    text('AI를 사용한 컨텐츠 : 손인식 콘텐츠, 시계 돌아가는 각도의 수식, 씬을 관리하는 매니저코드드, 대화형식의 말풍선선', width / 2, height / 2 +100);
    text('AI 사용 비율 : 40% ', width / 2, height / 2 +150);
    text('AI를 사용하여 장면전환등을 관리하는 SceneManager.js를 만들었고 클래스 구조화를 AI가 많이 도와줬습니다.\n 또한 손인식 씬에서 잘 몰랐던 람다식에 관련해서도 AI에게 많이 질문하며 제작하였습니다.', width / 2, height / 2+230);
    



  }

  mousePressed() {

    this.manager.nextScene();
  }
}
