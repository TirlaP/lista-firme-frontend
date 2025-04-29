import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSubscription } from "@/hooks/useSubscription";
import { CheckCircle2 } from "lucide-react";

export const SubscriptionPlans = () => {
  const { plans, initiateSubscription, isLoadingPlans, subscription } =
    useSubscription();

  if (isLoadingPlans) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!plans?.length) return null;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
      {plans.map((plan) => {
        const isCurrentPlan = subscription?.plan?.name === plan.name;
        const isPopular = plan.name === "premium";

        return (
          <Card
            key={plan.name}
            className={
              isPopular ? "border-2 border-blue-500 relative" : "relative"
            }
          >
            {isPopular && (
              <div className="absolute right-0 top-4 bg-blue-500 text-white py-1 px-3 rounded-l-md text-sm font-medium">
                Most Popular
              </div>
            )}

            <CardHeader className="text-center">
              <h3 className="text-2xl font-bold capitalize">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{plan.features.companiesPerMonth} companies/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{plan.features.exportsPerMonth} exports/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>
                    {plan.features.searchFilters
                      ? "Advanced search filters"
                      : "Basic search"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>
                    {plan.features.advancedStats
                      ? "Advanced analytics"
                      : "Basic stats"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>
                    {plan.features.bulkExport
                      ? "Bulk export"
                      : "Standard export"}
                  </span>
                </li>
                {plan.features.apiAccess && (
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>API Access</span>
                  </li>
                )}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                variant={isPopular ? "default" : "outline"}
                className="w-full"
                onClick={() => initiateSubscription(plan.name)}
                disabled={isCurrentPlan}
              >
                {isCurrentPlan ? "Current Plan" : "Choose Plan"}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
