import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, ArrowUp, ArrowDown, Download, Filter, AlertTriangle } from 'lucide-react';

// Mock data for heat signals
const offerData = {
  hotOffers: [
    { name: 'Boss Method', change: '+25%', revenue: 12450 },
    { name: 'Elite System', change: '+18%', revenue: 8320 },
    { name: 'Pro Upgrade', change: '+12%', revenue: 6750 }
  ],
  coolingOffers: [
    { name: 'Quick Start', change: '-5%', revenue: 2100 },
    { name: 'Basic Pack', change: '-3%', revenue: 1850 },
    { name: 'Starter Guide', change: '-1%', revenue: 950 }
  ],
  conversionData: [
    { date: 'May 25', rate: 2.1 },
    { date: 'May 26', rate: 2.3 },
    { date: 'May 27', rate: 2.2 },
    { date: 'May 28', rate: 2.5 },
    { date: 'May 29', rate: 3.0 },
    { date: 'May 30', rate: 3.2 },
    { date: 'May 31', rate: 3.5 }
  ]
};

const HeatSignals: React.FC = () => {
  const [dateRange, setDateRange] = React.useState('7d');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <LineChart className="w-5 h-5 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-white">Offer Heat Signals</h1>
        </div>
        
        <div className="flex space-x-2">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-muted border border-border rounded-md text-sm text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          
          <button className="p-2 rounded-md bg-muted hover:bg-muted-foreground/20 text-white">
            <Filter className="w-5 h-5" />
          </button>
          
          <button className="p-2 rounded-md bg-muted hover:bg-muted-foreground/20 text-white">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Alert Banner */}
        <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 flex items-start">
          <AlertTriangle className="w-5 h-5 text-warning mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-white mb-1">Boss Method showing unusual spike in last 24h</h3>
            <p className="text-sm text-muted-foreground">
              Conversion rate increased by 25% compared to previous period. Consider scaling ad spend or increasing inventory.
            </p>
          </div>
        </div>
        
        {/* Conversion Overview */}
        <div className="bg-card rounded-lg overflow-hidden gradient-border">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-medium text-white">Conversion Overview</h2>
          </div>
          
          <div className="p-4">
            <div className="h-[200px] flex items-center justify-center">
              {/* This would be a real chart in production */}
              <div className="w-full h-full flex flex-col">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  {offerData.conversionData.map((item, index) => (
                    <div key={index}>{item.date}</div>
                  ))}
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-0 flex items-end">
                    {offerData.conversionData.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex-1 mx-1"
                      >
                        <div 
                          className="bg-gradient-to-t from-primary to-secondary rounded-t-sm"
                          style={{ height: `${(item.rate / 4) * 100}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-white mt-2">
                  {offerData.conversionData.map((item, index) => (
                    <div key={index}>{item.rate}%</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hot vs Cooling Offers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hot Offers */}
          <div className="bg-card rounded-lg overflow-hidden gradient-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-medium text-white">Hot Offers</h2>
            </div>
            
            <div className="divide-y divide-border">
              {offerData.hotOffers.map((offer, index) => (
                <div key={index} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{offer.name}</h3>
                    <div className="flex items-center text-success">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      <span>{offer.change}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="text-white">${offer.revenue.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Cooling Offers */}
          <div className="bg-card rounded-lg overflow-hidden gradient-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-medium text-white">Cooling Offers</h2>
            </div>
            
            <div className="divide-y divide-border">
              {offerData.coolingOffers.map((offer, index) => (
                <div key={index} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{offer.name}</h3>
                    <div className="flex items-center text-destructive">
                      <ArrowDown className="w-4 h-4 mr-1" />
                      <span>{offer.change}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="text-white">${offer.revenue.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Revenue Impact */}
        <div className="bg-card rounded-lg overflow-hidden gradient-border">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-medium text-white">Revenue Impact</h2>
          </div>
          
          <div className="p-4">
            <div className="h-[200px] flex items-end justify-between">
              {/* This would be a real chart in production */}
              {[...offerData.hotOffers, ...offerData.coolingOffers]
                .sort((a, b) => b.revenue - a.revenue)
                .map((offer, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center w-1/6"
                  >
                    <div 
                      className={`w-full mx-1 rounded-t-sm ${
                        offer.change.includes('+') 
                          ? 'bg-gradient-to-t from-primary to-secondary' 
                          : 'bg-gradient-to-t from-destructive/50 to-destructive'
                      }`}
                      style={{ height: `${(offer.revenue / 15000) * 180}px` }}
                    ></div>
                    <div className="text-xs text-white mt-2 truncate w-full text-center">
                      {offer.name}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeatSignals;
