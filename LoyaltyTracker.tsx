import React from 'react';

// Loyalty tracker types
export type LoyaltyTrackerProps = {
  value: number;
  maxValue?: number;
  title?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

const LoyaltyTracker: React.FC<LoyaltyTrackerProps> = ({
  value,
  maxValue = 100,
  title,
  showLabel = true,
  size = 'md'
}) => {
  // Calculate percentage
  const percentage = Math.min(Math.max(0, (value / maxValue) * 100), 100);
  
  // Size classes
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };
  
  // Get level based on percentage
  const getLevel = () => {
    if (percentage < 25) return 'Starter';
    if (percentage < 50) return 'Bronze';
    if (percentage < 75) return 'Silver';
    if (percentage < 90) return 'Gold';
    return 'Elite';
  };
  
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          {title}
        </h3>
      )}
      
      <div className={`bg-muted rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {showLabel && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-muted-foreground">{getLevel()}</span>
          <span className="text-xs text-white">{percentage.toFixed(0)}%</span>
        </div>
      )}
    </div>
  );
};

export default LoyaltyTracker;
