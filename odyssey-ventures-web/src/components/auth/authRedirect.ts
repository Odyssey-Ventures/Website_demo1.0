/** Where emailed auth links (sign-up confirmation, magic link, password reset) return to. */
export function authCallbackUrl(next: string): string {
  return `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}`;
}

export const MIN_PASSWORD_LENGTH = 8;
