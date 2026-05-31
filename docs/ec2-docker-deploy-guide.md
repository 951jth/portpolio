# EC2 Docker 배포 가이드

이 문서는 EC2에 Docker와 Git 설치가 끝난 뒤, 프로젝트를 가져와서 컨테이너로 실행하는 절차를 정리한다.

## 공개 저장소에 IP를 적어도 되는가?

EC2 퍼블릭 IP는 접속 주소라서 비밀번호나 개인키처럼 즉시 탈취되는 비밀값은 아니다.

하지만 공개 GitHub 저장소에 실제 IP를 적어두면 누구나 서버 주소를 바로 알 수 있으므로, 문서에는 실제 값 대신 아래처럼 플레이스홀더를 사용한다.

```text
<EC2_PUBLIC_IP>
```

브라우저에서 확인할 때만 실제 IP를 직접 입력한다.

```text
http://<EC2_PUBLIC_IP>
```

## 1. 로컬 변경사항 push

EC2에서 최신 코드를 받으려면 먼저 로컬 커밋을 GitHub에 올린다.

```powershell
git push origin master
```

## 2. EC2 접속

Amazon Linux 2023의 기본 사용자는 `ec2-user`다.

```powershell
ssh -i C:\Users\<USER>\Downloads\<KEY_FILE>.pem ec2-user@<EC2_PUBLIC_IP>
```

## 3. 프로젝트 clone

EC2 내부에서 실행한다.

```bash
git clone https://github.com/951jth/portpolio.git portfolio
cd portfolio
```

이미 clone된 폴더가 있다면 새로 clone하지 않고 최신 코드만 받는다.

```bash
cd portfolio
git pull origin master
```

## 4. Docker 이미지 빌드

```bash
docker build -t portfolio .
```

권한 오류가 나면 SSH를 나갔다가 다시 접속한 뒤 재시도한다.

```bash
exit
```

다시 접속 후에도 권한 문제가 계속되면 임시로 `sudo`를 붙여 실행할 수 있다.

```bash
sudo docker build -t portfolio .
```

## 5. 컨테이너 실행

EC2의 80번 포트를 컨테이너의 3000번 포트로 연결한다.

```bash
docker run -d --name portfolio -p 80:3000 --restart unless-stopped portfolio
```

실행 확인:

```bash
docker ps
```

로그 확인:

```bash
docker logs portfolio
```

## 6. 브라우저 확인

로컬 브라우저에서 접속한다.

```text
http://<EC2_PUBLIC_IP>
```

보안 그룹에 HTTP 80 인바운드 규칙이 열려 있어야 한다.

```text
HTTP / TCP / 80 / 0.0.0.0/0
```

## 7. 업데이트 배포

새 커밋을 GitHub에 push한 뒤 EC2에서 실행한다.

```bash
cd portfolio
git pull origin master
docker build -t portfolio .
docker stop portfolio
docker rm portfolio
docker run -d --name portfolio -p 80:3000 --restart unless-stopped portfolio
```

## 참고

- 실제 EC2 퍼블릭 IP, 인스턴스 ID, 보안 그룹 ID, 로컬 `.pem` 경로는 개인 메모에만 보관한다.
- `.pem` 파일은 Git에 올리면 안 된다.
- Elastic IP를 연결하지 않았다면 EC2 중지 후 재시작 시 퍼블릭 IP가 바뀔 수 있다.
