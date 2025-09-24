import type { FormValues } from "../schema/general";

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
