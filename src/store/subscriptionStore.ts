import { Subscription, SubscriptionPlan } from "@/types/subscription.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SubscriptionState {
  subscription: Subscription | null;
  plans: SubscriptionPlan[];
  selectedPlan: SubscriptionPlan | null;
  isLoading: boolean;
  error: string | null;
  setSubscription: (subscription: Subscription | null) => void;
  setPlans: (plans: SubscriptionPlan[]) => void;
  setSelectedPlan: (plan: SubscriptionPlan | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearSubscriptionStore: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      subscription: null,
      plans: [],
      selectedPlan: null,
      isLoading: false,
      error: null,
      setSubscription: (subscription) => set({ subscription }),
      setPlans: (plans) => set({ plans }),
      setSelectedPlan: (plan) => set({ selectedPlan: plan }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearSubscriptionStore: () =>
        set({
          subscription: null,
          selectedPlan: null,
          error: null,
        }),
    }),
    {
      name: "subscription-storage",
      partialize: (state) => ({
        subscription: state.subscription,
        plans: state.plans,
      }),
    }
  )
);