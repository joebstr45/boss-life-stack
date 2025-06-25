import React from 'react';

// Agent avatar types
export type AgentAvatarProps = {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'busy';
  image?: string;
};

const AgentAvatar: React.FC<AgentAvatarProps> = ({ 
  name, 
  size = 'md', 
  status = 'online',
  image
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };
  
  // Status classes
  const statusClasses = {
    online: 'bg-success',
    offline: 'bg-muted-foreground',
    busy: 'bg-warning'
  };
  
  // Generate initials from name
  const initials = name.split(' ').map(n => n[0]).join('');
  
  // Generate a consistent color based on the name
  const colors = [
    'bg-primary/30', 'bg-secondary/30', 'bg-tertiary/30', 
    'bg-success/30', 'bg-warning/30', 'bg-info/30'
  ];
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const bgColor = colors[colorIndex];
  
  return (
    <div className="relative inline-block">
      {image ? (
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center ${bgColor} text-white font-medium`}>
          {initials}
        </div>
      )}
      
      {/* Status indicator */}
      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${statusClasses[status]}`}></div>
    </div>
  );
};

export default AgentAvatar;
