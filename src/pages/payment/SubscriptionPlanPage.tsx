import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSubscription } from "@/hooks/useSubscription";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const SubscriptionPlansPage = () => {
  const { subscription, isLoadingPlans } = useSubscription();

  if (isLoadingPlans) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/companies"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-gray-600">
          Select the plan that best fits your needs. All plans include basic
          features with additional capabilities as you move up.
        </p>
      </div>

      {subscription && (
        <Alert className="mb-8 border-blue-500 bg-blue-50">
          <AlertDescription>
            You are currently on the <strong>{subscription.plan.name}</strong>{" "}
            plan.
            {subscription.status === "active" && (
              <span>
                {" "}
                Valid until{" "}
                {new Date(subscription.endDate).toLocaleDateString()}
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      <SubscriptionPlans />

      <Card className="mt-12">
        <CardHeader>
          <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold">
              Can I switch plans at any time?
            </h4>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes
              will be reflected in your next billing cycle.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold">
              What happens when I reach my monthly limit?
            </h4>
            <p className="text-gray-600">
              You'll receive a notification when approaching your limits. Once
              reached, you'll need to wait for the next billing cycle or upgrade
              your plan to continue accessing those features.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold">
              Is there a long-term contract?
            </h4>
            <p className="text-gray-600">
              No, all plans are billed monthly or yearly, and you can cancel at
              any time. There are no long-term commitments required.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
