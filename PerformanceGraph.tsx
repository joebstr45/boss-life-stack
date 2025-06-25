import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Performance graph types
export type PerformanceData = {
  date: string;
  value: number;
};

export type PerformanceGraphProps = {
  data: PerformanceData[];
  title?: string;
  height?: number;
  color?: string;
  showAxis?: boolean;
  showTooltip?: boolean;
  dataKey?: string;
};

const PerformanceGraph: React.FC<PerformanceGraphProps> = ({
  data,
  title,
  height = 100,
  color = 'hsl(var(--primary))',
  showAxis = false,
  showTooltip = true,
  dataKey = 'value'
}) => {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          {title}
        </h3>
      )}
      
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            {showAxis && (
              <>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                />
              </>
            )}
            
            {showTooltip && (
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                  fontSize: '12px',
                  borderRadius: '4px'
                }}
              />
            )}
            
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceGraph;
