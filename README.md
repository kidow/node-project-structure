# New Node Project Structure

앞으로의 Node 프로젝트 구조는 이렇게 짤 예정입니다.

- src : 프로젝트의 최상위 폴더
  - bin : express-generator를 통해 생성하였기에 자동적으로 생성된 폴더
  - caches : 로그인 후 유저에 대한 정보를 얻기 위해 매번 DB에 유저 정보를 요청하는 것은 자원 낭비임. 따라서 Redis를 통해 cache를 도입함.
  - configs : 사용할 라이브러리들의 환경설정
  - controller : endpoint에서 꺼내올 함수
  - middlewares : 커스텀 미들웨어 모음
  - migrations : DB 커스텀 세팅
  - models : DB 환경설정
  - repositories : DB 커스텀 메소드
  - routes : http 요청이 타고 올 url
  - seeders : 테스트할 더미 데이터 세팅
  - tests : Jest를 틍한 TDD 폴더
  - utils : 사용할 라이브러리들

폴더가 너무 많은 것 같은 느낌이 있으나... 계속해서 수정해 나갈 생각입니다.
