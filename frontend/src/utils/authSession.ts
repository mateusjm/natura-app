export const AUTH_UNAUTHORIZED_EVENT = "natura:auth-unauthorized";

export function emitAuthUnauthorized() {
  window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
}
