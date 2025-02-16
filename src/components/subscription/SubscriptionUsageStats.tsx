import { useSubscription } from "@/hooks/useSubscription";
import { useSubscriptionUsage } from "@/hooks/useSubscriptionUsage";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { AlertCircle } from "lucide-react";

export const SubscriptionUsageStats = () => {
  const { subscription, getFeatureLimit } = useSubscription();
  const { usage, isLoading } = useSubscriptionUsage();

  if (isLoading) {
    return <div>Loading usage statistics...</div>;
  }

  if (!subscription || !usage) {
    return null;
  }

  const companiesLimit = typeof getFeatureLimit("companiesPerMonth") === 'number' 
    ? getFeatureLimit("companiesPerMonth") as number 
    : 0;
    
  const exportsLimit = typeof getFeatureLimit("exportsPerMonth") === 'number'
    ? getFeatureLimit("exportsPerMonth") as number
    : 0;

  const companiesPercentage = (usage.companiesViewed / companiesLimit) * 100;
  const exportsPercentage = (usage.exportsCount / exportsLimit) * 100;

  const getColorByPercentage = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Companies Viewed</h3>
          <span className="text-sm text-gray-500">
            {usage.companiesViewed} / {companiesLimit}
          </span>
        </div>
        <Progress 
          value={companiesPercentage} 
          className={getColorByPercentage(companiesPercentage)}
        />
        {companiesPercentage >= 90 && (
          <div className="flex items-center mt-2 text-sm text-red-500">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span>Approaching limit</span>
          </div>
        )}
      </Card>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Exports Made</h3>
          <span className="text-sm text-gray-500">
            {usage.exportsCount} / {exportsLimit}
          </span>
        </div>
        <Progress 
          value={exportsPercentage} 
          className={getColorByPercentage(exportsPercentage)}
        />
        {exportsPercentage >= 90 && (
          <div className="flex items-center mt-2 text-sm text-red-500">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span>Approaching limit</span>
          </div>
        )}
      </Card>
    </div>
  );
};