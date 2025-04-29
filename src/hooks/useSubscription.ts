import { subscriptionService } from "@/services/subscription.service";
import type {
  CreateSubscriptionDTO,
  SubscriptionPlan,
  SubscriptionResponse,
  UpdateSubscriptionDTO,
} from "@/types/subscription.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useSubscription = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: subscription,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => subscriptionService.getCurrentSubscription(),
  });

  const {
    data: plans,
    isLoading: isLoadingPlans,
    error: plansError,
  } = useQuery({
    queryKey: ["subscriptionPlans"],
    queryFn: () => subscriptionService.getPlans(),
  });

  const { mutate: initiateSubscription, isPending: isInitiating } = useMutation(
    {
      mutationFn: async (planId: string) => {
        const subscriptionData: CreateSubscriptionDTO = {
          planId,
          billingCycle: "monthly",
        };
        return await subscriptionService.createSubscription(subscriptionData);
      },
      onSuccess: (data: SubscriptionResponse) => {
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          queryClient.invalidateQueries({ queryKey: ["subscription"] });
      console.log("Hmmmm")
          navigate("/dashboard");
          toast.success("Subscription activated successfully!");
        }
      },
      onError: (error) => {
        toast.error("Failed to initiate subscription. Please try again.");
        console.error("Subscription error:", error);
      },
    },
  );

  const { mutate: cancelSubscription, isPending: isCancelling } = useMutation({
    mutationFn: (subscriptionId: string) =>
      subscriptionService.cancelSubscription(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      toast.success("Subscription cancelled successfully");
      console.log("Hmmmm")
      navigate("/subscription/plans");
    },
    onError: () => {
      toast.error("Failed to cancel subscription");
    },
  });

  const { mutate: updateSubscription, isPending: isUpdating } = useMutation({
    mutationFn: ({
      subscriptionId,
      updateData,
    }: {
      subscriptionId: string;
      updateData: UpdateSubscriptionDTO;
    }) => subscriptionService.updateSubscription(subscriptionId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      toast.success("Subscription updated successfully");
    },
    onError: () => {
      toast.error("Failed to update subscription");
    },
  });

  const getFeatureLimit = (featureName: keyof SubscriptionPlan["features"]) => {
    if (!subscription || !subscription.plan) {
      const freePlan = plans?.find((plan) => plan.name === "free");
      return freePlan?.features[featureName] || 0;
    }
    return subscription.plan.features[featureName];
  };

  const checkFeatureAccess = (
    featureName: keyof SubscriptionPlan["features"],
  ) => {
    if (!subscription || subscription.status !== "active") {
      const freePlan = plans?.find((plan) => plan.name === "free");
      return !!freePlan?.features[featureName];
    }
    return !!subscription.plan.features[featureName];
  };

  return {
    subscription,
    isLoading,
    error,
    plans,
    isLoadingPlans,
    plansError,
    initiateSubscription,
    isInitiating,
    cancelSubscription,
    isCancelling,
    updateSubscription,
    isUpdating,
    getFeatureLimit,
    checkFeatureAccess,
  };
};
