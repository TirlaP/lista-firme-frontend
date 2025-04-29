import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { Navigate } from "react-router-dom";

interface SubscriptionGuardProps {
  children: React.ReactNode;
  requiredFeature?: string;
}

export const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({
  children,
  requiredFeature,
}) => {
  const { isAuthenticated } = useAuth();
  const { subscription, isLoading } = useSubscription();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If no subscription is required (free features) or user has an active subscription
  if (
    !requiredFeature ||
    (subscription?.status === "active" &&
      subscription.plan.features[requiredFeature])
  ) {
    return <>{children}</>;
  }

  // If user has no active subscription or doesn't have access to the required feature
  return <Navigate to="/subscription/plans" />;
};
