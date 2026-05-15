export const HAS_API_URL = Boolean(
  String(import.meta.env.VITE_API_URL ?? "").trim()
);

export const USE_MOCK_DASHBOARD =
  import.meta.env.VITE_USE_MOCK_DASHBOARD === "true";