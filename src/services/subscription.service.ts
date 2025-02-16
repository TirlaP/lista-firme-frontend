import { apiClient } from '@/utils/apiClient';
import {
  CreateSubscriptionDTO,
  Subscription,
  SubscriptionPlan,
  SubscriptionResponse,
  UpdateSubscriptionDTO,
} from '@/types/subscription.types';

class SubscriptionService {
  async getPlans(): Promise<SubscriptionPlan[]> {
    const { data } = await apiClient.get<SubscriptionPlan[]>('/subscriptions/plans');
    return data;
  }

  async getCurrentSubscription(): Promise<Subscription | null> {
    try {
      const { data } = await apiClient.get<Subscription>('/subscriptions/current');
      return data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async createSubscription(subscriptionData: CreateSubscriptionDTO): Promise<SubscriptionResponse> {
    const { data } = await apiClient.post<SubscriptionResponse>('/subscriptions', subscriptionData);
    return data;
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    await apiClient.post(`/subscriptions/${subscriptionId}/cancel`);
  }

  async updateSubscription(subscriptionId: string, updateData: UpdateSubscriptionDTO): Promise<Subscription> {
    const { data } = await apiClient.patch<Subscription>(`/subscriptions/${subscriptionId}`, updateData);
    return data;
  }

  async getUsage(): Promise<{ companiesViewed: number; exportsCount: number }> {
    const { data } = await apiClient.get('/subscriptions/usage');
    return data;
  }

  async validatePayment(paymentId: string): Promise<{ success: boolean; message: string }> {
    const { data } = await apiClient.post('/subscriptions/validate-payment', { paymentId });
    return data;
  }

  async getPlanById(planId: string): Promise<SubscriptionPlan> {
    const { data } = await apiClient.get(`/subscriptions/plans/${planId}`);
    return data;
  }

  async getInvoices(): Promise<any[]> {
    const { data } = await apiClient.get('/subscriptions/invoices');
    return data;
  }
}

export const subscriptionService = new SubscriptionService();