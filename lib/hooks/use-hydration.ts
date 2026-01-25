'use client';

import { useSyncExternalStore } from 'react';

// Subscribers and state for hydration tracking
const subscribers = new Set<() => void>();
let isHydratedState = false;

// Mark as hydrated (called once on client)
if (typeof window !== 'undefined') {
  isHydratedState = true;
}

function subscribe(callback: () => void) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

function getSnapshot() {
  return isHydratedState;
}

function getServerSnapshot() {
  return false;
}

/**
 * Hook to detect when the component has hydrated on the client.
 * Use this to avoid hydration mismatches with localStorage data.
 *
 * @returns true once the component has mounted on the client
 */
export function useHydration(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useHydration;
