import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { SubscriptionPlan } from "@/types/subscription.types";
import { AlertCircle, CheckCircle } from "lucide-react";

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  isActive?: boolean;
  onSelect: (plan: SubscriptionPlan) => void;
  isLoading?: boolean;
}

export const SubscriptionCard = ({
  plan,
  isActive,
  onSelect,
  isLoading,
}: SubscriptionCardProps) => {
  const formatFeatureValue = (value: number | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <CheckCircle className="w-5 h-5 text-green-500" />
      ) : (
        <AlertCircle className="w-5 h-5 text-gray-300" />
      );
    }
    return value.toLocaleString();
  };

  return (
    <Card className={`p-6 ${isActive ? "ring-2 ring-blue-500" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <div className="text-2xl font-bold">
          ${plan.price}
          <span className="text-sm text-gray-500">/month</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <span>Companies per month</span>
          <span>{formatFeatureValue(plan.features.companiesPerMonth)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Exports per month</span>
          <span>{formatFeatureValue(plan.features.exportsPerMonth)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Search filters</span>
          <span>{formatFeatureValue(plan.features.searchFilters)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Advanced stats</span>
          <span>{formatFeatureValue(plan.features.advancedStats)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Bulk export</span>
          <span>{formatFeatureValue(plan.features.bulkExport)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>API access</span>
          <span>{formatFeatureValue(plan.features.apiAccess)}</span>
        </div>
      </div>

      <Button
        onClick={() => onSelect(plan)}
        className="w-full"
        variant={isActive ? "outline" : "default"}
        isLoading={isLoading}
      >
        {isActive ? "Current Plan" : "Select Plan"}
      </Button>
    </Card>
  );
};
