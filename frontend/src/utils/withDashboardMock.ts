import { HAS_API_URL, USE_MOCK_DASHBOARD } from "@/config/env";
import axios from "axios";

const DASHBOARD_API_TIMEOUT_MS = 5000;

/** Só nesta aba: evita várias tentativas seguidas quando a API está fora. */
let apiMarkedDown = false;

export function isDashboardMockImmediate(): boolean {
  return USE_MOCK_DASHBOARD || !HAS_API_URL || apiMarkedDown;
}

export function clearDashboardApiDown(): void {
  apiMarkedDown = false;
}

function markApiDown(): void {
  apiMarkedDown = true;
}

function isTimeoutError(error: unknown): boolean {
  return (
    axios.isAxiosError(error) &&
    (error.code === "ECONNABORTED" || error.message === "Dashboard API timeout")
  );
}

function shouldUseMockFallback(error: unknown): boolean {
  if (!axios.isAxiosError(error)) return true;
  if (isTimeoutError(error)) return true;
  if (!error.response) return true;
  return error.response.status >= 500;
}

/** Só trava mock na sessão da aba em falha de rede — não em timeout nem 4xx. */
function shouldMarkApiDown(error: unknown): boolean {
  if (!axios.isAxiosError(error)) return false;
  if (isTimeoutError(error)) return false;
  return !error.response;
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => {
          reject(
            Object.assign(new Error("Dashboard API timeout"), {
              code: "ECONNABORTED",
            })
          );
        }, ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export async function withDashboardMock<T>(
  fetcher: () => Promise<T>,
  mock: T
): Promise<T> {
  if (USE_MOCK_DASHBOARD || !HAS_API_URL) return mock;
  if (apiMarkedDown) return mock;

  try {
    const result = await withTimeout(fetcher(), DASHBOARD_API_TIMEOUT_MS);
    clearDashboardApiDown();
    return result;
  } catch (error) {
    if (shouldUseMockFallback(error)) {
      if (shouldMarkApiDown(error)) markApiDown();
      console.warn(
        "[Dashboard] API indisponível — exibindo dados de demonstração.",
        axios.isAxiosError(error) ? error.message : error
      );
      return mock;
    }
    throw error;
  }
}
