<h1>PlayLab</h1>

> 영화나 음악, 책을 접하고 느낀 내 감정을 다른 사람과 공유할 수 있는 웹 서비스입니다. <br/>
> 2019년 2학년 2학기 데이터베이스설계 수업의 팀 프로젝트 아이디어를 실제로 구현했습니다.
<img src="https://user-images.githubusercontent.com/60354103/75991254-8fe2c700-5f39-11ea-9013-bd4058d8df54.png" alt="preview1">
<img src="https://user-images.githubusercontent.com/60354103/75991281-9cffb600-5f39-11ea-9161-56b3e801c0fc.png" alt="preview2">

<h2> 기능 </h2>

* 검색하기 : 다른 사람이 등록한 음악, 영화, 책을 검색할 수 있습니다.
* 인기차트 : 어떤 작품이 인기 있는지 확인하고 버튼을 눌러 추천할 수 있습니다.
* 작품추가 : 감상한 작품을 추가할 수 있습니다. (로그인 필요)
  * 음악 : 직접 입력하여 추가할 수 있습니다.
  * 영화 : 네이버 영화에서 검색하여 손쉽게 추가할 수 있습니다.
  * 책 : 네이버 책에서 검색하여 손쉽게 추가할 수 있습니다.
* 마이페이지 : 내가 등록한 작품을 볼 수 있고 삭제할 수 있습니다. (로그인 필요)

<h2> 개발 </h2>

* Front-end : React.js(SPA), Material-UI framework, React-router-dom
* Back-end : Node.js(Express), RestAPI
* DB : MySQL(AWS RDS)
* Infra : AWS EC2, nginx, Git

<h2> 상태 </h2>

* 기능 테스트 완료(정상 작동)
* 리팩토링 작업 중
* 추후 작품에 대한 리뷰나 리뷰에 대한 댓글 기능을 추가할 계획