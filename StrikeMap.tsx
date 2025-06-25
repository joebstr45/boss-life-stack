import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Layers, Download, Info } from 'lucide-react';

// Mock data for strike map
const regionData = {
  'global': {
    hotRegions: [
      { name: 'North America', percentage: 35 },
      { name: 'Europe', percentage: 28 },
      { name: 'Asia', percentage: 22 },
      { name: 'Australia', percentage: 8 },
      { name: 'South America', percentage: 5 },
      { name: 'Africa', percentage: 2 }
    ],
    activityTypes: [
      { name: 'Sales', percentage: 45 },
      { name: 'Leads', percentage: 30 },
      { name: 'Traffic', percentage: 25 }
    ]
  },
  'north-america': {
    hotRegions: [
      { name: 'United States', percentage: 65 },
      { name: 'Canada', percentage: 25 },
      { name: 'Mexico', percentage: 10 }
    ],
    activityTypes: [
      { name: 'Sales', percentage: 50 },
      { name: 'Leads', percentage: 35 },
      { name: 'Traffic', percentage: 15 }
    ]
  },
  'europe': {
    hotRegions: [
      { name: 'United Kingdom', percentage: 30 },
      { name: 'Germany', percentage: 25 },
      { name: 'France', percentage: 15 },
      { name: 'Italy', percentage: 10 },
      { name: 'Spain', percentage: 10 },
      { name: 'Other', percentage: 10 }
    ],
    activityTypes: [
      { name: 'Sales', percentage: 40 },
      { name: 'Leads', percentage: 40 },
      { name: 'Traffic', percentage: 20 }
    ]
  }
};

const StrikeMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = React.useState('global');
  const [timePeriod, setTimePeriod] = React.useState('7d');
  const mapRef = React.useRef<HTMLDivElement>(null);
  
  // Simulate map initialization
  React.useEffect(() => {
    if (mapRef.current) {
      // In a real implementation, this would initialize a map library
      const mapElement = mapRef.current;
      mapElement.innerHTML = `
        <div class="flex items-center justify-center h-full">
          <div class="text-center">
            <div class="text-6xl mb-4">🗺️</div>
            <p class="text-muted-foreground">Interactive ${selectedRegion === 'global' ? 'World' : selectedRegion} Map</p>
            <p class="text-xs text-muted-foreground mt-2">Showing data for last ${timePeriod === '24h' ? '24 hours' : timePeriod === '7d' ? '7 days' : '30 days'}</p>
          </div>
        </div>
      `;
    }
  }, [selectedRegion, timePeriod]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Globe className="w-5 h-5 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-white">Strike Map</h1>
        </div>
        
        <div className="flex space-x-2">
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-muted border border-border rounded-md text-sm text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="global">Global</option>
            <option value="north-america">North America</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="australia">Australia</option>
            <option value="south-america">South America</option>
            <option value="africa">Africa</option>
          </select>
          
          <select 
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="bg-muted border border-border rounded-md text-sm text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          
          <button className="p-2 rounded-md bg-muted hover:bg-muted-foreground/20 text-white">
            <Layers className="w-5 h-5" />
          </button>
          
          <button className="p-2 rounded-md bg-muted hover:bg-muted-foreground/20 text-white">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Map Container */}
        <div className="bg-card rounded-lg overflow-hidden gradient-border">
          <div className="h-[400px]" ref={mapRef}></div>
        </div>
        
        {/* Activity Summary */}
        <div className="bg-card rounded-lg overflow-hidden gradient-border">
          <div className="p-4 border-b border-border">
            <div className="flex items-center">
              <Info className="w-4 h-4 mr-2 text-primary" />
              <h2 className="text-lg font-medium text-white">Activity Summary</h2>
            </div>
          </div>
          
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hot Regions */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Hot Regions</h3>
              <div className="space-y-3">
                {regionData[selectedRegion as keyof typeof regionData]?.hotRegions.map((region, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white">{region.name}</span>
                      <span className="text-primary">{region.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary" 
                        style={{ width: `${region.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Activity Types */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Activity Types</h3>
              <div className="space-y-3">
                {regionData[selectedRegion as keyof typeof regionData]?.activityTypes.map((activity, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white">{activity.name}</span>
                      <span className="text-primary">{activity.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary" 
                        style={{ width: `${activity.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-border bg-muted/30">
            <p className="text-xs text-muted-foreground">
              <span className="text-primary font-medium">Pro Tip:</span> Click on any region in the map for detailed analytics and drill-down capabilities.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StrikeMap;
