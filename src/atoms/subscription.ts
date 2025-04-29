import type {
  Subscription,
  SubscriptionPlan,
} from "@/types/subscription.types";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Persistent storage atoms
export const subscriptionAtom = atomWithStorage<Subscription | null>(
  "subscription-data",
  null,
);
export const plansAtom = atomWithStorage<SubscriptionPlan[]>(
  "subscription-plans",
  [],
);

// Other state atoms
export const selectedPlanAtom = atom<SubscriptionPlan | null>(null);
export const subscriptionLoadingAtom = atom(false);
export const subscriptionErrorAtom = atom<string | null>(null);

// Set subscription action
export const setSubscriptionAtom = atom(
  null,
  (get, set, subscription: Subscription | null) => {
    set(subscriptionAtom, subscription);
  },
);

// Set plans action
export const setPlansAtom = atom(
  null,
  (get, set, plans: SubscriptionPlan[]) => {
    set(plansAtom, plans);
  },
);

// Set selected plan action
export const setSelectedPlanAtom = atom(
  null,
  (get, set, plan: SubscriptionPlan | null) => {
    set(selectedPlanAtom, plan);
  },
);

// Set loading action
export const setSubscriptionLoadingAtom = atom(
  null,
  (get, set, isLoading: boolean) => {
    set(subscriptionLoadingAtom, isLoading);
  },
);

// Set error action
export const setSubscriptionErrorAtom = atom(
  null,
  (get, set, error: string | null) => {
    set(subscriptionErrorAtom, error);
  },
);

// Clear subscription store action
export const clearSubscriptionStoreAtom = atom(null, (get, set) => {
  set(subscriptionAtom, null);
  set(selectedPlanAtom, null);
  set(subscriptionErrorAtom, null);
});

// Custom hook for using subscription state and actions (for easy migration from Zustand)
export const useSubscriptionStore = () => {
  return {
    subscription: useAtomValue(subscriptionAtom),
    plans: useAtomValue(plansAtom),
    selectedPlan: useAtomValue(selectedPlanAtom),
    isLoading: useAtomValue(subscriptionLoadingAtom),
    error: useAtomValue(subscriptionErrorAtom),
    setSubscription: useSetAtom(setSubscriptionAtom),
    setPlans: useSetAtom(setPlansAtom),
    setSelectedPlan: useSetAtom(setSelectedPlanAtom),
    setLoading: useSetAtom(setSubscriptionLoadingAtom),
    setError: useSetAtom(setSubscriptionErrorAtom),
    clearSubscriptionStore: useSetAtom(clearSubscriptionStoreAtom),
  };
};
