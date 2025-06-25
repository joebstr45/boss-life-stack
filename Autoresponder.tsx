import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Plus, Edit, Trash2, Send, BarChart2, Settings, Download, Check } from 'lucide-react';
import { ArrowUp, ArrowDown, Eye, MousePointer, Info } from 'lucide-react';

// Mock data for autoresponder
const emailSequences = [
  { 
    id: 1, 
    name: 'Welcome Series', 
    emails: 5, 
    openRate: 45, 
    clickRate: 12, 
    status: 'ACTIVE' 
  },
  { 
    id: 2, 
    name: 'Abandoned Cart', 
    emails: 3, 
    openRate: 38, 
    clickRate: 15, 
    status: 'ACTIVE' 
  },
  { 
    id: 3, 
    name: 'Re-engagement', 
    emails: 4, 
    openRate: 22, 
    clickRate: 5, 
    status: 'PAUSED' 
  },
  { 
    id: 4, 
    name: 'Product Launch', 
    emails: 7, 
    openRate: 52, 
    clickRate: 25, 
    status: 'DRAFT' 
  }
];

const smtpConfig = {
  server: 'smtp.example.com',
  port: 587,
  username: 'boss@bosspreneurlife.com',
  testStatus: 'Passed',
  deliveryTime: '250ms',
  reputation: 'Good'
};

const Autoresponder: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('sequences');
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const statusClasses = {
      'ACTIVE': 'bg-success/20 text-success border-success/30',
      'PAUSED': 'bg-warning/20 text-warning border-warning/30',
      'DRAFT': 'bg-info/20 text-info border-info/30',
      'STOPPED': 'bg-destructive/20 text-destructive border-destructive/30'
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full border ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status}
      </span>
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
          <Mail className="w-5 h-5 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-white">Autoresponder Dock</h1>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'templates' 
                ? 'bg-primary text-white' 
                : 'bg-muted hover:bg-muted-foreground/20 text-white'
            }`}
            onClick={() => setActiveTab('templates')}
          >
            Templates
          </button>
          
          <button 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'sequences' 
                ? 'bg-primary text-white' 
                : 'bg-muted hover:bg-muted-foreground/20 text-white'
            }`}
            onClick={() => setActiveTab('sequences')}
          >
            Sequences
          </button>
          
          <button 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'stats' 
                ? 'bg-primary text-white' 
                : 'bg-muted hover:bg-muted-foreground/20 text-white'
            }`}
            onClick={() => setActiveTab('stats')}
          >
            Stats
          </button>
        </div>
      </div>
      
      {/* Email Sequences Tab */}
      {activeTab === 'sequences' && (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-card rounded-lg overflow-hidden gradient-border">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-medium text-white">Email Sequences</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded-md bg-primary text-white text-sm flex items-center">
                  <Plus className="w-4 h-4 mr-1" />
                  Add New
                </button>
                <button className="px-3 py-1 rounded-md bg-muted hover:bg-muted-foreground/20 text-white text-sm">
                  Edit
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Emails
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Open Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Click Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {emailSequences.map((sequence) => (
                    <tr key={sequence.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                        {sequence.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                        {sequence.emails}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                        {sequence.openRate}%
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                        {sequence.clickRate}%
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StatusBadge status={sequence.status} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="p-1 text-muted-foreground hover:text-white">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-muted-foreground hover:text-white">
                            <Send className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* SMTP Configuration */}
          <div className="bg-card rounded-lg overflow-hidden gradient-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-medium text-white">SMTP Configuration</h2>
            </div>
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    SMTP Server
                  </label>
                  <div className="flex">
                    <input 
                      type="text" 
                      value={smtpConfig.server}
                      readOnly
                      className="flex-1 px-3 py-2 bg-muted border border-border rounded-l-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button className="px-3 py-2 bg-muted border-y border-r border-border rounded-r-md text-muted-foreground hover:text-white">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Port
                  </label>
                  <input 
                    type="text" 
                    value={smtpConfig.port}
                    readOnly
                    className="w-full px-3 py-2 bg-muted border border-border rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Username
                  </label>
                  <input 
                    type="text" 
                    value={smtpConfig.username}
                    readOnly
                    className="w-full px-3 py-2 bg-muted border border-border rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <input 
                    type="password" 
                    value="••••••••••••"
                    readOnly
                    className="w-full px-3 py-2 bg-muted border border-border rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-sm font-medium text-white mb-3">Connection Status</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-success mr-2"></div>
                        <span className="text-sm text-white">Connected</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Test Status</span>
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-success mr-1" />
                        <span className="text-sm text-white">{smtpConfig.testStatus} ({smtpConfig.deliveryTime})</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Sending Reputation</span>
                      <span className="text-sm text-white">{smtpConfig.reputation}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button className="w-full px-3 py-2 bg-primary text-white text-sm rounded-md">
                      Test Connection
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-info/10 border border-info/30 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="w-5 h-5 text-info" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-white">SMTP Ready</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Your SMTP server is configured and ready to send emails. You can create and schedule email sequences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="bg-card rounded-lg overflow-hidden gradient-border">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-medium text-white">Email Templates</h2>
            <button className="px-3 py-1 rounded-md bg-primary text-white text-sm flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              New Template
            </button>
          </div>
          
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Template Cards */}
            {['Welcome Email', 'Product Offer', 'Follow-up', 'Abandoned Cart'].map((template, index) => (
              <div key={index} className="bg-muted rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors cursor-pointer">
                <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Mail className="w-10 h-10 text-white/50" />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-white">{template}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Last edited: May 28, 2025</p>
                </div>
              </div>
            ))}
            
            {/* Add New Template Card */}
            <div className="bg-muted/50 rounded-lg overflow-hidden border border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center h-[136px]">
              <div className="text-center">
                <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Create Template</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-card rounded-lg overflow-hidden gradient-border">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-medium text-white">Email Performance</h2>
              <div className="flex space-x-2">
                <select className="bg-muted border border-border rounded-md text-sm text-white px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                </select>
                <button className="p-1 rounded-md bg-muted hover:bg-muted-foreground/20 text-white">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Sent Emails</h3>
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-white">1,248</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    12% from previous period
                  </p>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Open Rate</h3>
                    <Eye className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-white">32.5%</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    3.2% from previous period
                  </p>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Click Rate</h3>
                    <MousePointer className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-white">8.7%</p>
                  <p className="text-xs text-destructive flex items-center mt-1">
                    <ArrowDown className="w-3 h-3 mr-1" />
                    1.3% from previous period
                  </p>
                </div>
              </div>
              
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Email performance chart would appear here</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg overflow-hidden gradient-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-medium text-white">Top Performing Emails</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Sequence
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Sent
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Open Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Click Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { subject: 'Your Boss Life Journey Begins Now', sequence: 'Welcome Series', sent: 450, openRate: 62, clickRate: 28 },
                    { subject: 'LAST CHANCE: Elite System 50% Off', sequence: 'Product Launch', sent: 320, openRate: 58, clickRate: 32 },
                    { subject: 'You Left Something Behind...', sequence: 'Abandoned Cart', sent: 215, openRate: 54, clickRate: 26 },
                    { subject: 'Boss Method: Unlock Your Results', sequence: 'Follow-up', sent: 180, openRate: 48, clickRate: 22 }
                  ].map((email, index) => (
                    <tr key={index} className="hover:bg-muted/30">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                        {email.subject}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                        {email.sequence}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                        {email.sent}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                        {email.openRate}%
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                        {email.clickRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Autoresponder;
