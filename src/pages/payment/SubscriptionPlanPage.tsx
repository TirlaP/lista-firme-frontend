import { SubscriptionPlans } from '@/components/subscription/SubscriptionPlans';
import { useSubscription } from '@/hooks/useSubscription';
import { Alert, Card, Space, Typography } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

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
        <Title level={2}>Choose Your Plan</Title>
        <Text className="text-gray-600">
          Select the plan that best fits your needs. All plans include basic features
          with additional capabilities as you move up.
        </Text>
      </div>

      {subscription && (
        <Alert
          message={
            <span>
              You are currently on the <strong>{subscription.plan.name}</strong> plan.
              {subscription.status === 'active' && (
                <span>
                  {' '}
                  Valid until {new Date(subscription.endDate).toLocaleDateString()}
                </span>
              )}
            </span>
          }
          type="info"
          showIcon
          className="mb-8"
        />
      )}

      <SubscriptionPlans />

      <Card title="Frequently Asked Questions" className="mt-12">
        <Space direction="vertical" className="w-full" size="large">
          <div>
            <Title level={4}>Can I switch plans at any time?</Title>
            <Text>
              Yes, you can upgrade or downgrade your plan at any time. Changes will be
              reflected in your next billing cycle.
            </Text>
          </div>

          <div>
            <Title level={4}>What happens when I reach my monthly limit?</Title>
            <Text>
              You'll receive a notification when approaching your limits. Once reached,
              you'll need to wait for the next billing cycle or upgrade your plan to
              continue accessing those features.
            </Text>
          </div>

          <div>
            <Title level={4}>Is there a long-term contract?</Title>
            <Text>
              No, all plans are billed monthly or yearly, and you can cancel at any
              time. There are no long-term commitments required.
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};