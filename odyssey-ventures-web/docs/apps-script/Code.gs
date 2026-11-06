/**
 * Odyssey Ventures — website submissions receiver (Google Apps Script).
 *
 * Paste this into Extensions → Apps Script of the operations Google Sheet.
 * It appends every website form to the matching tab and emails the operator.
 * Setup steps: docs/operations.md, section 2.
 */

// Same value as SUBMISSIONS_WEBHOOK_SECRET in Vercel. Set it in Project Settings → Script properties.
const SECRET = PropertiesService.getScriptProperties().getProperty('SUBMISSIONS_WEBHOOK_SECRET');
// Who receives the "new submission" email. Separate several addresses with commas.
const NOTIFY_EMAIL = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
// Set to "true" to also send the visitor a short "we received it" email.
const SEND_CONFIRMATION = PropertiesService.getScriptProperties().getProperty('SEND_CONFIRMATION') === 'true';

// Column order per tab. New columns can be added at the end; never rename or reorder existing ones.
const COLUMNS = {
  Registrations: ['submittedAt', 'lang', 'programId', 'programTitle', 'programDate', 'name', 'email', 'company', 'question', 'status', 'linkSent', 'memo'],
  AdvisoryRequests: ['submittedAt', 'lang', 'name', 'email', 'company', 'stage', 'field', 'preferredExpert', 'schedule', 'request', 'status', 'matchedExpert', 'paymentLink', 'paid', 'refunded', 'memo'],
  Inquiries: ['submittedAt', 'lang', 'page', 'interest', 'name', 'email', 'company', 'message', 'status', 'memo'],
};

const SUBJECTS = {
  Registrations: '[웹사이트] 강의 참가 신청',
  AdvisoryRequests: '[웹사이트] 1:1 자문 신청',
  Inquiries: '[웹사이트] 문의',
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (!SECRET || data.secret !== SECRET) return reply({ ok: false, error: 'unauthorized' });
    const columns = COLUMNS[data.sheet];
    if (!columns) return reply({ ok: false, error: 'sheet' });

    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(data.sheet) || book.insertSheet(data.sheet);
    if (sheet.getLastRow() === 0) sheet.appendRow(columns);

    const values = Object.assign({ submittedAt: data.submittedAt, lang: data.lang, page: data.page, status: 'new' }, data.fields);
    // A leading apostrophe keeps text like "=1+1" from being read as a formula.
    sheet.appendRow(columns.map(function (key) {
      const value = values[key] == null ? '' : String(values[key]);
      return /^[=+\-@]/.test(value) ? "'" + value : value;
    }));

    if (NOTIFY_EMAIL) {
      const lines = Object.keys(data.fields).map(function (key) { return key + ': ' + data.fields[key]; });
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: data.fields.email,
        subject: SUBJECTS[data.sheet] + ' — ' + (data.fields.name || ''),
        body: lines.join('\n') + '\n\n시트: ' + book.getUrl(),
      });
    }

    if (SEND_CONFIRMATION && data.fields.email) {
      const ko = data.lang !== 'en';
      MailApp.sendEmail({
        to: data.fields.email,
        subject: ko ? '[Odyssey Ventures] 접수되었습니다' : '[Odyssey Ventures] We received your submission',
        body: ko
          ? (data.fields.name || '') + '님, 오디세이 벤처스입니다.\n보내 주신 내용이 접수되었습니다. 확인 후 이 메일 주소로 연락드리겠습니다.\n\nOdyssey Ventures\ncontact@odysseyventures.llc'
          : 'Hi ' + (data.fields.name || '') + ',\nThank you. We received your submission and will reply to this address.\n\nOdyssey Ventures\ncontact@odysseyventures.llc',
      });
    }

    return reply({ ok: true });
  } catch (error) {
    return reply({ ok: false, error: String(error) });
  }
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
