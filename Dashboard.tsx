import React from 'react';
import { useNavigate } from 'react-router-dom';
import AgentAvatar from '../components/AgentAvatar';
import PerformanceGraph from '../components/PerformanceGraph';
import LoyaltyTracker from '../components/LoyaltyTracker';
import { motion } from 'framer-motion';
import { LayoutDashboard, TrendingUp, Users, ShoppingCart, ArrowUpRight } from 'lucide-react';

// Mock data for dashboard
const performanceData = [
  { date: 'May 25', value: 1200 },
  { date: 'May 26', value: 1800 },
  { date: 'May 27', value: 1600 },
  { date: 'May 28', value: 2100 },
  { date: 'May 29', value: 1900 },
  { date: 'May 30', value: 2400 },
  { date: 'May 31', value: 3200 }
];

const agentData = [
  { name: 'Agent Alpha', status: 'online', lastAction: 'Lead capture', time: '2m ago' },
  { name: 'Agent Beta', status: 'online', lastAction: 'Email campaign', time: '15m ago' },
  { name: 'Agent Gamma', status: 'busy', lastAction: 'Offer analysis', time: '1h ago' },
  { name: 'Agent Delta', status: 'offline', lastAction: 'API sync', time: '3h ago' }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <LayoutDashboard className="w-5 h-5 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-lg p-4 gradient-border">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-muted-foreground text-sm">Revenue</p>
              <h3 className="text-2xl font-bold text-white">$12,450</h3>
            </div>
            <div className="p-2 bg-primary/10 rounded-md">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center text-xs text-success">
            <span className="mr-1">↑ 15%</span>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 gradient-border">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-muted-foreground text-sm">Conversions</p>
              <h3 className="text-2xl font-bold text-white">3.2%</h3>
            </div>
            <div className="p-2 bg-secondary/10 rounded-md">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <div className="flex items-center text-xs text-success">
            <span className="mr-1">↑ 0.5%</span>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 gradient-border">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-muted-foreground text-sm">Visitors</p>
              <h3 className="text-2xl font-bold text-white">8,752</h3>
            </div>
            <div className="p-2 bg-tertiary/10 rounded-md">
              <Users className="w-5 h-5 text-tertiary" />
            </div>
          </div>
          <div className="flex items-center text-xs text-success">
            <span className="mr-1">↑ 12%</span>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 gradient-border">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-muted-foreground text-sm">Orders</p>
              <h3 className="text-2xl font-bold text-white">249</h3>
            </div>
            <div className="p-2 bg-success/10 rounded-md">
              <ShoppingCart className="w-5 h-5 text-success" />
            </div>
          </div>
          <div className="flex items-center text-xs text-success">
            <span className="mr-1">↑ 18%</span>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Graph */}
        <div className="lg:col-span-2 bg-card rounded-lg p-4 gradient-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-white">Performance Overview</h2>
            <select className="bg-muted border border-border rounded-md text-sm text-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
          
          <div className="h-[300px]">
            <PerformanceGraph 
              data={performanceData} 
              height={300} 
              showAxis={true}
            />
          </div>
        </div>
        
        {/* Agent Status */}
        <div className="bg-card rounded-lg p-4 gradient-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-white">Agent Status</h2>
            <button 
              onClick={() => navigate('/dashboard/agent-feed')}
              className="text-primary text-sm flex items-center hover:text-primary/80"
            >
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {agentData.map((agent, index) => (
              <div key={index} className="flex items-center p-2 hover:bg-muted/30 rounded-md transition-colors">
                <AgentAvatar 
                  name={agent.name} 
                  status={agent.status as 'online' | 'offline' | 'busy'} 
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{agent.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {agent.lastAction} • {agent.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <h3 className="text-sm font-medium text-white mb-2">Loyalty Status</h3>
            <LoyaltyTracker value={75} title="" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
