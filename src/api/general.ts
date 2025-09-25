import type { FormValues } from "../schema/general";

const LOCAL_API_URL = "http://localhost/escape-public-autohelp-api/api";
// const API_URL = "https://autohelp-v2.escapegameover.com/api";
// const PREVIEW_URL = "https://preview-autohelp.escapegameover.com/api";

export async function submitForm(payload: {
  values: FormValues;
  average: number;
}) {
  const formData = new FormData();
  formData.append("name", payload.values.name);
  formData.append("age", payload.values.age?.toString());
  formData.append("email", payload.values.email);
  formData.append("average", payload.average.toString());

  const res = await fetch(`${LOCAL_API_URL}/hiveact/submit.php`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Submit failed");
  return res.json();
}

export type LoginResponse = {
  message: string;
  username?: string;
  expireAt?: number;
  jwt?: string;
};

export async function loginRequest(payload: {
  usernameField: string;
  passwordField: string;
}): Promise<{ ok: boolean; data: LoginResponse }> {
  const formData = new FormData();
  formData.append("username", payload.usernameField);
  formData.append("password", payload.passwordField);

  try {
    const res = await fetch(`${LOCAL_API_URL}/auth/login.php`, {
      method: "POST",
      body: formData,
    });
    const data = (await res
      .json()
      .catch(() => ({ message: "Unknown error" }))) as LoginResponse;
    return { ok: res.ok && data?.message === "Successful login.", data };
  } catch {
    return { ok: false, data: { message: "Network error" } };
  }
}

export type LeaderboardItem = {
  name: string;
  playerReactionTime: number;
  deltaPct: string;
};

export type LeaderboardResponse = {
  ok: true;
  page: number;
  pageSize: number;
  count: number;
  totalPages: number;
  overallAverage: number;
  items: LeaderboardItem[];
};

export async function getLeaderboard(
  page: number,
  pageSize = 10,
  init?: RequestInit
): Promise<LeaderboardResponse> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  const res = await fetch(`${LOCAL_API_URL}/hiveact/leaderboard.php?${params.toString()}`, {
    method: "GET",
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Leaderboard fetch failed (${res.status}): ${text}`);
  }
  const data = await res.json();
  return data as LeaderboardResponse;
}