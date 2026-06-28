const SITE_URL = "https://csh-portfolio.com";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PROFILE_PAGE_ID = `${SITE_URL}/#profilepage`;

export const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "조세훈 | 프론트엔드 엔지니어 포트폴리오",
      description:
        "성능 최적화와 사용자 경험 개선에 집중하는 6년 차 프론트엔드 엔지니어 조세훈의 포트폴리오입니다. React, Next.js 등의 기술 스택과 대용량 데이터 처리 경험을 소개합니다.",
      inLanguage: "ko-KR",
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "조세훈",
      url: SITE_URL,
      image: `${SITE_URL}/assets/images/profile.webp`,
      jobTitle: "프론트엔드 엔지니어",
      description:
        "프론트엔드 성능 병목 현상과 대용량 데이터 처리 문제를 구조적으로 해결하여 쾌적한 웹 환경을 제공하는 6년 차 엔지니어",
      email: "mailto:tpgnsjth@gmail.com",
      telephone: "+82-10-8968-9274",
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "React Native",
        "Web Performance",
        "Frontend Engineering",
      ],
      worksFor: {
        "@type": "Organization",
        name: "(주)델피콤 (Delphicom)",
      },
      sameAs: [
        "https://github.com/951jth/portpolio",
        "https://github.com/951jth/pandytalk",
        "https://admitted-flamingo-2a3.notion.site/Engineering-Log-30159549cbc0800286f9faf3a378fda2",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": PROFILE_PAGE_ID,
      url: SITE_URL,
      name: "조세훈 | 프론트엔드 엔지니어 포트폴리오",
      description:
        "조세훈의 경력, 기술 스택, 프로젝트를 소개하는 포트폴리오 페이지",
      inLanguage: "ko-KR",
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: { "@id": PERSON_ID },
    },
  ],
};
