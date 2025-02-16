import React from 'react';

interface ProgressProps {
  value: number;
  className?: string;
  max?: number;
}

export const Progress: React.FC<ProgressProps> = ({ value, className = '', max = 100 }) => {
  const percentage = Math.min(Math.max(0, value), max) / max * 100;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-300 ${className}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};