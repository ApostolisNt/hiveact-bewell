import type { FormValues } from "../schema/general";

const LOCAL_API_URL = "http://localhost/escape-public-autohelp-api/api";
// const API_URL = "https://autohelp-v2.escapegameover.com/api";
// const PREVIEW_URL = "https://preview-autohelp.escapegameover.com/api";

export async function mockPostReaction(payload: {
  values: FormValues;
  average: number;
}) {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 700));

  // “Successful” response
  return {
    ok: true,
    id: String(Date.now()),
    ...payload,
  };
}

export type LoginResponse = {
  message: string;
  clientId?: string;
  expireAt?: number;
  jwt?: string;
};

export async function loginRequest(payload: {
  username: string;
  password: string;
}): Promise<{ ok: boolean; data: LoginResponse }> {
  try {
    const res = await fetch(`${LOCAL_API_URL}/login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res
      .json()
      .catch(() => ({ message: "Unknown error" }))) as LoginResponse;
    return { ok: res.ok && data?.message === "Successful login.", data };
  } catch {
    return { ok: false, data: { message: "Network error" } };
  }
}
