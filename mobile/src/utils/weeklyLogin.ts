export const WEEKLY_LOGIN_REWARDS = [10, 20, 30, 40, 50, 60, 70];

// Ties the cycle to the device clock (no backend yet), so the 7-day
// streak advances once per real calendar day and wraps automatically.
export function getActiveWeeklyDay(): number {
  const daysSinceEpoch = Math.floor(Date.now() / 86_400_000);
  return (daysSinceEpoch % WEEKLY_LOGIN_REWARDS.length) + 1;
}
