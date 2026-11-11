import type { AdvisorProfile } from "@/data/advisor-profiles";

export type AdvisorTranslation = Partial<Pick<AdvisorProfile, "title" | "specialties" | "bio" | "career" | "education">>;

/**
 * Korean versions of the advisor profiles, keyed by slug. Shown on the Korean pages.
 * Names, company and school names, and technical terms stay in English.
 */
export const advisorProfilesKo: Readonly<Record<string, AdvisorTranslation>> = {
  "andrew-y-jin": {
    title: "변호사",
    specialties: "미국 비즈니스·가족 이민, EB-1/EB-2/NIW/EB-3, 비이민 비자(E, H-1B, L, O, P), 기업 이민 컴플라이언스",
    bio: "Andrew Y. Jin 변호사는 실리콘밸리 San Jose(Campbell 사무소 포함)에 있는 이민 전문 로펌 Law Offices of Andrew Y. Jin & Associates, PC의 설립자이자 대표 변호사입니다. 미국 비즈니스 이민, 취업·가족 기반 청원, 기업 이민 컴플라이언스 분야에서 15년 넘게 개인과 기업을 대리해 왔습니다.",
    career: [
      "Law Offices of Andrew Y. Jin & Associates, PC 설립자·대표 변호사",
      "캘리포니아주 변호사 협회(State Bar of California) 회원 (2006–현재)",
    ],
    education: ["Santa Clara University School of Law, J.D. (2005)", "University of California, Santa Cruz, 학사 (1999)"],
  },
  "deborah-le": {
    title: "변호사",
    specialties: "스타트업·글로벌 기업 법무(법인 설립, 투자 유치, 구조 조정), 고용·노동법, 미국 이민",
    bio: "이연수(Deborah Lee) 변호사는 San Jose에 있는 법무법인 디엘지(DLG Law Corporation) 미국 사무소를 이끌고 있습니다. UC Berkeley를 졸업한 캘리포니아주 변호사로, 수백 곳의 하이테크 기업, 스타트업, VC, 액셀러레이터에 법인 설립, 투자 유치, 구조 조정, 고용·노동법, 이민 자문을 제공해 왔으며, 특히 한국 기업과 글로벌 기업의 미국 진출을 돕고 있습니다.",
    career: ["법무법인 디엘지(DLG Law Corporation) 선임 변호사·미국 사무소 대표"],
    education: ["University of California, Berkeley, J.D."],
  },
  "eugene-kang": {
    title: "변호사",
    specialties: "스타트업·벤처 투자, M&A, 지배 구조, 한국·해외 스타트업의 미국 진출과 법인 구조 설계",
    bio: "Eugene Kang 변호사는 스타트업과 벤처 투자자를 전문으로 하는 샌프란시스코 베이 지역 부티크 로펌 Venturous Counsel의 선임 변호사입니다. 신생 기업과 투자자에게 투자 유치, M&A, 지배 구조, 전략적 거래를 자문하며, 한국과 해외 스타트업의 미국 시장 진출과 법인 구조 설계를 자주 돕고 있습니다. Plug & Play Korea, KOTRA, 창조경제혁신센터에서 법률 워크숍을 진행했습니다.",
    career: [
      "Venturous Counsel 선임 변호사",
      "Innovative Legal Services (ILS) 기업법무 리드",
      "WilmerHale 변호사",
      "Shearman & Sterling 변호사",
    ],
    education: ["UC Berkeley School of Law, J.D."],
  },
  "natalie-huh": {
    title: "변호사",
    specialties: "IP 소송(특허, 저작권, 영업 비밀), 한미 간 분쟁, 암호화폐·증권·금융 자산 관련 사건",
    bio: "Natalie Huh 변호사는 샌프란시스코 Quinn Emanuel Urquhart & Sullivan의 소송 변호사(Associate)로, 특허, 저작권, 영업 비밀 등 지식재산권 소송 경험이 풍부합니다. 특히 한국 기업과 개인을 대리해 소송, 협상, 정부 조사에 대응해 왔습니다. 캘리포니아 연방·주 법원과 미국 국제무역위원회(ITC)에서 상사·IP 소송을 맡았고, 금융 경력과 MBA를 바탕으로 암호화폐, 증권, 금융 자산 관련 사건도 다뤘습니다. Menlo Park의 투자 회사 Ridgepoint Global Partners, LLC에도 소속되어 있습니다.",
    career: [
      "Quinn Emanuel Urquhart & Sullivan, LLP (샌프란시스코) IP·특허 소송 Associate",
      "Ridgepoint Global Partners, LLC (Menlo Park, CA) 소속",
      "미국 특허청(USPTO) 등록 특허 변호사, 캘리포니아주 변호사",
    ],
    education: [
      "University of California, Hastings College of the Law, J.D. cum laude (2020)",
      "Stanford University Graduate School of Business, MBA (2015)",
      "KAIST 전기전자공학·전산학 학사 (2005)",
    ],
  },
  "tae-woong-koo": {
    title: "변호사",
    specialties: "지식재산권(특허 출원, 상표, 저작권, 영업 비밀), 스타트업부터 Fortune 500 기업까지 자문, 한국어 가능",
    bio: "구태웅 박사는 Morgan, Lewis & Bockius LLP 실리콘밸리(Palo Alto) 사무소의 파트너 변호사로, 특허, 상표, 저작권, 영업 비밀을 아우르는 IP 업무를 맡고 있습니다. 변호사가 되기 전 MIT에서 박사 학위를 받고 Intel에서 선임 연구원과 제품·규제 담당 매니저로 일했으며, 30건 이상의 특허를 보유하고 있습니다. 스타트업부터 Fortune 500 기업까지 다양한 고객을 자문하며, 한인 법조계에서도 활발히 활동하고 있습니다.",
    career: [
      "Morgan, Lewis & Bockius LLP (실리콘밸리) 파트너",
      "Intel Corp. 선임 연구원, 제품 라인·규제 담당 매니저",
      "북가주 한인변호사협회(Korean American Bar Association of Northern California) 전 회장·이사",
      "세계한인변호사회(International Association of Korean Lawyers) 지역 대표",
    ],
    education: [
      "Santa Clara University School of Law, J.D. (2009)",
      "Massachusetts Institute of Technology 박사 (2001)",
      "MIT 석사 (1998)",
      "서울대학교 학사, 우등 졸업 (1996)",
    ],
  },
  "yeong-sae-kim": {
    title: "변호사",
    specialties: "스타트업·벤처 투자, M&A, 지배 구조, 한국·해외 스타트업의 미국 진출과 법인 구조 설계",
    bio: "Yeong-Sae Kim 변호사는 스타트업과 벤처 법무를 전문으로 하는 실리콘밸리 한미 부티크 로펌 Venture Pacific Law Group, PC(VenturePLG)의 캘리포니아주 변호사입니다. 스타트업, 창업자, 벤처 투자자에게 투자 유치, M&A, 기업 지배 구조, 미국 진출, 법인 구조 설계를 자문하며, 특히 한국과 해외 스타트업이 미국에 자리 잡고 성장하도록 돕고 있습니다. Santa Clara University의 하이테크 법 전공과 실리콘밸리 스타트업·기업 자문 경험을 바탕으로 한미 혁신 생태계를 잇고 있습니다.",
    career: [
      "Venture Pacific Law Group, PC (VenturePLG) 변호사·설립자, 실리콘밸리",
      "Law Office of Yeong-Sae Kim 대표",
      "iPark Silicon Valley",
      "DQ Technology",
      "Arthur Andersen LLP",
    ],
    education: [
      "Santa Clara University School of Law, J.D. (하이테크 법 전공, Roe Maier Law Scholar)",
      "Tufts University 학사",
    ],
  },
  "andre-kim": {
    title: "세무 변호사",
    specialties: "국경 간 기업·세무 자문, 미국 세법, 이민, 국방·공공 조달 (미국–아시아태평양)",
    bio: "Andre J. Kim 변호사는 San Diego에 있는 국경 간 기업·세무·이민 로펌 GridSquare Legal P.C.의 설립자이자 CEO로, 창업자와 투자자, 기업에 영어, 스페인어, 한국어, 일본어로 법률 서비스를 제공합니다. 미국 국세청(IRS) 수석 법률고문실 선임 변호사, 미국 국방부 계약 담당관, 미 해병대 장교(법무관)로 근무했습니다.",
    career: [
      "GridSquare Legal P.C. & GridSquare Consulting (San Diego) 설립자·CEO",
      "미국 국세청(IRS) 수석 법률고문실 선임 변호사",
      "미국 국방부 계약 담당관",
      "미 해병대 장교 (법무관 / 동북아 지역 전문 장교)",
    ],
    education: ["Washington University in St. Louis School of Law, J.D."],
  },
  "jamie-choi": {
    specialties: "기업 회계, 기장, 급여, 세무, SEC 보고, US GAAP, 내부 통제",
    bio: "Jamie Choi는 San Jose 지역의 회계·재무 서비스 회사 Numeri Consulting의 Managing Partner이자 Chief Collaboration Officer입니다. SEC 보고, 수익 인식, US GAAP, 내부 통제 등 기업 회계와 재무 운영 경험을 갖추고 있으며, PwC와 여러 베이 지역 회사에서 일했습니다.",
    career: [
      "Numeri Consulting Managing Partner / Chief Collaboration Officer",
      "Effectus Group 컨설턴트",
      "Aptitude Consulting 컨설턴트",
      "PwC",
    ],
    education: ["San Jose State University 회계학 학사"],
  },
  "jason-park": {
    title: "회계사",
    specialties: "기업 회계, 기장, 법인 세무·회계 서비스",
    bio: "Jason Park은 2018년부터 기업 고객에게 회계, 기장, 세무 서비스를 제공하는 회계 법인 JASON Accountancy Corp(sjcorpcpa.com)의 회계사입니다.",
    career: ["JASON Accountancy Corp 회계사·대표 (2018–현재)"],
    education: [],
  },
  "jayson-kim": {
    title: "회계사",
    specialties: "고액 자산가 세무 설계, 회계 아웃소싱, 한미 간 사업 확장",
    bio: "김정현(Jayson Jung Kim)은 캘리포니아 Fullerton에 본사를 두고 서울, Plano(텍사스), 호찌민에 사무소를 운영하는 회계 법인 Kim & Co CPA의 설립자이자 CEO입니다. 20년 넘게 회계·세무 서비스를 제공해 왔으며, 고액 자산가 세무 설계, 회계 아웃소싱, 국경 간 사업 확장을 전문으로 합니다.",
    career: ["Kim & Co CPA 설립자·CEO, Fullerton, CA"],
    education: ["University of California, Los Angeles (UCLA)"],
  },
  "matthew-sung": {
    title: "Managing Partner, 공인회계사",
    specialties: "기업 회계, 세무 전략, 개인·소상공인 세무",
    bio: "성승철(Matthew Sung)은 San Jose·Campbell 지역에서 개인과 소상공인 세무 서비스와 세무 전략을 제공하는 회계 법인 MJ Partners LLP / MJ Partners Consulting의 Managing Partner이자 공인회계사(CPA)입니다.",
    career: ["MJ Partners LLP / MJ Partners Consulting Managing Partner, CPA"],
    education: ["Boston College, Carroll School of Management"],
  },
  "barry-mcgeough": {
    title: "이노베이션 총괄",
    specialties: "B2B 세일즈·파트너십, 기업 혁신, 소재, 파일럿·POC",
    bio: "Barry McGeough는 글로벌 소비재 브랜드에서 20년 넘게 제품, 디지털, 소재 혁신을 이끌어 온 응용 혁신 전문가이자 제품 전략가, 기조연설자입니다. 실리콘밸리 Next Now의 이노베이션 총괄로서 B2B 파트너십, 파일럿·POC, 소재 혁신을 통해 기업이 새로운 기술을 사업 성장으로 연결하도록 돕고 있습니다. Wolverine Worldwide, PVH Corp.(Calvin Klein, Tommy Hilfiger, Speedo, Izod), VF Corporation / The North Face, Speedo, Google ATAP에서 혁신·선행 개발 팀을 이끌며 커넥티드 의류와 웨어러블 기술을 발전시켰습니다. 여러 건의 특허를 보유하고 있으며 CES, SXSW, PI Apparel에서 기조연설을 했습니다.",
    career: [
      "Next Now 이노베이션 총괄, 실리콘밸리 (현재)",
      "AmeriCo. Group 이노베이션 그룹 VP (2023–)",
      "Wolverine Worldwide 제품·디지털 혁신 글로벌 VP (2020–2023)",
      "Google ATAP 전략 파트너십 디렉터 (커넥티드 의류)",
      "PVH Corp. Innovation Next 그룹 VP·설립자 (Calvin Klein, Tommy Hilfiger, Speedo, Izod)",
      "VF Corporation / The North Face, Speedo, Teva 제품 혁신 리더",
    ],
    education: ["University of Southern California"],
  },
  "charlie-huh": {
    specialties: "사업 개발, 성장·매출 전략, 디지털 마케팅, 전략적 파트너십, 프로그래매틱·애드테크, 글로벌 시장 진출",
    bio: "Charlie Huh는 샌프란시스코 베이 지역에서 글로벌 사업과 성장 조직을 만들어 온 테크 스타트업 경영자입니다. 통신 회사 TitanSim의 CBO(Chief Business Officer)이자 ATTOMAX의 CRO(Chief Revenue Officer)를 함께 맡고 있습니다. 이전에는 미디어·애드테크 업계에서 성장, 마케팅, 파트너십 리더로 일했고, 회사 인수 엑싯도 경험했습니다.",
    career: [
      "TitanSim CBO (2026–현재)",
      "ATTOMAX CRO (2024–현재)",
      "Tapas Entertainment 성장·마케팅 VP (2019–2023)",
      "Magnite 프로그래매틱 어카운트 매니저 (2017–2019)",
      "ODK Media, Inc. 어카운트 디렉터 (2013–2017)",
    ],
    education: ["University of Chicago 경제학 학사", "Milton Academy"],
  },
  "jennifer-lewis": {
    title: "마케팅",
    specialties: "스타트업·B2B 마케팅 전략, 포지셔닝과 메시지, 커뮤니케이션",
    bio: "Jennifer Lewis는 2022년 설립한 Jeneration Marketing의 설립자이자 대표로, 20년 넘게 스타트업 생태계에서 일해 왔습니다. 약 20년 동안 ONSET Ventures에서 마케팅·커뮤니케이션 VP까지 올라 대외 마케팅을 이끌고 포트폴리오 기업을 자문했습니다.",
    career: [
      "Jeneration Marketing 설립자·대표 (2022–현재)",
      "ONSET Ventures 마케팅·커뮤니케이션 VP",
      "ONSET Ventures 마케팅 디렉터",
      "ONSET Ventures 커뮤니케이션 매니저",
    ],
    education: [],
  },
  "juye-kim": {
    specialties: "재생에너지 프로젝트 개발, 건물 에너지 관리, 분산 에너지 자원(DER), 에너지 저장 장치(ESS), IoT 통합, 건물 시뮬레이션, 기후 테크",
    bio: "김주예는 Synergy의 미국 법인장(Head of US)으로 일하는 에너지·기후 테크 전문가입니다. LG에서 7년 넘게 데이터센터 에너지 관리 시스템과 에너지 저장 장치(ESS) 등 글로벌 재생에너지 프로젝트 개발을 이끌었고, 이후 Carnegie Mellon에서 건물 성능과 에너지를 연구했습니다. 건물 에너지 관리, 분산 에너지 자원 통합, IoT 시스템 통합, 건물 시뮬레이션을 주로 다룹니다.",
    career: [
      "Synergy 미국 법인장 (현재)",
      "Environmental Defense Fund EDF Climate Corps Fellow, 샌프란시스코 (2022)",
      "Airbnb 에너지 스페셜리스트 인턴 (2021–2022)",
      "Carnegie Mellon University 건물성능진단센터 연구 조교 (2019–2020)",
      "LG CNS 소프트웨어 엔지니어·재생에너지 연구원, 서울 (2014–2018)",
    ],
    education: [
      "Carnegie Mellon University 건물성능진단 석사",
      "한동대학교 도시계획·글로벌 창업 학사",
      "Massachusetts Institute of Technology MIT Innovation Leadership Bootcamp",
    ],
  },
  "mj-kang": {
    title: "파트너",
    specialties: "B2C·DTC 그로스 마케팅, 시장 진출 전략, 투자, 글로벌 확장",
    bio: "강민정(MJ Kang)은 글로벌 제품을 만드는 한국 창업자를 지원하는 초기 단계 마이크로 VC Rabbit Ventures의 파트너입니다. Apple과 Tesla에서 일했고 미국 에듀테크·AI 스타트업에서 CXO급 역할을 맡았으며, 시장 진출 전략, 체험 마케팅, 파트너 개발, 투자자 관계, 소비자(B2C·DTC) 성장에 전문성이 있습니다.",
    career: ["Rabbit Ventures 파트너", "미국 에듀테크·AI 스타트업 CXO급 역할", "Tesla", "Apple"],
    education: [],
  },
  "sue-kim": {
    specialties: "B2B 마케팅과 기업 커뮤니케이션 (반도체·딥테크)",
    bio: "Sue Kim은 엣지 AI 반도체 회사 ANAFLASH의 기업 마케팅·전략 VP로 전 세계 마케팅과 커뮤니케이션을 맡고 있습니다. 주요 반도체 회사와 PR 회사에서 25년 넘게 마케팅을 해 왔으며, 최근에는 삼성전자 미국 법인 마케팅 커뮤니케이션 총괄을 지냈고, 그 전에는 Marvell, Kilopass(Synopsys에 인수), OSRAM Opto Semiconductors, Renesas에서 리더로 일했습니다.",
    career: [
      "ANAFLASH 기업 마케팅·전략 VP",
      "삼성전자 미국 법인 마케팅 커뮤니케이션 총괄",
      "Marvell Semiconductor 마케팅 리더",
      "Kilopass (Synopsys에 인수) 마케팅",
      "OSRAM Opto Semiconductors / Renesas 마케팅",
    ],
    education: [
      "국민대학교 영어영문학 학사",
      "Stanford GSB 경영자 과정 수료",
      "University of Pennsylvania, The Wharton School 경영자 과정 수료",
    ],
  },
  "kenneth-rhee": {
    specialties: "한미 간 임원 채용(Executive Search), 사내 채용, C레벨·VP 채용",
    bio: "Kenneth Rhee는 아시아 기업이 미국 인재를 채용하고 미국 시장에 진출하도록 돕는 인재 정보·임원 채용 회사 Offer Squirrel Inc.(Sunnyvale, CA)의 설립자이자 CEO입니다. 미국 진출에 필요한 CXO와 리더급 채용을 전문으로 하며, 이전에는 Impact AI의 Chief of Staff와 LG전자 북미 법인의 임원 채용 담당으로 일했습니다.",
    career: [
      "Offer Squirrel Inc. 설립자·CEO (2024–현재)",
      "Impact AI Chief of Staff (2024–2026)",
      "LG전자 북미 법인 임원 채용 담당 (2022–2024)",
      "SK이노베이션 채용 매니저 (2018–2022)",
    ],
    education: ["Rensselaer Polytechnic Institute 석사"],
  },
  "misook-chung": {
    title: "디렉터",
    specialties: "HR, 보상·Total Rewards (반도체·테크)",
    bio: "MiSook Chung은 반도체 업계에서 20년 넘게 일한 HR·Total Rewards 리더입니다. 2025년까지 Micron Technology에서 글로벌 보상 프로그램·파트너 디렉터로 일하며 역량 기반 인재 개발, 글로벌 보상 교육, 보상 시스템 현대화를 이끌었습니다. 반도체 업계 출신들이 세운 AI 스타트업 컨설팅 회사 AddVia.ai와 함께하고 있으며, 미주한인위원회(Council of Korean Americans) 회원입니다.",
    career: ["AddVia.ai 디렉터", "Micron Technology 글로벌 보상 프로그램·파트너 디렉터 (~2025)"],
    education: [],
  },
  "natalie-yun": {
    specialties: "HR 전략·컴플라이언스, 인재 채용, 성과 관리, 온보딩·교육, 조직 혁신, 한국–북미 간 HR",
    bio: "윤나영(Natalie Yun)은 북미에 진출하는 한국 창업자와 기업이 채용, 컴플라이언스, 인사 운영을 해결하도록 돕는 HR 컨설팅 회사 OptiMax Partners의 CEO이자 수석 컨설턴트입니다. 다국적 기업에서 20년 가까이 일한 글로벌 HR 임원으로, 인재, 성과, 조직 혁신을 자문합니다.",
    career: [
      "OptiMax Partners CEO·수석 컨설턴트 (현재)",
      "Teva Pharmaceutical, AMD, Reckitt Benckiser, Dell Technologies, Bristol-Myers Squibb 등 다국적 기업 HR 리더 (약 20년)",
    ],
    education: [
      "University of Windsor MBA",
      "Society for Human Resource Management SHRM-SCP",
      "Birkman International 공인 Birkman 컨설턴트",
    ],
  },
  "sunghan-oh": {
    title: "CEO / 공동 창업자",
    specialties: "전략 HR 컨설팅, 임원 채용, 인재 채용, 글로벌 헤드헌팅",
    bio: "오성한은 'Global Talent Intelligent Partner'를 내세운 실리콘밸리의 전략 HR 컨설팅·글로벌 헤드헌팅 회사 EASE MusE의 CEO이자 공동 창업자입니다. 약 20년 동안 HR과 인재 채용 분야에서 일했으며, 대부분을 LG전자에서 인재 채용을 이끌며 보냈습니다. 전략 HR 컨설팅, 임원 채용, 글로벌 헤드헌팅을 전문으로 합니다.",
    career: [
      "EASE MusE CEO·공동 창업자 (2025–현재)",
      "Team of Wakers 프로그램 디렉터 (2025–현재)",
      "Offer Squirrel 인재 채용 전략 자문 (2025–현재)",
      "LG전자 인재 채용 디렉터 (2021–2024)",
      "LG전자 인재 채용 선임 매니저 (2004–2021)",
    ],
    education: ["University of Strathclyde 경제경영·정책 대학원 과정 (2003–2004)", "국민대학교"],
  },
  "andrew-radin": {
    title: "CEO (전)",
    specialties: "AI 기반 신약 개발, 의생명 정보학, 스타트업 멘토링·투자 유치",
    bio: "Andrew A. Radin은 Stanford 의생명 정보학 연구에서 출발해 2014년 설립한, AI로 신약을 개발하는 샌프란시스코 베이 지역 회사 Aria Pharmaceuticals(전 twoXAR)의 공동 창업자이자 CEO입니다. Stanford 액셀러레이터 StartX의 리드 멘토·자문이며 Inception Studio의 상주 자문으로도 활동하고 있습니다.",
    career: [
      "Aria Pharmaceuticals (전 twoXAR) CEO·공동 창업자 (2014–현재)",
      "StartX 리드 멘토·자문 (2015–현재)",
      "Stanford University School of Medicine 자문",
      "Inception Studio 상주 자문",
    ],
    education: [
      "Rochester Institute of Technology 컴퓨터공학 학사·석사",
      "Stanford University 의생명 정보학 대학원 과정",
    ],
  },
  "faye-sahai": {
    title: "글로벌 이노베이션 총괄 (전)",
    specialties: "헬스케어·보험·신기술 분야 혁신과 벤처 투자",
    bio: "Faye Karnavy Sahai는 헬스케어, 보험, 신기술 분야에서 25년 넘게 일한 혁신 리더이자 투자자입니다. Vinaj Ventures의 Managing Director로 Telosity Fund를 통해 디지털 헬스에 투자하고 있으며, 디지털 웰니스·정신 건강 분야 투자사 Telosity Ventures의 창립 Managing Partner입니다. AIG의 글로벌 이노베이션·디지털 비즈니스 총괄을 지냈고, 그 전에는 Kaiser Permanente, Blue Shield of California, Schwab, Deloitte Consulting에서 리더로 일했습니다.",
    career: [
      "Vinaj Ventures Managing Director",
      "Telosity Ventures 창립 Managing Partner",
      "AIG 글로벌 이노베이션·디지털 비즈니스 총괄",
      "Kaiser Permanente, Blue Shield of California, Schwab, Deloitte Consulting 혁신 담당",
    ],
    education: ["UCLA Anderson MBA", "Claremont McKenna College 학사", "Stanford University 프로젝트 관리 수료"],
  },
  "john-yang": {
    specialties: "성장 단계 테크 기업 투자",
    bio: "John Yang은 성장 단계 테크 기업에 투자하는 Riverwood Capital의 Vice President로 Menlo Park 사무소에서 일하고 있습니다. Riverwood 이전에는 지속 가능성·웰니스 성장 펀드인 Pegasus Capital Advisors의 Associate였고, 그 전에는 Bank of America Merrill Lynch에서 테크·소비재 M&A 투자 은행 업무를 했습니다.",
    career: [
      "Riverwood Capital Vice President",
      "Pegasus Capital Advisors Associate",
      "Bank of America Merrill Lynch 투자 은행 (테크·소비재 M&A)",
    ],
    education: ["Stanford University 경제학 학사 (우등)"],
  },
  "kenneth-ryu": {
    specialties: "투자·벤처 캐피털, AI 스타트업",
    bio: "유경환(Kenneth Ryu)은 샌프란시스코 베이 지역에서 여러 AI 모델을 연결해 멀티모달 애플리케이션을 만드는 노코드 AI 워크플로 자동화 플랫폼 CNAPS.AI의 COO로 일하고 있습니다. 이전에는 The Games Fund 등에서 벤처 캐피털 업무를 했습니다.",
    career: ["CNAPS.AI COO", "z-emotion CSO", "The Games Fund 벤처 캐피털 (이전)"],
    education: ["Tuck School of Business at Dartmouth College MBA (2008–2010)"],
  },
  "max-min": {
    specialties: "시드·초기 스타트업 투자, 액셀러레이팅, 한국–실리콘밸리 창업자 커뮤니티",
    bio: "민종현(Max Min)은 Santa Clara에 있는 글로벌 프로그래밍 교육·스타트업 커뮤니티 회사 멋쟁이사자처럼(LikeLion) USA의 미국 법인장이자 Managing Director입니다. 미국 진출과 실리콘밸리 프로그램을 이끌고, 투자와 액셀러레이팅으로 초기 스타트업을 지원합니다. 이전에는 퀀트 금융 분야에서 경력을 쌓았습니다.",
    career: [
      "LikeLion USA 미국 법인장·Managing Director (2021–현재)",
      "Lion Partners Managing Partner (2024–현재)",
      "신한은행 퀀트 포트폴리오 매니저",
      "한화생명 퀀트 연구원",
      "WorldQuant 퀀트 리서치 컨설턴트",
    ],
    education: ["University of Illinois at Urbana-Champaign 금융공학 석사", "고려대학교 컴퓨터학 학사"],
  },
  "michael-shim": {
    specialties: "벤처 운영, 전략, 투자 (Samsung Next)",
    bio: "심우찬(Michael Shim)은 삼성의 벤처 투자·스타트업 조직인 Samsung Next(샌프란시스코)의 벤처 운영·전략 총괄입니다. Samsung Next의 Chief of Staff와 삼성전자 제품 전략 매니저를 지냈고, 그 전에는 KPMG와 Boston Consulting Group에서 전략·운영 업무를 했습니다.",
    career: [
      "Samsung Next 벤처 운영·전략 총괄 / Chief of Staff",
      "삼성전자 제품 전략 매니저 (2019–2022)",
      "KPMG 시니어 어소시에이트 (2015–2019)",
      "The Boston Consulting Group 리서치 애널리스트 (2014)",
    ],
    education: ["University of California, Berkeley 통계학 학사"],
  },
  "will-glaser": {
    title: "CEO (전)",
    specialties: "투자 유치, 리테일 테크, 무인 결제·컴퓨터 비전, 핀테크",
    bio: "Will Glaser는 무인 결제(cashierless) 쇼핑 기술 회사 Grabango의 설립자이자 CEO입니다. Pandora Media의 공동 창업자로 첫 5년 동안 CTO와 COO를 맡았습니다(Pandora는 이후 약 35억 달러에 인수됐습니다). 엔젤 투자자이자 자문으로 활발히 활동하며 Blue Shield of California 이사회에서도 일하고 있습니다.",
    career: [
      "Grabango 설립자·CEO (2016–현재)",
      "Pandora Media 공동 창업자 / CTO / COO (2000–2005)",
      "Blue Shield of California 이사",
    ],
    education: ["Cornell University 컴퓨터공학·수학·물리학 학사 (삼중 전공)"],
  },
  "yinan-gu": {
    title: "임원 코치 (ICF PCC), 전 스타트업 창업자",
    specialties: "창업자와 글로벌 리더를 위한 임원·리더십 코칭, 다문화 리더십, 시장 진출과 B2B 세일즈, 커리어 성장, 투자 유치와 PMF 가이드",
    bio: "Yinan Gu는 실리콘밸리의 창업자와 글로벌 리더를 코칭하는 임원 코치(ICF PCC)이자 전 테크 스타트업 CEO입니다. 15년의 테크 경력 동안 6,500만 달러 이상의 글로벌 B2B 매출을 올렸고, Shark Tank China에서 150만 달러를 투자받았으며, 미국과 아시아에서 시장 진출을 처음부터 이끌었습니다. 지금은 이민자 출신 기술 창업자, 스타트업 임원, 테크 전문가에게 투자 유치, PMF, 리더십, 커리어 성장, 팀 신뢰, 다문화 커뮤니케이션을 코칭합니다. 실제 CEO 경험과 Stanford 창업 방법론, 데이터 기반 사고, 깊이 있는 코칭을 결합합니다.",
    career: [
      "Asian Leadership Center — Corporate Edge 창립 대표 (2024–현재), Palo Alto, CA",
      "Achungo Community Center 이사회 전략위원회 (2024–현재), Menlo Park, CA",
      "Stanford University — Stanford Thailand Research Consortium 창업 멘토 (2023–현재)",
      "Globaltech 임원 코치 (2020–현재), 유료 코칭 3,500시간 이상",
      "GLG 선임 클라우드 컴퓨팅 컨설턴트 (2015–현재)",
      "테크 스타트업 창업자·CEO (전), 글로벌 B2B 매출 6,500만 달러 이상, Shark Tank China에서 150만 달러 투자 유치",
    ],
    education: ["International Coaching Federation (ICF) Professional Certified Coach (PCC)"],
  },
  "andy-youngwook-ha": {
    specialties: "반도체, AI, 실리콘밸리–한국 간 투자",
    bio: "하영욱(Andy Youngwook Ha)은 실리콘밸리와 한국을 잇는 기술 혁신·투자 회사 Valley Innovation Partners의 창립 파트너로, 반도체와 AI 분야에 집중하고 있습니다.",
    career: ["Valley Innovation Partners 창립 파트너"],
    education: ["Business School Lausanne 경영학 박사 과정"],
  },
  "bj-kim": {
    title: "ADAS 엔지니어",
    specialties: "자율주행, ADAS·차량 제어 알고리즘",
    bio: "김병주(BJ Kim)는 Palo Alto에서 일하는 Rivian의 ADAS·자율주행 엔지니어입니다. 첨단 운전자 보조 시스템을 위한 차량 제어 알고리즘 분야에서 실무와 연구 경험을 쌓았으며, University of Michigan에서 공부했습니다.",
    career: ["Rivian ADAS·자율주행 엔지니어"],
    education: ["University of Michigan 기계공학 박사"],
  },
  "chanik-park": {
    specialties: "반도체(메모리·NAND), AI 데이터센터 시스템, 사업화",
    bio: "박찬익은 AI 데이터센터 효율을 높이는 DPU 기반 시스템 솔루션을 만드는 MangoBoost Inc.의 CCO(Chief Commercial Officer)입니다(2024년 12월 취임). 삼성전자 반도체 부문 임원(상무) 출신으로, 반도체 연구·혁신·사업화 분야에서 20년 넘게 일하며 NAND 상품기획 총괄과 DS부문 미주 총괄 VP 등을 맡았습니다.",
    career: ["MangoBoost Inc. CCO (2024–현재)", "삼성전자 반도체 부문 임원 (2002–2024)"],
    education: ["서울대학교 컴퓨터공학 학사·석사·박사"],
  },
  "hyunggi-cho": {
    specialties: "자율주행, ADAS, 컴퓨터 비전, 센서 퓨전",
    bio: "조형기 박사는 2017년 공동 창업한 자율주행·ADAS 소프트웨어 회사 Phantom AI, Inc.의 CEO입니다. Phantom AI 이전에는 Tesla Autopilot R&D 팀에서 컴퓨터 비전을 담당한 선임 제어 엔지니어였으며, 컴퓨터 비전, 센서 퓨전, 패턴 인식, 제어 분야의 기술 전문성을 갖추고 있습니다.",
    career: ["Phantom AI, Inc. CEO·공동 창업자 (2017–현재)", "Tesla 선임 제어 엔지니어 (Autopilot R&D)"],
    education: ["Carnegie Mellon University 자율주행·로보틱스 박사 (2010–2014)"],
  },
  "luciana-frazao": {
    title: "Beer Garage 실리콘밸리 총괄 (전)",
    specialties: "소비재, 기업 벤처링과 혁신",
    bio: "Luciana Frazão는 샌프란시스코에서 활동하는 기술·혁신 경영자로, AB InBev의 실리콘밸리 혁신 연구소 Beer Garage에서 글로벌 이노베이션 매니저로 일했습니다. Fluence(Fluence Insights / Fluence.AI)의 설립자이자 CEO이며, Alchemist Accelerator, StartX, StartSe University 등 스타트업 액셀러레이터에서 경험을 쌓았습니다. 소비재와 기업 벤처링·혁신을 주로 다룹니다.",
    career: [
      "Fluence Insights / Fluence.AI Inc 설립자·CEO",
      "AB InBev Beer Garage 글로벌 이노베이션 매니저",
      "Alchemist Accelerator, StartX, StartSe University",
    ],
    education: [],
  },
  "michael-rosen": {
    specialties: "재무, 운영, Chief of Staff·구매 컨설팅, 전략 기획, 데이터 분석(OKR·KPI), 프로세스 개선, 프로그램 관리, 기술 소싱·최적화, 조직 전략",
    bio: "Mike Rosen은 The Rosen Group의 Managing Director로, 전략 기획, 데이터 분석(OKR·KPI), 프로세스 개선, 프로그램 관리, 기술 선정·최적화, 조직 전략을 통해 리더들이 좋은 회사를 만들도록 돕고 있습니다. Synapse에서 다진 부서 간 프로젝트와 프로그램 관리를 전문으로 하며, 고객 운영과 회사 목표를 연결하고 제조·고객 운영 프로세스를 개선해 왔습니다.",
    career: [
      "The Rosen Group Managing Director (2024–현재), Palo Alto, CA",
      "Vici Partners Managing Director (2025–현재), SF Bay Area",
      "Corel Corporation 임시 구매 담당 (계약직) (2025–2026)",
      "Synapse 운영 VP (2023–2024)",
      "Synapse CEO 비서실장(Chief of Staff) (2021–2023)",
      "Gap Inc. 기술 소싱 총괄 (2017–2021)",
    ],
    education: [],
  },
  "pyeongwoo-yeon": {
    title: "엔지니어",
    specialties: "스마트 기기·스마트 글래스, 웨어러블 전자 기기, 아날로그 IC 설계",
    bio: "연평우 박사는 아날로그·혼성 신호 IC 설계, 무선 전력·데이터 전송, 의료·이식형 시스템 분야에서 15년 넘게 일한 전기 엔지니어입니다. Apple Watch와 Meta Neural Band 등 웨어러블 엔지니어링을 맡아 왔으며, Apple, Stanford, 삼성전자에서 일했습니다.",
    career: [
      "Meta Platforms 웨어러블 전기 엔지니어",
      "Apple",
      "Stanford University 박사후 연구원",
      "삼성전자 아날로그 IC 설계 (2012–2014)",
    ],
    education: [
      "Georgia Institute of Technology 전기·컴퓨터공학 박사 (2019)",
      "University of Tokyo 전기공학·정보시스템 석사 (2012)",
      "서울대학교 전기·컴퓨터공학 학사 (2010)",
    ],
  },
  "rohit-tripathi": {
    title: "이노베이션 총괄",
    specialties: "통신, 기업 혁신",
    bio: "Rohit Tripathi는 VU Capital과 함께하는 기술·혁신 경영자로, 신기술, 통신, 인터넷 인프라 분야에서 약 20년의 경험을 쌓았습니다. 이전에는 Hughes 계열사에서 엔지니어로 일했으며, 통신과 기업 혁신 분야를 주로 다룹니다.",
    career: ["VU Capital 이노베이션 총괄", "Hughes (Hughes Communications) 시스템 엔지니어링"],
    education: ["University of Maryland 전기공학"],
  },
  "steve-song": {
    title: "설립자",
    specialties: "큐레이션 네트워킹·매칭 플랫폼, 세일즈와 사업 개발",
    bio: "Steve Song은 큐레이션 네트워킹·매칭 플랫폼 RainMatch(Rainmakers)의 설립자입니다. 샌프란시스코 베이 지역에서 활동하는 글로벌 세일즈·사업 개발 임원입니다.",
    career: ["RainMatch / Rainmakers 설립자"],
    education: [],
  },
  "sungjun-maing": {
    title: "엔지니어",
    specialties: "모빌리티, 전기차 품질 보증·엔지니어링, 실리콘밸리 테크 인사이트",
    bio: "맹성준은 Tesla 등에서 13년 넘게 프로젝트 관리와 제품 경험을 쌓은 기계 엔지니어입니다. 실리콘밸리 엔지니어의 시각으로 전기차, AI, 최신 테크를 다루는 유튜브 채널 Drive Tech Odyssey를 운영하고 있으며, 전기차를 더 저렴하게 만드는 방안을 주제로 업계 포럼에서 발표했습니다.",
    career: ["유튜브 채널 Drive Tech Odyssey 운영", "Tesla 엔지니어"],
    education: ["연세대학교 기계공학"],
  },
  "yeonhee-doh": {
    specialties: "K-Food, FDA·식품 수입 규정",
    bio: "도연희는 캘리포니아 Sacramento에 있는 iFoodLink LLC의 CEO로, 한국 식품(K-Food)과 FDA 관련 업무에 전문성이 있습니다.",
    career: ["iFoodLink LLC CEO·매니저, Sacramento, CA (2025–현재)"],
    education: [],
  },
  "cj-na": {
    specialties: "모빌리티, 응용 AI (LLM 에이전트, RAG, 워크플로 자동화)",
    bio: "나찬종(CJ Na)은 자동차 정비소를 위한 AI 코파일럿과 운영 레이어를 만드는 스타트업 Carvis AI의 공동 창업자이자 CTO입니다. LLM 에이전트, RAG·검색, 워크플로 자동화 등 실서비스 수준의 AI 기능을 개발하며, Carvis 이전에는 자율주행 회사 Cruise에서 엔지니어로 일했습니다.",
    career: ["Carvis AI 공동 창업자·CTO", "Cruise 엔지니어", "Antler / 스텔스 스타트업"],
    education: ["University of Michigan 컴퓨터공학 학사 (2016–2019)"],
  },
  "grace-han": {
    specialties: "정보 보안 (MDR·XDR, AI 기반 SOC, 보안 자동화)",
    bio: "한은혜(Grace Han)는 기업, 금융, 제조, 통신, 반도체 고객에게 보안 소프트웨어를 제공하는 한국 정보 보안 회사 SSNC Co., Ltd.의 설립자이자 CEO입니다. Granada Vista Inc.와 함께 일하고 있으며, SSNC와 Granada Vista는 샌프란시스코 RSAC 2026 한국관에 참가했습니다. MDR·XDR, 보안 자동화, AI 기반 SOC, 글로벌 사이버 보안 파트너십을 주로 다룹니다.",
    career: ["SSNC Co., Ltd. 설립자·CEO", "Granada Vista Inc."],
    education: [],
  },
  "hobin-kim": {
    specialties: "모빌리티, AI (컴퓨터 비전, 주차 기술)",
    bio: "김호빈은 파편화된 주차 기술 시장의 문제를 풀기 위해 2024년 설립한 ParkingAI, Inc.(OcuAI Inc. 운영)의 공동 창업자이자 CEO입니다. 일반 보안 카메라에 여러 단계의 AI를 더해 번호판 인식, 실시간 주차 점유 감지, 객체 감지를 제공합니다. Parking Industry Expo의 Accelerate! 등 주차 업계 피칭 대회에서 발표했습니다.",
    career: ["ParkingAI, Inc. / OcuAI Inc. 공동 창업자·CEO (2024–현재)"],
    education: ["California State University MBA"],
  },
  "ikjoo-hyun": {
    specialties: "실시간 사람 대 사람(피어) 대화 지원·감정 매칭 플랫폼",
    bio: "현익주는 실시간 1:1 대화와 정서 지원 플랫폼을 운영하는 서울의 스타트업 주식회사 썸아더플레이스(Some Other Place)의 대표입니다. 대표 서비스 'Hug'는 2022년 7월 출시한 온디맨드 1:1 대화 서비스로, 2024년 10월 북미로 진출했습니다. 2024년 Google Launchpad에 선정됐습니다.",
    career: [
      "주식회사 썸아더플레이스 대표, 1:1 음성 대화·피어 지원 플랫폼 'Hug' (2022–현재)",
      "원프레딕트 성장전략팀장 (2021–2022)",
      "Strategy& (PwC) 경영 전략 컨설턴트 (2020–2021)",
      "엔트루컨설팅 (LG CNS) 경영 전략 컨설턴트 (2017–2020)",
    ],
    education: ["서울대학교 (2007–2013)", "서울대학교 대학원 (2013–2016)"],
  },
  "jeongsuh-choi": {
    specialties: "소상공인·다이렉트 리스폰스 마케팅과 AI",
    bio: "최정서는 Y Combinator W22 기업 Bobidi, Inc.(Upswell by Bobidi 운영)의 공동 창업자이자 CEO입니다. 서울 출신으로 지금은 베이 지역에서 일하며, 경력 전반부에는 스타트업을 창업해 마지막 회사를 매각했고, 후반부에는 eBay와 Facebook에서 프로덕트 매니저로 일했습니다. Bobidi는 2023년 Forbes Korea의 '빠르게 성장하는 스타트업 50'에 선정됐습니다.",
    career: [
      "Bobidi, Inc. / Upswell 공동 창업자·CEO (YC W22)",
      "Facebook 프로덕트 매니저",
      "eBay 프로덕트 매니저",
    ],
    education: ["Tuck School of Business at Dartmouth MBA", "Washington State University", "고려대학교"],
  },
  "jiwon-hong": {
    specialties: "패션 AI (비주얼 검색, ML 기반 추천·탐색)",
    bio: "홍지원은 온라인 리테일러를 위해 패션에 특화된 비주얼 검색과 상품 탐색·추천 기술을 만드는 B2B 패션 AI 플랫폼 YesPlz AI의 공동 창업자이자 CEO입니다. YesPlz 이전에는 삼성전자에서 스마트 TV 프로덕트 매니저로 일했고, Sony에서도 일했으며, 검색·추천 분야 스타트업을 창업한 경험이 있습니다.",
    career: ["YesPlz AI 공동 창업자·CEO", "삼성전자 프로덕트 매니저 (스마트 TV)", "Sony"],
    education: ["성균관대학교 경영전문대학원(SKK GSB) MBA (2007)"],
  },
  "luke-ahn": {
    specialties: "3D 캐릭터·애니메이션용 생성형 AI",
    bio: "안성호(Luke Sungho Ahn)는 3D 콘텐츠 제작에 생성형 AI를 적용하는 샌프란시스코 베이 지역 스타트업 Claythis의 공동 창업자이자 CEO입니다. Claythis는 메시, 텍스처, 포즈, 리깅, 모션까지 포함한 3D 캐릭터와 애니메이션을 생성하는 AI 시스템을 만듭니다.",
    career: ["Claythis 공동 창업자·CEO"],
    education: [
      "UC Berkeley – Haas School of Business MBA",
      "서울대학교 고고미술사학·경영학 학사 (우등)",
    ],
  },
  "peter-jung": {
    specialties: "AI, IoT, 클라우드, API 연동·노코드 자동화",
    bio: "Peter Jung은 SaaS·AI·앱 회사가 Salesforce, HubSpot, Jira, Google, Microsoft 등과의 네이티브 연동과 사용자 정의 자동화를 추가할 수 있게 해 주는 인앱 자동화·AI·앱 연동 플랫폼 Interactor(Sunnyvale, CA)의 공동 창업자이자 경영진입니다.",
    career: ["Interactor 공동 창업자·CPO"],
    education: ["University of New South Wales (UNSW)", "Monash University", "서울대학교 (2001–2003)"],
  },
  "philip-yun": {
    title: "공동 창업자",
    specialties: "마케팅·소비자 인사이트 소프트웨어와 프로덕트 매니지먼트",
    bio: "윤정섭(Philip Yun)은 기업과 고객을 연결해 실시간 소비자 인사이트를 얻게 해 주는 정성 비디오 리서치 플랫폼 methinks Technologies Inc.의 공동 창업자이자 CPO입니다. 2015년 Wilson Li와 함께 회사를 세웠으며, 게임 업계 출신으로 북미에서 무료 멀티플레이 게임을 개척하는 데 기여했습니다. methinks는 이후 Nexon에 인수됐습니다.",
    career: [
      "methinks Technologies Inc 공동 창업자·CPO (2015–현재)",
      "OutSpark / Sony / NHN 제품·경영",
    ],
    education: ["서울대학교"],
  },
  "sangho-um": {
    specialties: "생산성, AI 기반 추천 채용 플랫폼",
    bio: "엄상호는 신뢰할 수 있는 추천을 통해 스타트업이 인재를 채용하도록 돕고, 추천한 사람이 채용되면 추천인에게 보상하는 캘리포니아의 AI 플랫폼 yourly의 설립자입니다. yourly 창업 전에는 Uber와 링글(Ringle)에서 일했습니다.",
    career: ["yourly 설립자", "Uber", "링글 (Ringle)"],
    education: ["University of Michigan – Stephen M. Ross School of Business MBA (2016–2019)"],
  },
  "suyeon-lee": {
    specialties: "반려동물 시장, 디지털 헬스 (수의 AI)",
    bio: "이수연(Sue Suyeon Lee)은 AI를 반려동물 케어에 적용하는 수의·반려동물 디지털 헬스 회사 PawMind의 CEO입니다. 수의사(DVM)이자 전 Google 직원이며, PawMind는 실리콘밸리의 Google 출신 수의사와 Stanford 박사후 연구원이 함께 세웠습니다.",
    career: ["PawMind CEO", "Google (전)"],
    education: ["수의학 박사 (DVM)"],
  },
  "yh-jeong": {
    specialties: "AI 기계 번역, 자막, 더빙, 실시간 캡션",
    bio: "정영훈(Tim Jung)은 미디어·엔터테인먼트에 최적화된 기계 번역과 현지화를 전문으로 하는 AI 회사 XL8의 공동 창업자이자 CEO입니다. XL8은 2019년 설립됐으며 San Jose 본사와 서울, LA 사무소를 두고 있습니다. 이전에는 Google에서 NLP 기반 검색을 담당한 소프트웨어 엔지니어이자 테크 리드·매니저였고, 삼성전자에서 Tizen을 출시한 UI 프레임워크 팀을 이끌었습니다.",
    career: [
      "XL8 공동 창업자·CEO (2019–현재)",
      "Google 소프트웨어 엔지니어 / 테크 리드·매니저",
      "삼성전자 UI 프레임워크 팀장",
    ],
    education: ["Columbia University 컴퓨터공학 박사"],
  },
};

/** The advisor with the Korean text on Korean pages; other languages get the profile as it is. */
export function localizeAdvisor<T extends AdvisorProfile>(advisor: T, lang: string): T {
  const ko = lang === "ko" ? advisorProfilesKo[advisor.slug] : undefined;
  return ko ? { ...advisor, ...ko } : advisor;
}
