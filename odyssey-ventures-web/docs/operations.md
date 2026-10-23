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
| 자문단 명단 수정 | `src/data/advisors.ts` (개발자) | 배포 후 |
| 소식(News) 글 추가 | `src/data/news.ts` (개발자) | 배포 후 |

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

## 5. 문제가 생겼을 때

| 증상 | 확인할 것 |
| --- | --- |
| 폼을 보내면 이메일 앱이 열림 | Vercel 환경 변수 `SUBMISSIONS_WEBHOOK_URL`, `SUBMISSIONS_WEBHOOK_SECRET`이 있는지, 넣은 뒤 다시 배포했는지 |
| "전송하지 못했습니다" 오류 | Apps Script 스크립트 속성의 비밀 문자열이 Vercel 값과 같은지, 웹 앱 액세스가 "모든 사용자"인지 |
| 강의가 사이트에 안 보임 | `status`가 `published`인지, `date` 형식, 5분 기다렸는지, CSV 게시가 켜져 있는지 |
| 알림 메일이 안 옴 | 스크립트 속성 `NOTIFY_EMAIL`, Gmail 스팸함 |
