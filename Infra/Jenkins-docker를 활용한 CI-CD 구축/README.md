# CI/CD
- Continuous Integration(지속적인 통합), Continuous Delivery(지속적인 서비스제공), 또는 Continuous Deployment(지속적인 배포)의 약자로, 애플리케이션 개발 단계를 자동화하여 애플리케이션 개발을 보다 짧은 주기로 고객에게 제공하는 방법
- 새로운 코드 통합으로 인해 개발 및 운영팀에서 발생하는 문제(일명 통합지옥(Integration hell))를 해결하는 솔루션
- CI/CD는 애플리케이션 통합, 테스트, 제공, 배포에 이르는 라이프사이클 전체에 걸쳐서 지속적인 자동화와 모니터링을 제공하며, 이러한 구축사례를 CI/CD 파이프라인이라고 부름

# Docker
- 컨테이너 기반의 오픈소스 가상화 플랫폼
- 프로그램, 실행환경을 컨테이너로 추상화하고 동일한 인터페이스를 제공하여 프로그램의 배포 및 관리를 단순하게 해줌
- 백엔드 프로그램, 데이터베이스 서버, 메시지 큐등 어떤 프로그램도 컨테이너로 추상화할 수 있고 조립PC, AWS, Azure, Google cloud등 어디에서든 실행할 수 있음

# Jenkins
- 소프트웨어 개발 시 지속적으로 통합 서비스를 제공하는 툴
- CI툴 이라고 표현함
- 다수의 개발자들이 하나의 프로그램을 개발할 때 버전 충동을 방지하기 위해 각자 작업한 내용을 공유영역에 있는 저장소에 업드로함으로써 지속적 통합이 가능

# Ngins
- 경량 웹 서버
- 클라이언트로부터 요청을 받았을 때 요청에 맞는 정적 파일을 응답해주는 HTTP Web Server로 활용되기도 하고, Reverse Proxy Server로 활용하여 WAS 서버의 부하를 줄일 수 있는 로드 밸런서로 활용하기도 함

# 수행 과정
- ### Docker 설치
아래 URL을 참고하여 Docker를 설치 합니다  
https://www.lainyzine.com/ko/article/a-complete-guide-to-how-to-install-docker-desktop-on-windows-10/  

설치 확인:  
command 창에서 아래와 같은 결과가 나오면 성공  
![image](https://user-images.githubusercontent.com/83584721/175485329-a95725c7-65e9-4710-8e43-3c80631c2864.png)

- ### Docker로 Jenkins를 설치하고 설정
명령어는 다음과 같습니다  
![image](https://user-images.githubusercontent.com/83584721/175485760-27395254-6dc1-4ca9-b2fc-45e96e80afe5.png)  

설치가 완료 되면 브라우저를 실행해 확인해 봅니다  
http://localhost:9090/ 으로 접속

그러면 아래와 같이 admin 비밀먼호를 입력하라는 화면이 나옵니다  
![image](https://user-images.githubusercontent.com/83584721/175486152-ceafdc89-e02c-4575-a5bd-74e7be9ae08f.png)  

비밀번호는 Jenkins를 설치 할 때 생기는 로그에 있습니다. 아래와 같이 명령어를 치면  
![image](https://user-images.githubusercontent.com/83584721/175486370-ffa8ef40-8478-4bdc-9405-4b09b78a0a1d.png)

중간쯤에  
![image](https://user-images.githubusercontent.com/83584721/175486534-551258c1-0c55-4c53-b80b-3f94fb1abcf4.png)  
표시된 문자가 비밀번호이고 복사해서 입력해줍니다

기본으로 설치 하라는 플러그인을 설치하고, 기본 설정할 어드민 유저 정보를 입력해주면 Docker로 Jenkins 설치는 끝난겁니다.

설치 확인:  
![image](https://user-images.githubusercontent.com/83584721/175486909-bf520792-098f-40ea-8106-914c451d3986.png)

- ### Jenkins 플러그인 설치
메뉴에서 DashBoard > Manager Jenkins > Plugin Manager 에 들어가 플러그인 설치를 합니다  
주소는 http://localhost:9090/pluginManager/ 입니다

![image](https://user-images.githubusercontent.com/83584721/175487749-c378e8f6-d8f2-4e38-92bd-ebf24fd68944.png)  
여기에서 설치 가능(Available) 탭에서 다음의 플러그인을 검색해 설치해 줍니다  
- 플러그인 목록
  - GitLab
  - Generic Webhook Trigger
  - Gitlab API
  - GitLab Authentication
  - Docker
  - Docker Commons
  - Docker Pipeline
  - Docker API

- ### Jenkins 컨테이너안 도커 설치  
컨테이너 형태로 설치된 Jenkins 안에서 docker 명령어 실행을 위해 docker를 설치 해줍니다  
설치를 위해 먼저 컨테이너 안으로 접근합니다  
![image](https://user-images.githubusercontent.com/83584721/175489029-f4efcc13-b42b-49f9-8b00-1f05adf9617c.png)  

Jenkins로 들어오게 되며 여기에서 아래 명령어를 입력해 다시 도커를 설치해 줍니다.
```
curl https://get.docker.com/ > dockerinstall && chmod 777 dockerinstall && ./dockerinstall
```

설치 확인:  
![image](https://user-images.githubusercontent.com/83584721/175489343-0109f2bb-2d75-4496-b6b1-a2ab421a24b9.png)

- ### 도커라이징 및 배포 설정  
아래 주소의 레포지토리를 도커라이징 하여 배포해 보도록 하겠습니다  
https://lab.ssafy.com/fedora.ssafy/test_deploy

Jenkins 왼쪽 메뉴 New Item을 선택합니다  
![image](https://user-images.githubusercontent.com/83584721/175492956-271b5bd7-23ed-48c0-bdca-b89730747258.png)

그 다음 적당한 이름으로 프로젝트명을 적어주고 타입으로는 프리스타일을 선택  
![image](https://user-images.githubusercontent.com/83584721/175493086-ac9765be-677a-4c78-a07b-ce24c788365d.png)

생성된 후 중간 쯤 소스코드 관리에서 git을 선택  
![image](https://user-images.githubusercontent.com/83584721/175493267-f38e1ae8-5ede-45ce-be33-b520ef2a20ac.png)

Repository URL에 배포될 대상 레포지토리 git 주소를 입력하고, Credentials에서 add를 눌러줍니다  
![image](https://user-images.githubusercontent.com/83584721/175493475-d4410613-86d2-4ab7-a54f-9dc25ba307fc.png)  
Username에 Gitlab에 로그인 하는 아이디를 적어주고 Password 에 비밀번호를 입력합니다  
ID에는 Jenkins 내에서 사용할 인증 식별 ID를 적당하게 입력합니다

그 다음 아래 섹션에서 빌드를 체크 하여 git 레포지토리에 새로운 푸쉬가 들어오면 자동으로 빌드가 되게끔 하고 필요한 옵션이 있으면 체크합니다  
![image](https://user-images.githubusercontent.com/83584721/175493875-931ad9e8-1bee-4125-b14e-a4b6d8345320.png)

그 다음 빌드 섹션에서 쉘 스크립트 실행을 선택해 줍니다  
![image](https://user-images.githubusercontent.com/83584721/175494004-b8b8f641-2f2e-4604-a743-e199f780b174.png)

그 다음 아래와 같이 스크립트를 입력합니다  
![image](https://user-images.githubusercontent.com/83584721/175494092-2b68b3c8-533f-4f27-b33a-6a2265da6ac5.png)  
```
docker build -t hello_test:latest .
docker run -d -p 80:80 hello_test
```
마지막 Save를 눌러줍니다.

- ### 빌드 및 배포  
![image](https://user-images.githubusercontent.com/83584721/175494528-91c7b2bf-e5ac-4ad6-9d94-7de2304b2e0c.png)  
왼쪽 메뉴에 Build Now를 눌러 빌드를 해봅시다

아래쪽에 빌드 프로세스가 확인이 되고 눌러서 아래 메뉴로 들어가 봅니다  
![image](https://user-images.githubusercontent.com/83584721/175494669-7fbc19ac-db1c-4b0c-b4fd-fb74cdf6b9a5.png)

다시 왼쪽 메뉴에서 Console Output 메뉴에서 다음과 같이 나오면 정상 빌드 완료입니다  
![image](https://user-images.githubusercontent.com/83584721/175494781-033a8703-f67f-473f-9c78-c67ca792d3ea.png)

http://localhost:80/ 에 접속하여 확인해 봅니다  
![image](https://user-images.githubusercontent.com/83584721/175495847-54581309-e052-440b-80c1-75a481d833a3.png)
