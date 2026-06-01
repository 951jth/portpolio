# 도메인 등록 업체 비교

작성일: 2026-06-01  
기준: 개인 포트폴리오 사이트용 `.com` 도메인 1년 등록/갱신, 비프리미엄 도메인, USD 기준  
원화 환산: 대략 `1 USD = 1,500 KRW`로 계산한 참고값입니다. 실제 결제 시 환율, 카드 수수료, VAT/세금, ICANN 수수료 포함 여부에 따라 달라질 수 있습니다.

## 요약 추천

개인 포트폴리오용이면 **Spaceship** 또는 **Porkbun**을 우선 추천합니다. 둘 다 첫해 가격과 갱신가가 낮고, 도메인 프라이버시가 무료라 유지비가 깔끔합니다.

Cloudflare는 이미 Cloudflare DNS/CDN을 쓸 계획이면 좋은 선택입니다. 다만 Cloudflare Registrar는 도메인을 등록하거나 이전한 뒤 Cloudflare 네임서버를 쓰는 흐름에 더 자연스럽고, 일반 도메인 관리 UI는 전문 도메인 업체보다 단순합니다.

Namecheap은 익숙하고 지원/부가서비스가 많지만 `.com` 갱신가가 비교군 중 높은 편입니다. GoDaddy는 접근성은 좋지만 할인 조건과 갱신 비용을 반드시 확인해야 합니다.

## 가격 비교표

| 업체 | `.com` 첫해 등록 | `.com` 갱신 | 원화 대략 첫해 | 원화 대략 갱신 | WHOIS/도메인 프라이버시 | 장점 | 주의점 |
|---|---:|---:|---:|---:|---|---|---|
| Spaceship | `$8.88` | `$9.98` | 약 `13,320원` | 약 `14,970원` | 무료 | 가장 저렴한 편, UI 단순, 포트폴리오용에 충분 | Namecheap 계열의 비교적 신생 브랜드라 장기 운영 취향은 갈릴 수 있음 |
| Porkbun | `$11.08` | `$11.08` | 약 `16,620원` | 약 `16,620원` | 무료 | 가격 투명, 갱신가 낮음, 개발자/개인 프로젝트에 평판 좋음 | 국내 사용자에게는 GoDaddy/Namecheap보다 덜 익숙할 수 있음 |
| Cloudflare Registrar | 공식 표기는 “원가, 노마크업” / 시작가 `$7.85` | 보통 등록가와 유사한 원가 구조 | 변동 | 변동 | WHOIS redaction 제공 | Cloudflare DNS/CDN 연동이 가장 편함, DNSSEC 등 보안 기능 좋음 | TLD별 공개 가격표가 제한적이라 실제 검색/결제 화면에서 최종가 확인 필요 |
| Dynadot | `$10.88` | `$10.88` | 약 `16,320원` | 약 `16,320원` | 무료 | 등록/갱신가 균형 좋음, 가격표가 비교적 명확 | UI/브랜드 취향은 호불호 가능 |
| Namecheap | `$11.28` 할인가 | `$18.48` | 약 `16,920원` | 약 `27,720원` | 무료 | 유명하고 사용자가 많음, 부가서비스 풍부 | 갱신가가 높아 장기 보유 비용이 불리함 |

## 3년 보유 예상 비용

첫해 등록 + 2회 갱신 기준입니다.

| 업체 | 3년 예상 USD | 3년 예상 KRW |
|---|---:|---:|
| Spaceship | `$28.84` | 약 `43,260원` |
| Dynadot | `$32.64` | 약 `48,960원` |
| Porkbun | `$33.24` | 약 `49,860원` |
| Namecheap | `$48.24` | 약 `72,360원` |
| Cloudflare Registrar | 실제 도메인 검색/계정 화면에서 확인 필요 | 실제 도메인 검색/계정 화면에서 확인 필요 |

## 선택 가이드

### 가장 무난한 선택

**Spaceship**

포트폴리오 사이트 하나를 붙이는 목적이면 가격이 낮고 관리도 단순합니다. `.com` 기준 첫해 `$8.88`, 갱신 `$9.98`로 장기 보유 비용이 좋습니다.

### 안정적인 저가형 선택

**Porkbun** 또는 **Dynadot**

둘 다 갱신가가 낮고 가격표가 명확합니다. 할인 이벤트보다 매년 나가는 비용을 중요하게 보면 좋은 후보입니다.

### Cloudflare를 이미 쓸 경우

**Cloudflare Registrar**

Next.js 배포를 Vercel, Cloudflare Pages, Netlify 등에 연결하더라도 DNS는 Cloudflare로 관리하는 경우가 많습니다. 이미 Cloudflare DNS/CDN을 쓸 계획이면 도메인까지 Cloudflare에 두는 것도 깔끔합니다.

### 피하거나 신중히 볼 선택

**Namecheap / GoDaddy**

나쁜 선택은 아니지만 첫해 할인가만 보고 사면 갱신가에서 비용이 커질 수 있습니다. 특히 포트폴리오 도메인은 오래 들고 갈 가능성이 높으므로 첫해 가격보다 갱신가를 우선 확인하는 것이 좋습니다.

## 구매 전 체크리스트

- 원하는 도메인이 일반 도메인인지, 비싼 **프리미엄 도메인**으로 분류되는지 확인
- 첫해 가격과 갱신 가격을 따로 확인
- WHOIS privacy가 무료인지 확인
- 자동 갱신을 켜고 결제 카드 만료일 확인
- 구매 후 DNS 레코드 설정 가능 여부 확인
- Vercel 사용 시 보통 `A`, `CNAME` 레코드 또는 Vercel 안내값을 도메인 DNS에 추가

## 결론

이 프로젝트에 바로 도메인을 붙이는 목적이라면:

1. `Spaceship`에서 원하는 `.com` 도메인을 먼저 검색
2. 없거나 UI/브랜드가 마음에 안 들면 `Porkbun`
3. Cloudflare DNS를 적극적으로 쓸 계획이면 `Cloudflare Registrar`

개인 포트폴리오 도메인은 이름이 가장 중요하고, 업체는 나중에 이전도 가능합니다. 그래도 첫 구매라면 **갱신가가 낮고 WHOIS privacy가 무료인 곳**을 고르는 것이 좋습니다.

## 참고 출처

- Spaceship Domains: https://www.spaceship.com/domains/
- Porkbun Domain Pricing: https://porkbun.com/products/domains
- Cloudflare Registrar Pricing/About: https://www.cloudflare.com/pricing, https://developers.cloudflare.com/registrar/about/
- Dynadot Domain Prices: https://www.dynadot.com/domain/prices
- Namecheap Domain Prices: https://www.namecheap.com/domains/
