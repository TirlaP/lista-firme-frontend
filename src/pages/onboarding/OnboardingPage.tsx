import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Award, Building2, FileSpreadsheet, Search } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const steps = [
  {
    id: "welcome",
    title: "Welcome to Lista Firme",
    description: "Discover Romania's most comprehensive company database",
    icon: Building2,
  },
  {
    id: "search",
    title: "Powerful Search",
    description: "Find companies by name, location, CAEN code, and more",
    icon: Search,
  },
  {
    id: "export",
    title: "Export Data",
    description: "Download company data in CSV or Excel format",
    icon: FileSpreadsheet,
  },
  {
    id: "premium",
    title: "Premium Features",
    description: "Unlock advanced features with our subscription plans",
    icon: Award,
  },
];

export const OnboardingPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Redirect to subscription plans when onboarding is complete
      window.location.href = "/subscription/plans";
    }
  };

  const Step = ({
    step,
    index,
  }: { step: (typeof steps)[0]; index: number }) => {
    const Icon = step.icon;
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <Icon className="w-12 h-12 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
        <p className="text-gray-600">{step.description}</p>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.name}!
          </h2>
          <p className="text-gray-600 mt-2">
            Let's get you started with Lista Firme
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Step step={steps[currentStep]} index={currentStep} />
        </div>

        <div className="flex justify-between items-center mt-8">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {currentStep === steps.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};
