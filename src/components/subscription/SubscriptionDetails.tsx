import { useSubscription } from "@/hooks/useSubscription";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CreditCard, Calendar, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export const SubscriptionDetails = () => {
  const { subscription, cancelSubscription, isCancelling } = useSubscription();

  if (!subscription) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">No Active Subscription</h3>
          <p className="text-gray-600 mb-4">
            You are currently on the free plan.
          </p>
          <Link to="/subscription/plans">
            <Button>View Plans</Button>
          </Link>
        </div>
      </Card>
    );
  }

  const handleCancelSubscription = () => {
    if (window.confirm("Are you sure you want to cancel your subscription?")) {
      cancelSubscription(subscription.id);
    }
  };

  const isExpiringSoon = subscription.endDate && 
    new Date(subscription.endDate).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold mb-2">
            {subscription.plan.name} Plan
          </h3>
          <p className="text-gray-600">
            {subscription.billingCycle} billing
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">
            ${subscription.plan.price}
          </div>
          <div className="text-sm text-gray-500">
            per {subscription.billingCycle}
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center">
          <CreditCard className="w-5 h-5 mr-3 text-gray-500" />
          <div>
            <div className="text-sm text-gray-600">Next payment</div>
            <div className="font-medium">
              {subscription.paymentDetails?.nextPaymentDate
                ? format(new Date(subscription.paymentDetails.nextPaymentDate), 'MMM dd, yyyy')
                : 'Not available'}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-3 text-gray-500" />
          <div>
            <div className="text-sm text-gray-600">Subscription period</div>
            <div className="font-medium">
              {format(new Date(subscription.startDate), 'MMM dd, yyyy')} - {format(new Date(subscription.endDate), 'MMM dd, yyyy')}
            </div>
          </div>
        </div>
      </div>

      {isExpiringSoon && (
        <div className="flex items-center p-3 mb-6 bg-yellow-50 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="text-sm text-yellow-700">
            Your subscription will expire soon. Consider renewing to avoid service interruption.
          </span>
        </div>
      )}

      <div className="flex gap-4">
        <Link to="/subscription/plans" className="flex-1">
          <Button variant="outline" className="w-full">
            Change Plan
          </Button>
        </Link>
        <Button 
          variant="destructive" 
          className="flex-1"
          onClick={handleCancelSubscription}
          isLoading={isCancelling}
        >
          Cancel Subscription
        </Button>
      </div>
    </Card>
  );
};