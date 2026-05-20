export const AUTH_UNAUTHORIZED_EVENT = "natura:auth-unauthorized";

const PUBLIC_AUTH_PATHS = ["/auth/login", "/auth/register"];

export function isPublicAuthPath(path = window.location.pathname) {
  return PUBLIC_AUTH_PATHS.includes(path);
}

export function emitAuthUnauthorized() {
  window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
}
