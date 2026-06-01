# Font Optimization

이 프로젝트는 한글 타이포그래피 품질과 Lighthouse 성능을 같이 챙기기 위해
본문 폰트와 제목 폰트를 다르게 운영한다.

## 현재 구성

- 본문 폰트: `PretendardVariableSubset.woff2`
- 제목/로고 폰트: `DoHyeonSubset.woff2`
- 적용 위치: `src/app/layout.tsx`
- Tailwind font token 연결: `src/app/globals.css`

`PretendardVariableSubset.woff2`는 본문 가독성을 위해 유지하는 Pretendard의
subset 파일이다. 원본 `scripts/font-sources/PretendardVariable.woff2`는 약 2MB라서
직접 적용하지 않는다.

`DoHyeonSubset.woff2`는 Google Fonts의 Do Hyeon 전체 폰트를 쓰지 않고, 현재
프로젝트 소스에 등장하는 문자만 포함한 subset 파일이다. 현재 크기는 약 30KB다.

## 왜 subset을 쓰는가

`next/font/google`의 `Do_Hyeon`을 그대로 사용하면 한글 unicode range별 `woff2`
파일이 여러 개 생성된다. 개별 파일은 작지만, CSS를 받은 뒤 여러 폰트 파일을
발견하고 요청하는 구조가 되어 LCP critical path가 길어질 수 있다.

그래서 Do Hyeon은 `next/font/local`과 로컬 subset 파일로 적용한다. 이렇게 하면
요청 수가 1개로 줄고, 필요한 글자만 포함하므로 폰트 크기도 낮게 유지된다.

## 로딩 전략

두 폰트 모두 `display: "swap"`을 사용한다. fallback 폰트로 먼저 렌더링하고,
폰트가 로드되면 실제 폰트로 교체한다.

두 폰트 모두 `preload: false`를 사용한다. HTML 초기 preload로 폰트를 강제하지
않아 LCP 후보 이미지와 초기 CSS 렌더링을 방해하지 않게 한다.

```ts
const pretendard = localFont({
  src: "../../public/assets/fonts/PretendardVariableSubset.woff2",
  display: "swap",
  preload: false,
  variable: "--font-pretendard",
});

const doHyeon = localFont({
  src: "../../public/assets/fonts/DoHyeonSubset.woff2",
  display: "swap",
  preload: false,
  variable: "--font-dohyeon",
});
```

## Do Hyeon 문구 추가 시 주의

`PretendardVariableSubset.woff2`와 `DoHyeonSubset.woff2`는 현재 소스에 있는
문자만 담고 있다. 새 문구에 기존 subset에 없는 글자가 들어가면 그 글자만
fallback 폰트로 보일 수 있다.

새 제목, 로고 문구, 섹션 타이틀, 카드 타이틀을 추가한 뒤 글자가 섞여 보이면
subset 파일을 다시 생성해야 한다.

## Subset 재생성 방법

현재 소스에 등장하는 문자만 포함하도록 두 폰트를 다시 생성한다.

```bash
npm run fonts:subset
```

이 명령은 `scripts/subset-fonts.mjs`를 실행한다. 스크립트는 `src` 아래의
`.ts`, `.tsx`, `.css` 파일에서 사용 문자를 모으고 다음 파일을 갱신한다.

- `public/assets/fonts/PretendardVariableSubset.woff2`
- `public/assets/fonts/DoHyeonSubset.woff2`

Do Hyeon은 `scripts/font-sources/DoHyeon-Regular.ttf` 원본에서 subset을 만든다.
새 글자가 추가되어도 원본에서 다시 생성하므로 누락된 글자를 복구할 수 있다.

Pretendard도 `scripts/font-sources/PretendardVariable.woff2` 원본에서 subset을
만든다. 원본 폰트는 서비스 경로인 `public`에 두지 않는다.

원본 TTF를 다시 받아야 할 때는 Google Fonts 저장소에서 내려받는다.

```powershell
Invoke-WebRequest `
  -Uri "https://github.com/google/fonts/raw/main/ofl/dohyeon/DoHyeon-Regular.ttf" `
  -OutFile "scripts\font-sources\DoHyeon-Regular.ttf"
```

Do Hyeon만 임시로 빠르게 내려받아야 할 때는 Google Fonts의 `text=` 파라미터로
현재 소스에 등장하는 문자만 포함한 파일을 받을 수도 있다.

PowerShell 예시:

```powershell
$headers = @{
  "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
}

$text = (
  Get-ChildItem -Path src -Recurse -Include *.tsx,*.ts,*.css |
    ForEach-Object { Get-Content -Path $_.FullName -Raw -Encoding UTF8 }
) -join "`n"

$chars = [regex]::Matches(
  $text,
  "[\p{IsHangulSyllables}\p{IsHangulJamo}\p{IsHangulCompatibilityJamo}A-Za-z0-9 .,!?()&|/\-:+~%➡️©]"
) | ForEach-Object { $_.Value } | Sort-Object -Unique

$subsetText = -join $chars
$encoded = [uri]::EscapeDataString($subsetText)
$cssUrl = "https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap&text=$encoded"
$css = (Invoke-WebRequest -Uri $cssUrl -Headers $headers -UseBasicParsing).Content
$fontUrl = [regex]::Match($css, "https://fonts\.gstatic\.com/[^)]+").Value

Invoke-WebRequest `
  -Uri $fontUrl `
  -Headers $headers `
  -OutFile "public\assets\fonts\DoHyeonSubset.woff2"
```

생성 후 확인할 것:

```bash
npm run build
npm run lint
```

빌드 후 `.next/static/media`에 Do Hyeon 관련 `woff2`가 1개만 있는지 확인한다.
HTML에 font preload가 생기지 않는지도 함께 확인한다.
