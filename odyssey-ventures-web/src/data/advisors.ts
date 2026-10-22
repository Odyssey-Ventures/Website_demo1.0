import type { Locale } from "@/i18n/config";

/** Same text in both languages, or one string per language. */
export type LocalizedText = string | Record<Locale, string>;

export function localize(text: LocalizedText, lang: Locale): string {
  return typeof text === "string" ? text : text[lang];
}

export type AdvisorGroup = "business" | "tech";

export type AdvisorCategory =
  | "legal"
  | "finance"
  | "marketing"
  | "fundraising"
  | "hr"
  | "interpretation"
  | "internet"
  | "ai"
  | "mobility"
  | "robots"
  | "energy"
  | "bio"
  | "semiconductor"
  | "kbeauty";

export interface Advisor {
  /** Company or affiliation. */
  org: LocalizedText;
  title: LocalizedText;
  specialty?: LocalizedText;
}

/** Category order and the group each category belongs to. Labels live in src/messages/*.json. */
export const advisorCategories: ReadonlyArray<{ key: AdvisorCategory; group: AdvisorGroup }> = [
  { key: "legal", group: "business" },
  { key: "finance", group: "business" },
  { key: "marketing", group: "business" },
  { key: "fundraising", group: "business" },
  { key: "hr", group: "business" },
  { key: "interpretation", group: "business" },
  { key: "internet", group: "tech" },
  { key: "ai", group: "tech" },
  { key: "mobility", group: "tech" },
  { key: "robots", group: "tech" },
  { key: "energy", group: "tech" },
  { key: "bio", group: "tech" },
  { key: "semiconductor", group: "tech" },
  { key: "kbeauty", group: "tech" },
];

const attorney = { en: "Attorney", ko: "변호사" };
const ceo = { en: "CEO", ko: "대표" };
const cpa = { en: "CPA", ko: "회계사" };
const partner = { en: "Partner", ko: "파트너" };
const investmentAssociate = { en: "Investment Associate", ko: "투자심사역" };
const fundraisingStrategy = { en: "Fundraising strategy", ko: "투자 유치 전략" };
const irDeckFeedback = { en: "IR deck feedback", ko: "IR Deck 피드백" };
const earlyStage = { en: "Early-stage fundraising", ko: "Early Stage 투자 유치 협의" };
const businessInterpreter = { en: "Business Interpreter", ko: "비즈니스 통역사" };

/**
 * Advisory board from the 2026 company profile (Odyssey Ventures 회사 소개서, pages 10–14).
 * The source lists affiliation, title and expertise only, without personal names.
 */
export const advisors: Record<AdvisorCategory, readonly Advisor[]> = {
  legal: [
    { org: "WilmerHale", title: attorney, specialty: "Startup, Pivot" },
    { org: "Morgan, Lewis & Bockius", title: attorney, specialty: "Startup, Pivot" },
    { org: "DLG", title: attorney, specialty: "Startup" },
    { org: "Linklaters", title: attorney, specialty: "M&A" },
    { org: "Misson", title: { en: "Managing Attorney", ko: "대표 변호사" }, specialty: "Cross-Border" },
  ],
  finance: [
    { org: "Numeri", title: ceo, specialty: { en: "Finance", ko: "재무" } },
    { org: "KIM & CO CPA", title: cpa, specialty: { en: "Accounting, Tax", ko: "회계, 세무" } },
    { org: { en: "H&H Accounting Firm", ko: "H&H 회계법인" }, title: cpa, specialty: { en: "Accounting, Tax", ko: "회계, 세무" } },
  ],
  marketing: [
    { org: "Ex-Samsung", title: "VP", specialty: "B2B marketing" },
    { org: "Jeneration Marketing", title: ceo, specialty: "Consumer marketing, Startup Marketing" },
    { org: "Google", title: "Marketing", specialty: "Growth marketing" },
    { org: "Amazon", title: "Partner Marketing", specialty: "Sponsorship, partner" },
  ],
  fundraising: [
    { org: "LikeLion USA", title: ceo, specialty: fundraisingStrategy },
    { org: "JC Valley", title: ceo, specialty: fundraisingStrategy },
    { org: "Samsung NEXT", title: investmentAssociate, specialty: irDeckFeedback },
    { org: "The Game Fund", title: partner, specialty: irDeckFeedback },
    { org: "Paper Jet Ventures", title: partner, specialty: earlyStage },
    { org: "A2G Capital", title: partner, specialty: { en: "Early-stage fundraising (B2B)", ko: "Early Stage 투자 유치 협의 (B2B)" } },
    { org: "Riceberg Ventures", title: investmentAssociate, specialty: earlyStage },
    { org: "Riverwood Capital", title: investmentAssociate, specialty: { en: "Late-stage fundraising", ko: "Late Stage 투자 유치 협의" } },
  ],
  hr: [
    { org: "Ex-Micron", title: "Program Director", specialty: "Compensation" },
    {
      org: "Optimax Partners",
      title: ceo,
      specialty: {
        en: "Startup HR Consulting & Solutions (hiring, evaluation, training and other HR processes)",
        ko: "Startup HR Consulting & Solutions (채용, 평가, 교육 등 HR 프로세스)",
      },
    },
  ],
  interpretation: [
    { org: "TransKorean", title: { en: "Conference Interpreter", ko: "국제회의통역사" } },
    { org: "GES", title: businessInterpreter },
    { org: { en: "Korean Language Education Foundation", ko: "한국어교육재단" }, title: businessInterpreter },
  ],
  internet: [
    { org: "Google", title: "Sr. Engineer", specialty: "Ph.D, Mobility, AI Glass" },
    { org: "Google", title: "Head of Program Mgt", specialty: "Chrome Browser, Google Pay" },
    { org: "Google", title: "Engineering Lead", specialty: "Ph.D, Music & Audio Engineering" },
    { org: "Google", title: "Sr. Software Engineer", specialty: "Android" },
    { org: "Google", title: "Partnership Manager", specialty: "Platforms & Devices" },
    { org: "Google", title: "Partnership Manager", specialty: "XR Partnerships" },
    { org: "Google", title: "Tech PM", specialty: "YouTube" },
    { org: "Google", title: "Business Development", specialty: "Google Cloud" },
    { org: "Meta", title: "Product Designer", specialty: "Ph.D, iPhone Design" },
    { org: "Meta", title: "VP", specialty: "AI, Whatsapp, and Platform Partnerships" },
    { org: "Meta", title: "Strategic Sourcing Manager", specialty: "Strategic Sourcing & Partnership" },
    { org: "Meta", title: "SW Engineer", specialty: "AI and Systems Co-design" },
    { org: "Meta", title: "Product Designer", specialty: "Ph.D, iPhone Design" },
    { org: "Meta", title: "Product Designer" },
    { org: "Amazon", title: "SW Engineer" },
    { org: "Amazon", title: "Global Head", specialty: "Sponsor Management" },
    { org: "Apple", title: "BD Lead", specialty: "Apple Music/Apple TV/iCloud" },
    { org: "Apple", title: "Sr. Engineering Manager", specialty: "Apple Vision" },
    { org: "Apple", title: "Engineering Manager", specialty: "Apple Chip" },
    { org: "Apple", title: "Sr. Engineer", specialty: "Telecommunications" },
    { org: "Apple", title: "Staff Engineer", specialty: "Smart Factory" },
    { org: "Apple", title: "Partner Manager", specialty: "Apple Ads" },
    { org: "Apple", title: "Sr. Operation Manager", specialty: "Apple Appstore" },
    { org: "Microsoft", title: "Applied Scientist", specialty: "AI/LLM" },
  ],
  ai: [
    { org: "Nvidia", title: "ML Engineer" },
    { org: "Nvidia", title: "Principal ML Engineer", specialty: "Physical AI" },
    { org: "Nvidia", title: "Principal Program Manager", specialty: "Autonomous Driving" },
    { org: "Nvidia", title: "Director", specialty: "Developer Relations" },
    { org: "Stanford", title: "Professor", specialty: "Ph.D, Neuroscience" },
    { org: "Stanford", title: "Professor", specialty: "Ph.D, Head of Stanford Engineering Entrepreneurship Center" },
    { org: "Stanford", title: "Post-Doc", specialty: "Ph.D, Neuroscience" },
    { org: "Stanford", title: "Post-Doc", specialty: "Ph.D, Generative AI" },
    { org: "Stanford", title: "Post-Doc", specialty: "Ph.D, Engineering" },
    { org: "Stanford", title: "PhD", specialty: "Neuroscience" },
    { org: "Stanford", title: "Research Engineer", specialty: "School of Medicine" },
    { org: "Google DeepMind", title: "Product", specialty: "AI" },
    { org: "Google DeepMind", title: "Sr. Research Engineer", specialty: "AI" },
    { org: "Meta", title: "AI Researcher", specialty: "Meta Superintelligence Labs" },
    { org: "Meta", title: "ML Engineer", specialty: "Facebook" },
    { org: "Meta", title: "Data Scientist" },
    { org: "Meta", title: "SW Engineer", specialty: "Meta Wearables AI" },
    { org: "Amazon", title: "AI Researcher", specialty: "Amazon AGI" },
    { org: "Amazon", title: "AI Researcher", specialty: "Amazon Lab 126" },
    { org: "OpenAI", title: "Product Design", specialty: "ChatGPT" },
    { org: "OpenAI", title: "Service Operation", specialty: "ChatGPT" },
    { org: "OpenAI", title: "Country Manager" },
    { org: "Walmart", title: "Sr. Product Manager", specialty: "AI Product" },
    { org: "Walmart", title: "Sr. Product Manager", specialty: "Supply Chain Tech" },
    { org: "Walmart", title: "Head of Business Development", specialty: "AI Acceleration & Partnerships" },
    { org: "HP", title: "BD Director", specialty: "AI Data Center" },
  ],
  mobility: [
    { org: "Tesla", title: "QA Engineer", specialty: "Ex-Tesla" },
    { org: "Tesla", title: "Sr. Eng Manager", specialty: "RoboTaxi & Humanoid" },
    { org: "Lucid", title: "Sr. Engineer", specialty: "Battery Management" },
    { org: "Lucid", title: "Sr. Engineer", specialty: "Ph.D, Fleet Mgt" },
    { org: "Lucid", title: "Sr. Manager", specialty: "Parking Planning & Control" },
    { org: "Lucid", title: "Director", specialty: "Strategic Sourcing" },
    { org: "Rivian", title: "ADAS Engineer", specialty: "Ph.D, Autonomous Driving" },
    { org: "Rivian", title: "Sr. Designer", specialty: "UX design" },
    { org: "Zoox", title: "Engineering Manager", specialty: "Ph.D, AI" },
    { org: "Phantom AI", title: "CEO", specialty: "Ph.D, Autonomous Driving" },
    { org: "Vueron", title: "Head of US", specialty: "Autonomous Driving" },
    { org: "FleetUp", title: "CEO", specialty: "Truck Fleet Mgt. AI" },
    { org: "Hyundai", title: "CVC", specialty: "Investment" },
    { org: "Hyundai", title: "Manager", specialty: "Business Development" },
    { org: "Waymo", title: "SW Engineer" },
    { org: "Parking AI", title: "CEO", specialty: "Business Development" },
    { org: "GM", title: "Executive Director", specialty: "R&D" },
    { org: "Aurora", title: "Sr. Manager", specialty: "Mapping Ops" },
  ],
  robots: [
    { org: "Ex-Google", title: "Startup Founder", specialty: "Physical AI Skill Modeling" },
    { org: "Meta", title: "Robotics SW Engineer" },
    { org: "Amazon", title: "ML Scientist", specialty: "Robotics" },
    { org: "Agility Robotics", title: "Supply Chain Manager", specialty: "Humanoid" },
    { org: "SoftBank Robotics", title: "SVP", specialty: "Corporate strategy and management" },
  ],
  energy: [
    { org: "SK Innovation", title: "Tech Sensing Lead", specialty: "Ph.D, Energy Solutions" },
    { org: "SK Innovation", title: "Principal Researcher", specialty: "Ph.D" },
    { org: "LG Nova", title: "Sr. Manager", specialty: "Energy/Bio" },
    { org: "Synergy", title: "Head of US", specialty: "Energy/Climate Tech" },
    { org: "California State Government", title: "Director", specialty: "Innovation & Emerging Tech" },
    { org: "California State Government", title: "Foreign Investment", specialty: "Analyst" },
  ],
  bio: [
    { org: "Stanford Medical School", title: "Director", specialty: "Business Innovation" },
    { org: "Stanford Medical School", title: "Biomedical Data Scientist", specialty: "School of Medicine" },
    { org: "Sequoia Hospital", title: "Nurse, Clinical Data Scientist" },
    { org: "UCSF", title: "Pharmacy Manager" },
    { org: "ImpriMed", title: "CEO" },
    { org: "GenEdit", title: "CEO" },
    { org: "Bracco Medical Technology", title: "Team Lead", specialty: "Ph.D, ML/Generative AI, Bio technology" },
  ],
  semiconductor: [
    { org: "Samsung Semiconductor", title: "Tech Program Manager", specialty: "Image Sensors" },
    { org: "Samsung Semiconductor", title: "Senior Staff Engineer", specialty: "Ex-Samsung" },
    { org: "Samsung Semiconductor", title: "Business Development" },
    { org: "Samsung Semiconductor", title: "EVP", specialty: "Ex-Samsung" },
    { org: "SK Hynix", title: "SVP", specialty: "Investment" },
    { org: "SK Hynix", title: "Fellow", specialty: "SSD" },
    { org: "AMD", title: "Senior Engineer", specialty: "Hardware Design" },
    { org: "Applied Materials", title: "ML Engineer" },
    { org: "Applied Materials", title: "Sr. Process Engineer" },
    { org: "Micron Technology", title: "Director", specialty: "ASIC & Firmware" },
    { org: "Western Digital", title: "Technologist" },
    { org: "Marvell", title: "Design Engineering Manager" },
    { org: "Qualcomm", title: "Memory Design Engineer", specialty: "Ex-Qualcomm, DRC, SoC" },
    { org: "KASPA", title: "Executive Director" },
  ],
  kbeauty: [
    { org: "iFoodLink", title: "CEO", specialty: { en: "Food science & nutrition, FDA approval", ko: "식품영양학, FDA 승인" } },
  ],
};
