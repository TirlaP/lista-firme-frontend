import { useSubscription } from '@/hooks/useSubscription';
import { Card, Button, Badge, Spin } from 'antd';
import { CheckCircle2 } from 'lucide-react';

export const SubscriptionPlans = () => {
  const { plans, initiateSubscription, isLoadingPlans, subscription } = useSubscription();

  if (isLoadingPlans) {
    return (
      <div className="flex justify-center p-8">
        <Spin size="large" />
      </div>
    );
  }

  if (!plans?.length) return null;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
      {plans.map((plan) => {
        const isCurrentPlan = subscription?.plan?.name === plan.name;
        const isPopular = plan.name === 'premium';

        return (
          <Card
            key={plan.name}
            className={`relative \${isPopular ? 'border-2 border-blue-500' : ''}`}
            title={
              <div className="text-center">
                <h3 className="text-2xl font-bold capitalize">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </div>
            }
          >
            {isPopular && (
              <Badge.Ribbon text="Most Popular" color="blue" />
            )}

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
                  {plan.features.searchFilters ? "Advanced search filters" : "Basic search"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>
                  {plan.features.advancedStats ? "Advanced analytics" : "Basic stats"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>
                  {plan.features.bulkExport ? "Bulk export" : "Standard export"}
                </span>
              </li>
              {plan.features.apiAccess && (
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>API Access</span>
                </li>
              )}
            </ul>

            <Button
              type={isPopular ? "primary" : "default"}
              size="large"
              block
              onClick={() => initiateSubscription(plan.name)}
              disabled={isCurrentPlan}
            >
              {isCurrentPlan ? "Current Plan" : "Choose Plan"}
            </Button>
          </Card>
        );
      })}
    </div>
  );
};