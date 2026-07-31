import { useSyncExternalStore } from 'react';

// Module-level store (no backend/user system yet) so ProfileScreen and
// EditProfileScreen share the same in-memory username across navigation.
let username = 'aras218';
const listeners = new Set<() => void>();

export function getUsername(): string {
  return username;
}

export function setUsername(next: string): void {
  const trimmed = next.trim();
  if (!trimmed || trimmed === username) return;
  username = trimmed;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useUsername(): string {
  return useSyncExternalStore(subscribe, getUsername);
}
