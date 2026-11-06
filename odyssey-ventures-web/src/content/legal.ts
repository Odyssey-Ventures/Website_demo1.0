import type { Locale } from "@/i18n/config";

/**
 * Terms of Service and Privacy Policy text, in Korean and English.
 * DRAFT based on common templates: have it reviewed by counsel before relying on it.
 * Previews show a "draft" notice; the production site does not.
 * Update EFFECTIVE_DATE whenever the text changes.
 */
export const EFFECTIVE_DATE = "2026-11-04";

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface LegalDocument {
  title: string;
  intro: string;
  sections: LegalSection[];
}

const COMPANY = "Odyssey Ventures, LLC";
const ADDRESS = "1636 Branham Ln Unit B, San Jose, CA 95118, USA";
const EMAIL = "contact@odysseyventures.llc";

const terms: Record<Locale, LegalDocument> = {
  ko: {
    title: "이용약관",
    intro: `이 약관은 ${COMPANY}(이하 "회사")가 운영하는 웹사이트와 회사가 제공하는 교육(아카데미), 1:1 자문, 액셀러레이터, 컨설팅 및 멤버십 서비스(이하 "서비스")의 이용 조건을 정합니다.`,
    sections: [
      {
        title: "1. 약관의 동의와 변경",
        paragraphs: [
          "회원가입 또는 서비스 이용 시 이 약관에 동의한 것으로 봅니다.",
          "회사는 필요한 경우 약관을 변경할 수 있으며, 변경 내용은 시행일 7일 전(이용자에게 불리한 변경은 30일 전)까지 웹사이트에 공지합니다. 변경 후에도 서비스를 계속 이용하면 변경된 약관에 동의한 것으로 봅니다.",
        ],
      },
      {
        title: "2. 회원가입과 계정",
        paragraphs: [
          "회원은 정확한 이름과 이메일 주소로 가입해야 하며, 비밀번호를 안전하게 관리할 책임이 있습니다.",
          "계정을 다른 사람에게 양도하거나 빌려줄 수 없습니다. 계정 도용이 의심되면 즉시 회사에 알려 주세요.",
          "회원은 언제든지 회사에 요청해 탈퇴할 수 있습니다.",
        ],
      },
      {
        title: "3. 멤버십과 결제",
        paragraphs: [
          "멤버십은 Free, Basic, Pro, Enterprise 등급으로 운영되며, 등급별 요금과 혜택은 멤버십 페이지에 안내된 내용을 따릅니다.",
          "유료 멤버십은 매월 자동으로 갱신·결제되며, 다음 결제일 전까지 언제든 해지할 수 있습니다. 해지하면 이미 결제한 기간이 끝날 때까지 혜택이 유지됩니다.",
          "결제는 Stripe를 통해 처리되며, 회사는 카드 번호 등 결제 수단 정보를 직접 저장하지 않습니다.",
          "1:1 자문, 프로그램 등 개별 서비스의 요금과 환불 기준은 신청 시 별도로 안내합니다. 법령상 청약철회 등 이용자의 권리는 보장됩니다.",
        ],
      },
      {
        title: "4. 서비스의 제공과 변경",
        paragraphs: [
          "회사는 서비스 내용, 일정, 연사·자문위원 구성을 운영상 필요에 따라 변경할 수 있으며, 중요한 변경은 사전에 알립니다.",
          "1:1 자문과 프로그램은 일정 확정 후 진행되며, 자문위원의 사정으로 일정이 바뀔 수 있습니다.",
        ],
      },
      {
        title: "5. 이용자의 의무",
        paragraphs: [
          "이용자는 법령, 이 약관, 서비스 이용 안내를 지켜야 하며 다음 행위를 해서는 안 됩니다: 타인의 정보 도용, 서비스 운영 방해, 강의·자료의 무단 복제·배포, 다른 이용자나 자문위원에 대한 비방·괴롭힘, 영리 목적의 무단 광고.",
          "위 행위가 확인되면 회사는 서비스 이용을 제한하거나 계정을 해지할 수 있습니다.",
        ],
      },
      {
        title: "6. 지식재산권",
        paragraphs: [
          "웹사이트와 강의·자료의 저작권 등 지식재산권은 회사 또는 정당한 권리자에게 있습니다. 이용자는 개인 학습 목적 외에 이를 복제·배포·판매할 수 없습니다.",
          "이용자가 게시한 댓글·문의의 권리는 이용자에게 있으며, 회사는 서비스 운영에 필요한 범위에서 이를 이용할 수 있습니다.",
        ],
      },
      {
        title: "7. 면책",
        paragraphs: [
          "자문과 교육 내용은 일반적인 정보와 의견이며, 법률·세무·투자 등에 대한 최종 판단과 책임은 이용자에게 있습니다. 개별 사안은 해당 분야 전문가의 공식 자문을 받으시기 바랍니다.",
          "회사는 천재지변, 제3자 서비스(호스팅, 결제, 화상회의 등)의 장애 등 회사가 통제할 수 없는 사유로 인한 손해에 대해 책임지지 않습니다. 회사의 책임은 법령이 허용하는 범위에서 이용자가 해당 서비스에 지급한 금액을 한도로 합니다.",
        ],
      },
      {
        title: "8. 준거법과 분쟁 해결",
        paragraphs: [
          "이 약관은 미국 캘리포니아주 법을 따릅니다. 다만 이용자가 거주하는 국가의 소비자 보호 법령이 더 유리한 권리를 보장하는 경우 그 법령이 적용됩니다.",
          "분쟁이 생기면 먼저 성실히 협의하며, 협의가 되지 않으면 관할 법원에서 해결합니다.",
        ],
      },
      {
        title: "9. 문의",
        paragraphs: [`${COMPANY}\n${ADDRESS}\n${EMAIL}`],
      },
    ],
  },
  en: {
    title: "Terms of Service",
    intro: `These Terms govern your use of the website operated by ${COMPANY} ("we", "us") and of our Academy, 1:1 advisory, accelerator, consulting and membership services (the "Services").`,
    sections: [
      {
        title: "1. Acceptance and changes",
        paragraphs: [
          "By creating an account or using the Services you agree to these Terms.",
          "We may update these Terms. We will post changes on the website at least 7 days before they take effect (30 days for changes that are unfavorable to you). Continuing to use the Services after that means you accept the updated Terms.",
        ],
      },
      {
        title: "2. Accounts",
        paragraphs: [
          "Sign up with your real name and email address and keep your password secure.",
          "Accounts are personal and may not be transferred or shared. Tell us right away if you suspect unauthorized use.",
          "You may close your account at any time by contacting us.",
        ],
      },
      {
        title: "3. Membership and payments",
        paragraphs: [
          "Membership is offered in Free, Basic, Pro and Enterprise tiers. Prices and benefits are those shown on the Membership page.",
          "Paid memberships renew and are charged monthly until cancelled. You can cancel any time before the next billing date; benefits continue until the end of the paid period.",
          "Payments are processed by Stripe. We do not store your card details.",
          "Prices and refund terms for individual services such as 1:1 advisory sessions and programs are given when you apply. Your statutory rights are not affected.",
        ],
      },
      {
        title: "4. Providing and changing the Services",
        paragraphs: [
          "We may change the content, schedule, speakers or advisors of the Services when needed and will announce significant changes in advance.",
          "1:1 sessions and programs take place once scheduled; an advisor's availability may require rescheduling.",
        ],
      },
      {
        title: "5. Your responsibilities",
        paragraphs: [
          "Follow the law, these Terms and our service guidelines. Do not impersonate others, disrupt the Services, copy or distribute course materials without permission, harass other users or advisors, or post unsolicited advertising.",
          "We may restrict or close accounts that do so.",
        ],
      },
      {
        title: "6. Intellectual property",
        paragraphs: [
          "The website, courses and materials belong to us or their rightful owners. You may use them for your own learning only, not copy, distribute or sell them.",
          "You keep the rights to comments and questions you post; you allow us to use them as needed to operate the Services.",
        ],
      },
      {
        title: "7. Disclaimers and limitation of liability",
        paragraphs: [
          "Advice and course content are general information and opinion. Decisions on legal, tax, investment and similar matters remain yours; obtain formal advice from a qualified professional for your specific situation.",
          "We are not liable for losses caused by events beyond our control, including outages of third-party services (hosting, payments, video conferencing). To the extent permitted by law, our liability is limited to the amount you paid for the Service concerned.",
        ],
      },
      {
        title: "8. Governing law and disputes",
        paragraphs: [
          "These Terms are governed by the laws of the State of California, USA, except where consumer protection laws of your country of residence give you stronger rights.",
          "We will first try to resolve any dispute in good faith; otherwise it will be settled by the competent courts.",
        ],
      },
      {
        title: "9. Contact",
        paragraphs: [`${COMPANY}\n${ADDRESS}\n${EMAIL}`],
      },
    ],
  },
};

const privacy: Record<Locale, LegalDocument> = {
  ko: {
    title: "개인정보 처리방침",
    intro: `${COMPANY}(이하 "회사")는 이용자의 개인정보를 소중히 다루며, 어떤 정보를 왜 수집하고 어떻게 보호하는지 아래와 같이 안내합니다.`,
    sections: [
      {
        title: "1. 수집하는 정보",
        paragraphs: [
          "회원가입: 이름, 이메일 주소, 비밀번호(암호화되어 저장되며 회사도 원문을 볼 수 없습니다).",
          "서비스 신청·문의: 이름, 이메일, 회사명, 직책, 연락처, 문의·신청 내용 등 이용자가 직접 입력한 정보.",
          "결제: 결제는 Stripe가 처리하며, 회사는 결제 여부·금액·일시 등 결제 결과만 받습니다. 카드 번호는 회사에 전달되지 않습니다.",
          "자동 수집: 로그인 상태 유지를 위한 쿠키, 접속 기록 등 서비스 운영에 필요한 최소한의 기술 정보.",
        ],
      },
      {
        title: "2. 이용 목적",
        paragraphs: [
          "회원 관리와 본인 확인, 강의·자문·프로그램 신청 처리와 일정 안내, 멤버십 결제와 혜택 제공, 문의 답변, 서비스 개선과 부정 이용 방지에 이용합니다.",
          "마케팅 메일은 별도로 동의한 경우에만 보내며, 언제든 수신을 거부할 수 있습니다.",
        ],
      },
      {
        title: "3. 보관 기간",
        paragraphs: [
          "회원 정보는 탈퇴할 때까지 보관하고, 탈퇴하면 지체 없이 삭제합니다.",
          "다만 결제·거래 기록 등 법령이 보관을 요구하는 정보는 해당 기간 동안 보관합니다.",
        ],
      },
      {
        title: "4. 제3자 제공과 처리 위탁",
        paragraphs: [
          "회사는 이용자의 개인정보를 판매하지 않으며, 법령에 따른 경우를 제외하고 동의 없이 제3자에게 제공하지 않습니다.",
          "서비스 운영을 위해 다음 업체에 처리를 맡깁니다: Supabase(회원 계정·게시판 데이터 저장), Stripe(결제 처리), Vercel(웹사이트 호스팅), Google(신청·문의 접수 시트와 알림 메일), Zoom 또는 Google Meet(온라인 강의·자문).",
          "1:1 자문을 신청하면 원활한 진행을 위해 신청 내용을 담당 자문위원에게 전달합니다.",
        ],
      },
      {
        title: "5. 국외 이전",
        paragraphs: [
          "회사와 위 처리 업체의 서버는 주로 미국에 있어, 이용자의 정보는 미국에서 저장·처리됩니다. 서비스 이용 시 이 국외 이전에 동의한 것으로 봅니다.",
        ],
      },
      {
        title: "6. 이용자의 권리",
        paragraphs: [
          "이용자는 언제든지 자신의 개인정보 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 아래 연락처로 요청하시면 지체 없이 처리합니다.",
          "캘리포니아 거주자는 CCPA/CPRA에 따른 권리를 가집니다. 회사는 개인정보를 판매하거나 공유(교차 행동 광고 목적)하지 않습니다.",
        ],
      },
      {
        title: "7. 안전성 확보 조치",
        paragraphs: [
          "모든 통신은 HTTPS로 암호화되며, 비밀번호는 암호화해 저장합니다. 데이터베이스는 행 단위 접근 제어로 본인과 권한 있는 직원만 해당 정보를 볼 수 있습니다.",
        ],
      },
      {
        title: "8. 쿠키",
        paragraphs: [
          "로그인 상태 유지 등 필수 기능에만 쿠키를 사용합니다. 브라우저 설정으로 쿠키를 막을 수 있지만, 그 경우 로그인 기능을 이용할 수 없습니다.",
        ],
      },
      {
        title: "9. 개인정보 문의",
        paragraphs: [`${COMPANY}\n${ADDRESS}\n${EMAIL}`, "이 방침이 바뀌면 시행일 전에 웹사이트에 공지합니다."],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    intro: `${COMPANY} ("we", "us") respects your privacy. This policy explains what we collect, why, and how we protect it.`,
    sections: [
      {
        title: "1. Information we collect",
        paragraphs: [
          "Account: name, email address and password (stored hashed; we cannot see it).",
          "Applications and inquiries: the details you enter, such as name, email, company, title, phone number and your message.",
          "Payments: processed by Stripe. We receive only the result (whether you paid, the amount and the date), never your card number.",
          "Automatically: cookies that keep you signed in and the minimum technical logs needed to run the site.",
        ],
      },
      {
        title: "2. How we use it",
        paragraphs: [
          "To manage your account, process applications for courses, advisory sessions and programs, send schedules, handle membership billing and benefits, answer questions, improve the Services and prevent abuse.",
          "We send marketing email only if you opt in, and you can unsubscribe at any time.",
        ],
      },
      {
        title: "3. Retention",
        paragraphs: [
          "We keep account data until you close your account and then delete it without undue delay, except records such as payment history that the law requires us to keep.",
        ],
      },
      {
        title: "4. Sharing and service providers",
        paragraphs: [
          "We do not sell your personal information or share it without your consent except as required by law.",
          "We use these providers to run the Services: Supabase (accounts and board data), Stripe (payments), Vercel (hosting), Google (application sheets and notification email), and Zoom or Google Meet (online sessions).",
          "When you request a 1:1 session, we share your request with the advisor who will meet you.",
        ],
      },
      {
        title: "5. International transfers",
        paragraphs: ["We and our providers are mainly based in the United States, so your information is stored and processed in the US."],
      },
      {
        title: "6. Your rights",
        paragraphs: [
          "You can ask to access, correct or delete your information, or to stop its processing, by contacting us below.",
          "California residents have rights under the CCPA/CPRA. We do not sell or share personal information for cross-context behavioral advertising.",
        ],
      },
      {
        title: "7. Security",
        paragraphs: [
          "All traffic is encrypted with HTTPS and passwords are hashed. Row-level access rules in our database let only you and authorized staff see your records.",
        ],
      },
      {
        title: "8. Cookies",
        paragraphs: ["We use only essential cookies, such as the one that keeps you signed in. Blocking them in your browser disables sign-in."],
      },
      {
        title: "9. Contact",
        paragraphs: [`${COMPANY}\n${ADDRESS}\n${EMAIL}`, "We will post any changes to this policy on the website before they take effect."],
      },
    ],
  },
};

export function getLegalDocument(kind: "terms" | "privacy", lang: Locale): LegalDocument {
  return (kind === "terms" ? terms : privacy)[lang];
}
