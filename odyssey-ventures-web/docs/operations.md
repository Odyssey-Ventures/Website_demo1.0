# 웹사이트 운영 가이드

개발자가 아니어도 이 문서만 보고 웹사이트를 운영할 수 있도록 정리했습니다.
웹사이트의 신청·문의는 **Google 스프레드시트(운영 시트)** 한 곳에 모이고, 강의 일정도 같은 시트에서 관리합니다.

## 1. 한눈에 보기

| 하고 싶은 일 | 어디서 | 반영 시간 |
| --- | --- | --- |
| 강의·웨비나 추가, 수정, 마감 | 운영 시트 `Programs` 탭 | 최대 5분 |
| 강의 신청자 확인, 접속 링크 발송 | 운영 시트 `Registrations` 탭 + 메일 | 즉시 |
| 1:1 자문 신청 확인, 전문가 매칭, 결제 링크 발송 | 운영 시트 `AdvisoryRequests` 탭 | 즉시 |
| 문의 확인 (컨설팅, 액셀러레이터, 멤버십, 일반) | 운영 시트 `Inquiries` 탭 | 즉시 |
| 화면 문구 수정 | `src/messages/ko.json`, `en.json` (개발자) | 배포 후 |
| 1:1 미팅 자문단 추가·수정 | `src/data/advisor-profiles.ts` (개발자) | 배포 후 |
| 1:1 미팅 결제 링크·요금 변경 | Vercel 환경 변수 (6장) | 다시 배포 후 |
| 뉴스룸 글 쓰기·수정·삭제, 댓글 숨김·삭제 | 사이트 `소식 → 뉴스룸` (회사 이메일로 로그인) | 즉시 |
| 고객센터 문의 답변, 상태 변경 | 사이트 `소식 → 고객센터` (회사 이메일로 로그인) | 즉시 |
| 자주 하는 질문 수정 | `src/messages/ko.json`, `en.json`의 `faqPage` (개발자) | 배포 후 |

새 신청이 들어오면 운영자 이메일로 알림이 갑니다.

## 2. 처음 한 번만: 운영 시트 연결

연결 전에는 웹사이트의 모든 폼이 **방문자의 이메일 앱을 열어** contact@odysseyventures.llc로 보내는 방식으로 동작합니다. 연결하면 자동 저장으로 바뀝니다.

1. 회사 Google 계정으로 새 스프레드시트를 만듭니다. 이름 예: `Odyssey 웹사이트 운영`.
2. 탭 4개를 만듭니다: `Programs`, `Registrations`, `AdvisoryRequests`, `Inquiries`.
   - `Programs` 첫 줄에는 아래 3번의 열 이름을 그대로 적습니다.
   - 나머지 세 탭은 비워 두면 첫 신청 때 열 이름이 자동으로 생깁니다.
3. 메뉴 **확장 프로그램 → Apps Script**를 엽니다.
   - 기본 코드를 지우고 `docs/apps-script/Code.gs` 내용을 붙여 넣고 저장합니다.
   - 왼쪽 **프로젝트 설정(톱니바퀴) → 스크립트 속성**에 아래 값을 추가합니다.

     | 속성 | 값 |
     | --- | --- |
     | `SUBMISSIONS_WEBHOOK_SECRET` | 아무도 모르는 긴 문자열 (예: 비밀번호 생성기로 만든 32자) |
     | `NOTIFY_EMAIL` | 알림 받을 운영자 이메일 (여러 명이면 쉼표로 구분) |
     | `SEND_CONFIRMATION` | 신청자에게 접수 확인 메일을 보내려면 `true` |

4. 오른쪽 위 **배포 → 새 배포 → 유형: 웹 앱**을 고릅니다.
   - 실행 사용자: **나**, 액세스 권한: **모든 사용자**로 설정하고 배포합니다.
   - 처음 배포할 때 권한 승인 창이 뜨면 승인합니다.
   - 나오는 **웹 앱 URL**을 복사합니다.
5. 시트에서 **파일 → 공유 → 웹에 게시**를 엽니다.
   - `Programs` 탭, 형식 **쉼표로 구분된 값(.csv)**으로 게시하고 링크를 복사합니다.
   - 이 링크로는 `Programs` 탭만 공개됩니다. 신청자 정보가 있는 다른 탭은 게시하지 마세요.
6. Vercel → 프로젝트 → **Settings → Environment Variables**에 세 값을 넣고 다시 배포합니다.

   | 이름 | 값 |
   | --- | --- |
   | `SUBMISSIONS_WEBHOOK_URL` | 4번의 웹 앱 URL |
   | `SUBMISSIONS_WEBHOOK_SECRET` | 3번에 넣은 것과 같은 문자열 |
   | `PROGRAMS_CSV_URL` | 5번의 CSV 링크 |

7. 웹사이트 문의 폼에서 테스트로 한 번 보내 보고, `Inquiries` 탭에 한 줄이 생기고 알림 메일이 오는지 확인합니다.

> Apps Script 코드를 고친 뒤에는 **배포 → 배포 관리 → 수정 → 새 버전**으로 다시 배포해야 반영됩니다. URL은 그대로입니다.

## 3. 강의·웨비나 관리 (`Programs` 탭)

한 줄이 강의 하나입니다. 첫 줄의 열 이름은 바꾸지 마세요.

| 열 | 쓰는 법 | 예 |
| --- | --- | --- |
| `id` | 주소에 쓰이는 영문 이름. 공백 없이, 다른 강의와 겹치지 않게 | `pm-webinar-2026-11` |
| `status` | `published`면 공개, 그 외(`draft` 등)는 숨김 | `published` |
| `type` | `webinar` 또는 `course` | `webinar` |
| `title_ko`, `title_en` | 제목. 영어를 비우면 한국어가 쓰임 | |
| `date` | **YYYY-MM-DD** 형식 | `2026-11-12` |
| `start_time`, `end_time` | 24시간 형식 | `17:00` |
| `timezone` | 시간 옆에 표시할 글자 | `PT` 또는 `KST` |
| `instructor` | 강사 이름 | `Okkeun Lee` |
| `format` | 진행 방식 | `Zoom` |
| `capacity` | 정원 (숫자만, 비워도 됨) | `50` |
| `summary_ko`, `summary_en` | 목록에 보이는 한두 줄 소개 | |
| `description_ko`, `description_en` | 상세 설명. 셀 안 줄바꿈(Ctrl+Enter / ⌘+Enter)이 문단 나눔 | |
| `registration_open` | 신청을 막으려면 `FALSE` | `TRUE` |

- 날짜가 지나면 자동으로 "지난 강의"로 옮겨지고 신청이 닫힙니다.
- 정원이 차면 `registration_open`을 `FALSE`로 바꾸세요. (자동 마감은 아직 없습니다.)
- 시트가 연결되지 않은 미리보기 사이트에는 `[예시]` 강의가 노란 안내문과 함께 보입니다. 실제 사이트에는 표시되지 않습니다.

## 4. 신청 처리

모든 신청 탭에는 `status` 열이 있습니다. 처음에는 `new`이고, 처리하면서 직접 바꿉니다.

**강의 신청 (`Registrations`)**

1. 행사 전에 `email` 열의 주소로 Zoom/Meet 링크를 보냅니다.
2. 보낸 줄은 `linkSent` 열에 표시합니다.

**1:1 자문 신청 (`AdvisoryRequests`)** — 요청 확인 → 결제 → 서비스 순서를 지킵니다.

1. `request` 열을 읽고 진행 가능한지 확인합니다. 필요하면 신청자에게 추가로 묻습니다. `status`: `reviewing`
2. 전문가 명단에서 적합한 사람을 찾아 `matchedExpert`에 적습니다. `status`: `matched`
3. 가격이 정해진 뒤부터: Stripe에서 결제 링크를 만들어 신청자에게 보내고 `paymentLink`에 적습니다. `status`: `awaiting_payment`
4. Stripe 대시보드에서 결제를 확인하면 `paid`에 표시하고 일정을 잡습니다. `status`: `scheduled`
5. 자문이 끝나면 `status`: `done`. 환불했다면 `refunded`에 표시합니다.

> 가격, 환불 조건, 환불 문구는 아직 확정 전입니다. 확정되기 전에는 결제 링크를 보내거나 환불 조건을 안내하지 마세요.

**문의 (`Inquiries`)**: `interest` 열로 컨설팅·액셀러레이터·멤버십·기타를 구분합니다. 회신 후 `status`를 `replied`로 바꿉니다.

## 5. 뉴스룸·고객센터 (Supabase)

뉴스룸과 고객센터 게시판은 **Supabase**(데이터베이스 + 이메일 로그인)에 저장됩니다.
로그인은 비밀번호 없이, 이메일로 받은 링크를 누르는 방식입니다.

**직원 권한**: `@odysseyventures.llc` 이메일로 로그인한 사람이 직원입니다. 직원만 뉴스룸 글을 쓰고, 댓글을 숨기거나 지우고, 고객센터의 모든 문의를 보고 답변할 수 있습니다.
이 규칙은 데이터베이스 자체(행 수준 보안)에 걸려 있어서, 화면을 우회해도 바뀌지 않습니다.

### 5-1. 처음 한 번만: 연결

1. [supabase.com](https://supabase.com)에서 회사 계정으로 새 프로젝트를 만듭니다 (리전은 West US 권장).
2. **SQL Editor**에서 `supabase/migrations/0001_newsroom_and_support.sql` 내용을 붙여 넣고 실행합니다. 여러 번 실행해도 안전합니다.
3. **Authentication → URL Configuration**
   - Site URL: 실제 사이트 주소 (예: `https://www.odysseyventures.llc`)
   - Redirect URLs: `https://<사이트 주소>/api/auth/callback` 를 추가합니다. Vercel 미리보기에서도 쓰려면 `https://*-<팀이름>.vercel.app/api/auth/callback` 도 추가합니다.
4. **Authentication → Providers → Email**이 켜져 있는지 확인합니다. 기본 메일 발송은 시간당 몇 통으로 제한되므로, 운영 전에 **Authentication → SMTP Settings**에서 회사 메일(SMTP)을 연결하는 것을 권장합니다.
5. **Project Settings → API**의 `Project URL`과 `anon public` 키를 Vercel 환경 변수 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 넣고 다시 배포합니다. (`service_role` 키는 절대 넣지 마세요.)

### 5-2. 뉴스룸 운영

- 회사 이메일로 로그인하면 뉴스룸에 **글쓰기** 버튼이 보입니다. 주소(슬러그)는 영문 소문자·숫자·하이픈만 씁니다.
- 편집 화면의 **공개**를 끄면 직원에게만 보이고(초안), 켜면 모두에게 보입니다.
- 댓글은 이메일로 로그인한 누구나 쓸 수 있습니다. 직원은 각 댓글의 **숨기기 / 삭제**로 관리합니다. 숨긴 댓글은 작성자와 직원에게만 보입니다.

### 5-3. 고객센터 운영

- 방문자는 이메일로 로그인한 뒤 비공개 문의를 남깁니다. 목록에는 분류·상태·날짜만 보이고, 제목과 내용은 **작성자 본인과 직원만** 볼 수 있습니다.
- 새 문의가 들어오면 운영 시트 연결(2장)이 되어 있는 경우 `Inquiries` 탭(관심 분야 `support`)과 알림 메일로 제목과 링크가 옵니다. 내용은 사이트에서 확인합니다.
- 직원이 답변을 달면 상태가 **답변 완료**로 바뀝니다. 작성자가 추가 질문을 달면 다시 **답변 대기**가 됩니다. 처리가 끝나면 **종료**로 바꿉니다.
- 답변이 달렸다는 메일 알림은 아직 자동 발송되지 않습니다. 필요하면 작성자 이메일(문의 상세에 표시)로 직접 알려 주세요.

## 6. 1:1 미팅 결제 버튼

자문위원 페이지의 **미팅 신청** 탭에 비회원과 기본 등급 회원용 결제 버튼이 있습니다. 상위 등급 회원은 결제 없이 신청서만 보내도록 안내합니다.
버튼은 외부 결제 페이지로 연결됩니다. 가장 간단한 방법은 **Stripe Payment Link**입니다.

1. Stripe 대시보드 → **Payment Links**에서 비회원용, 기본 회원용 링크를 하나씩 만듭니다 (상품명 예: "1:1 자문 미팅 (비회원)").
2. Vercel 환경 변수에 넣고 다시 배포합니다.

| 변수 | 내용 | 예시 |
| --- | --- | --- |
| `ADVISORY_PAYMENT_URL_GUEST` | 비회원 결제 링크 | `https://buy.stripe.com/...` |
| `ADVISORY_PAYMENT_URL_MEMBER` | 기본 등급 회원 결제 링크 | `https://buy.stripe.com/...` |
| `ADVISORY_PRICE_GUEST` | 버튼에 보일 비회원 요금 (선택) | `$150 / 45분` |
| `ADVISORY_PRICE_MEMBER` | 버튼에 보일 회원 요금 (선택) | `$100 / 45분` |

- 링크가 없으면 버튼은 "결제 준비 중"으로 보이고, 신청자에게 이메일로 결제 방법을 안내하라는 문구가 나옵니다.
- Stripe 링크에는 자문위원 주소(예: `andrew-y-jin`)가 `client_reference_id`로 붙어서, Stripe 결제 내역에서 어느 자문위원 미팅인지 알 수 있습니다.
- 지금은 회원 등급을 사이트에서 확인하지 않습니다. 회원용 결제가 들어오면 신청자가 회원인지 확인한 뒤 일정을 확정해 주세요.
- 결제는 일정 확정 후 받는 것이 원칙입니다(사이트 안내 문구 기준). 확정 메일에도 같은 결제 링크를 넣어 주세요.

## 7. 문제가 생겼을 때

| 증상 | 확인할 것 |
| --- | --- |
| 폼을 보내면 이메일 앱이 열림 | Vercel 환경 변수 `SUBMISSIONS_WEBHOOK_URL`, `SUBMISSIONS_WEBHOOK_SECRET`이 있는지, 넣은 뒤 다시 배포했는지 |
| "전송하지 못했습니다" 오류 | Apps Script 스크립트 속성의 비밀 문자열이 Vercel 값과 같은지, 웹 앱 액세스가 "모든 사용자"인지 |
| 강의가 사이트에 안 보임 | `status`가 `published`인지, `date` 형식, 5분 기다렸는지, CSV 게시가 켜져 있는지 |
| 알림 메일이 안 옴 | 스크립트 속성 `NOTIFY_EMAIL`, Gmail 스팸함 |
| 뉴스룸이 "준비 중"으로 보임 | Vercel 환경 변수 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`가 있는지, 넣은 뒤 다시 배포했는지 |
| 로그인 링크를 눌렀는데 오류 | Supabase Redirect URLs에 `/api/auth/callback` 주소가 있는지, 링크가 만료되지 않았는지(1시간) |
| 로그인 메일이 안 옴 | 스팸함, Supabase 기본 메일 발송 한도 (SMTP 연결 권장) |
| 회사 이메일인데 글쓰기 버튼이 없음 | 로그인한 주소가 정확히 `@odysseyventures.llc`로 끝나는지 |
