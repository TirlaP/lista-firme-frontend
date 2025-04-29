export type SubscriptionPlanType = "free" | "basic" | "premium" | "enterprise";
export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "expired"
  | "pending"
  | "none";
export type BillingCycle = "monthly" | "yearly";

export interface SubscriptionFeatures {
  companiesPerMonth: number;
  exportsPerMonth: number;
  searchFilters: boolean;
  advancedStats: boolean;
  bulkExport: boolean;
  apiAccess: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: SubscriptionPlanType;
  price: number;
  billingCycle: BillingCycle;
  features: SubscriptionFeatures;
  isActive: boolean;
}

export interface SubscriptionUsage {
  companiesViewed: number;
  exportsCount: number;
  lastResetDate: Date;
}

export interface PaymentDetails {
  netopiaTransactionId?: string;
  lastPaymentDate?: Date;
  nextPaymentDate?: Date;
  amount?: number;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  billingCycle: BillingCycle;
  usage: SubscriptionUsage;
  paymentDetails?: PaymentDetails;
}

export interface CreateSubscriptionDTO {
  planId: string;
  billingCycle: BillingCycle;
}

export interface UpdateSubscriptionDTO {
  status?: SubscriptionStatus;
  planId?: string;
  billingCycle?: BillingCycle;
}

export interface SubscriptionResponse {
  subscription: Subscription;
  paymentUrl?: string;
}
