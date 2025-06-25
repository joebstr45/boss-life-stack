import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layers, RefreshCw, Settings, Check, AlertTriangle, Clock, ArrowRight, ExternalLink } from 'lucide-react';

// Mock data for API integrations
const apiIntegrations = [
  {
    id: 'warriorplus',
    name: 'WARRIORPLUS',
    status: 'connected',
    lastSync: '15 minutes ago',
    transactions: 150,
    icon: '⚔️'
  },
  {
    id: 'clickbank',
    name: 'CLICKBANK',
    status: 'connected',
    lastSync: '30 minutes ago',
    transactions: 75,
    icon: '🔄'
  },
  {
    id: 'digistore24',
    name: 'DIGISTORE24',
    status: 'connected',
    lastSync: '45 minutes ago',
    transactions: 50,
    icon: '🏪'
  },
  {
    id: 'jvzoo',
    name: 'JVZOO',
    status: 'connected',
    lastSync: '1 hour ago',
    transactions: 25,
    icon: '🦓'
  }
];

const ApiPanel: React.FC = () => {
  const [selectedApi, setSelectedApi] = React.useState<string | null>(null);
  
  // Status indicator component
  const StatusIndicator = ({ status }: { status: string }) => {
    const statusClasses = {
      'connected': 'bg-success',
      'disconnected': 'bg-destructive',
      'pending': 'bg-warning'
    };
    
    return (
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${statusClasses[status as keyof typeof statusClasses]} mr-2`}></div>
        <span className="text-sm capitalize">{status}</span>
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
          <Layers className="w-5 h-5 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-white">API Integration Panel</h1>
        </div>
        
        <div className="flex space-x-2">
          <button className="px-3 py-2 rounded-md bg-primary text-white text-sm flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Test All
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* API Integration Cards */}
        {apiIntegrations.map((api) => (
          <div 
            key={api.id}
            className="bg-card rounded-lg overflow-hidden gradient-border"
          >
            <div className="p-4 border-b border-border flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center text-xl mr-3">
                  {api.icon}
                </div>
                <h2 className="text-lg font-medium text-white">{api.name}</h2>
              </div>
              
              <div className="flex items-center">
                <div className={`px-2 py-1 rounded-full text-xs ${api.status === 'connected' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                  {api.status === 'connected' ? 'ACTIVE' : 'INACTIVE'}
                </div>
                <button className="ml-3 p-2 rounded-md bg-muted hover:bg-muted-foreground/20 text-white">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Last Sync</h3>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm text-white">{api.lastSync}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Status</h3>
                <StatusIndicator status={api.status} />
              </div>
              
              <div>
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Data Flow</h3>
                <div className="flex items-center">
                  <span className="text-sm text-white">{api.transactions} transactions today</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-muted/30 flex justify-between items-center">
              <div className="flex items-center">
                {api.status === 'connected' ? (
                  <Check className="w-4 h-4 text-success mr-2" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-warning mr-2" />
                )}
                <span className="text-sm text-muted-foreground">
                  {api.status === 'connected' 
                    ? 'API connection is active and working properly.' 
                    : 'API connection needs attention.'}
                </span>
              </div>
              
              <button 
                className="text-primary text-sm flex items-center hover:text-primary/80"
                onClick={() => setSelectedApi(api.id)}
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
        
        {/* API Configuration Details */}
        {selectedApi && (
          <div className="bg-card rounded-lg overflow-hidden gradient-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-medium text-white">API Configuration</h2>
            </div>
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    API Key
                  </label>
                  <div className="flex">
                    <input 
                      type="password" 
                      value="••••••••••••••••••••••••••••••"
                      readOnly
                      className="flex-1 px-3 py-2 bg-muted border border-border rounded-l-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button className="px-3 py-2 bg-muted border-y border-r border-border rounded-r-md text-muted-foreground hover:text-white">
                      Show
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    API Endpoint
                  </label>
                  <div className="flex">
                    <input 
                      type="text" 
                      value={`https://api.${selectedApi}.com/v2/`}
                      readOnly
                      className="flex-1 px-3 py-2 bg-muted border border-border rounded-l-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button className="px-3 py-2 bg-muted border-y border-r border-border rounded-r-md text-muted-foreground hover:text-white">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Sync Frequency
                  </label>
                  <select className="w-full px-3 py-2 bg-muted border border-border rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option value="5">Every 5 minutes</option>
                    <option value="15">Every 15 minutes</option>
                    <option value="30">Every 30 minutes</option>
                    <option value="60">Every hour</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Webhook URL
                  </label>
                  <div className="flex">
                    <input 
                      type="text" 
                      value="https://bosspreneurlife.com/api/webhook/incoming"
                      readOnly
                      className="flex-1 px-3 py-2 bg-muted border border-border rounded-l-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button className="px-3 py-2 bg-muted border-y border-r border-border rounded-r-md text-muted-foreground hover:text-white">
                      Copy
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-sm font-medium text-white mb-3">Data Synchronization</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="sync-products" 
                        checked 
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50 bg-muted"
                      />
                      <label htmlFor="sync-products" className="ml-2 text-sm text-white">
                        Products & Offers
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="sync-transactions" 
                        checked 
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50 bg-muted"
                      />
                      <label htmlFor="sync-transactions" className="ml-2 text-sm text-white">
                        Transactions
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="sync-customers" 
                        checked 
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50 bg-muted"
                      />
                      <label htmlFor="sync-customers" className="ml-2 text-sm text-white">
                        Customer Data
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="sync-affiliates" 
                        checked 
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50 bg-muted"
                      />
                      <label htmlFor="sync-affiliates" className="ml-2 text-sm text-white">
                        Affiliate Information
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="sync-refunds" 
                        checked 
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50 bg-muted"
                      />
                      <label htmlFor="sync-refunds" className="ml-2 text-sm text-white">
                        Refunds & Chargebacks
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-sm font-medium text-white mb-3">API Statistics</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">API Calls Today</span>
                      <span className="text-sm text-white">1,248 / 5,000</span>
                    </div>
                    
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary" 
                        style={{ width: '25%' }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Average Response Time</span>
                      <span className="text-sm text-white">245ms</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Error Rate</span>
                      <span className="text-sm text-white">0.3%</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-primary text-white text-sm rounded-md">
                    Save Changes
                  </button>
                  <button className="flex-1 px-3 py-2 bg-muted hover:bg-muted-foreground/20 text-white text-sm rounded-md">
                    Test Connection
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Add New Integration */}
        <div className="bg-muted/50 rounded-lg overflow-hidden border border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer p-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">Add New Integration</h3>
            <p className="text-sm text-muted-foreground">
              Connect additional payment processors, CRMs, or marketing platforms
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ApiPanel;
