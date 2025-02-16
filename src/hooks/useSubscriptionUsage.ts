import { subscriptionService } from "@/services/subscription.service";
import { useQuery } from "@tanstack/react-query";

export const useSubscriptionUsage = () => {
  const {
    data: usage,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["subscriptionUsage"],
    queryFn: () => subscriptionService.getUsage(),
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  const getRemainingViews = (limit: number) => {
    if (!usage) return limit;
    return Math.max(0, limit - usage.companiesViewed);
  };

  const getRemainingExports = (limit: number) => {
    if (!usage) return limit;
    return Math.max(0, limit - usage.exportsCount);
  };

  return {
    usage,
    isLoading,
    error,
    refetch,
    getRemainingViews,
    getRemainingExports,
  };
};