import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowUpRight, Filter, RefreshCw } from 'lucide-react';

// Mock data for agent feed
const agentFeedData = [
  {
    id: 1,
    agentName: 'Agent Alpha',
    agentAvatar: '/alpha-avatar.png',
    action: 'Lead Capture',
    description: 'Successfully processed 5 new leads from Facebook',
    status: 'success',
    timestamp: '2m ago'
  },
  {
    id: 2,
    agentName: 'Agent Beta',
    agentAvatar: '/beta-avatar.png',
    action: 'Email Campaign',
    description: 'Sent 250 emails with 15% open rate so far',
    status: 'success',
    timestamp: '15m ago'
  },
  {
    id: 3,
    agentName: 'Agent Gamma',
    agentAvatar: '/gamma-avatar.png',
    action: 'Offer Analysis',
    description: 'Detected 25% increase in conversion rate',
    status: 'success',
    timestamp: '1h ago'
  },
  {
    id: 4,
    agentName: 'Agent Delta',
    agentAvatar: '/delta-avatar.png',
    action: 'API Sync',
    description: 'Synchronized data with WarriorPlus - 150 transactions',
    status: 'success',
    timestamp: '3h ago'
  },
  {
    id: 5,
    agentName: 'Agent Epsilon',
    agentAvatar: '/epsilon-avatar.png',
    action: 'Customer Support',
    description: 'Resolved 12 support tickets automatically',
    status: 'success',
    timestamp: '5h ago'
  },
  {
    id: 6,
    agentName: 'Agent Zeta',
    agentAvatar: '/zeta-avatar.png',
    action: 'Content Creation',
    description: 'Generated 3 blog posts and 5 social media updates',
    status: 'warning',
    timestamp: '6h ago'
  },
  {
    id: 7,
    agentName: 'Agent Theta',
    agentAvatar: '/theta-avatar.png',
    action: 'Traffic Analysis',
    description: 'Identified top 3 traffic sources with highest conversion',
    status: 'success',
    timestamp: '12h ago'
  }
];

const AgentFeed: React.FC = () => {
  const [filter, setFilter] = React.useState('all');
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const statusClasses = {
      success: 'bg-success/20 text-success border-success/30',
      warning: 'bg-warning/20 text-warning border-warning/30',
      error: 'bg-destructive/20 text-destructive border-destructive/30',
      info: 'bg-info/20 text-info border-info/30'
    };
    
    const statusText = {
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
      info: 'Info'
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full border ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusText[status as keyof typeof statusText]}
      </span>
    );
  };
  
  // Agent avatar placeholder
  const AgentAvatar = ({ name }: { name: string }) => {
    const initials = name.split(' ').map(n => n[0]).join('');
    const colors = [
      'bg-primary/30', 'bg-secondary/30', 'bg-tertiary/30', 
      'bg-success/30', 'bg-warning/30', 'bg-info/30'
    ];
    const randomColor = colors[name.length % colors.length];
    
    return (
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${randomColor} text-white font-medium`}>
        {initials}
      </div>
    );
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Activity className="w-5 h-5 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-white">Agent Feed</h1>
        </div>
        
        <div className="flex space-x-2">
          <button className="p-2 rounded-md bg-muted hover:bg-muted-foreground/20 text-white">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-md bg-muted hover:bg-muted-foreground/20 text-white">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="bg-card rounded-lg overflow-hidden gradient-border">
        <div className="flex border-b border-border">
          <button 
            className={`px-4 py-2 text-sm font-medium ${filter === 'all' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-white'}`}
            onClick={() => setFilter('all')}
          >
            All Activities
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${filter === 'success' ? 'text-success border-b-2 border-success' : 'text-muted-foreground hover:text-white'}`}
            onClick={() => setFilter('success')}
          >
            Success
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${filter === 'warning' ? 'text-warning border-b-2 border-warning' : 'text-muted-foreground hover:text-white'}`}
            onClick={() => setFilter('warning')}
          >
            Warnings
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${filter === 'error' ? 'text-destructive border-b-2 border-destructive' : 'text-muted-foreground hover:text-white'}`}
            onClick={() => setFilter('error')}
          >
            Errors
          </button>
        </div>
        
        <div className="divide-y divide-border">
          {agentFeedData
            .filter(item => filter === 'all' || item.status === filter)
            .map((item) => (
              <div 
                key={item.id} 
                className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start">
                  <div className="mr-3">
                    <AgentAvatar name={item.agentName} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <h3 className="font-medium text-white">{item.agentName}</h3>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-sm text-primary">{item.action}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusBadge status={item.status} />
                        <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        
        <div className="p-4 border-t border-border text-center">
          <button className="text-sm text-primary hover:text-primary/80 flex items-center justify-center mx-auto">
            Load More <ArrowUpRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AgentFeed;
