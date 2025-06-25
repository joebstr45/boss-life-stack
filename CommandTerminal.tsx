import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Clock, History, Send, X, Download, Copy } from 'lucide-react';

// Mock command history
const initialCommandHistory = [
  {
    command: 'analyze sales performance last 7 days',
    response: `SALES PERFORMANCE (LAST 7 DAYS):
- Total Revenue: $12,450 (+15% from previous period)
- Conversion Rate: 3.2% (+0.5%)
- Top Product: Ultimate System ($5,200)
- Underperforming: Quick Start Guide ($350)

Recommendation: Increase promotion of Quick Start Guide as upsell to Ultimate System purchases.`,
    timestamp: '10:25 AM'
  },
  {
    command: 'show top traffic sources',
    response: `TOP TRAFFIC SOURCES (LAST 30 DAYS):
1. Facebook Ads - 35% (12,500 visitors)
2. Google Organic - 22% (7,800 visitors)
3. Direct - 15% (5,300 visitors)
4. Email Campaigns - 12% (4,200 visitors)
5. YouTube - 8% (2,800 visitors)

Highest conversion: Email Campaigns (4.5%)
Lowest conversion: YouTube (1.2%)`,
    timestamp: '09:15 AM'
  }
];

// Command suggestions
const commandSuggestions = [
  'analyze sales performance last 7 days',
  'show top traffic sources',
  'compare conversion rates by product',
  'forecast revenue next 30 days',
  'identify underperforming campaigns',
  'optimize email sequence for [product]',
  'analyze customer feedback sentiment',
  'generate report for [metric]'
];

const CommandTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [commandHistory, setCommandHistory] = useState(initialCommandHistory);
  const [showHistory, setShowHistory] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);
  
  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Filter suggestions based on input
  useEffect(() => {
    if (input.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    const filtered = commandSuggestions.filter(
      suggestion => suggestion.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered);
    setSelectedSuggestion(-1);
  }, [input]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    // Process command
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Generate mock response based on command
      let response = '';
      
      if (input.includes('sales')) {
        response = `SALES PERFORMANCE ANALYSIS:
- Period: ${input.includes('30') ? 'Last 30 Days' : input.includes('7') ? 'Last 7 Days' : 'Current Month'}
- Total Revenue: $${Math.floor(Math.random() * 50000) + 10000}
- Orders: ${Math.floor(Math.random() * 500) + 100}
- Average Order Value: $${Math.floor(Math.random() * 200) + 50}
- Conversion Rate: ${(Math.random() * 5 + 1).toFixed(1)}%

Top Performing Products:
1. Boss Method Pro - $${Math.floor(Math.random() * 10000) + 5000}
2. Elite System - $${Math.floor(Math.random() * 8000) + 3000}
3. Command Center Access - $${Math.floor(Math.random() * 5000) + 1000}`;
      } else if (input.includes('traffic') || input.includes('source')) {
        response = `TRAFFIC SOURCE ANALYSIS:
- Total Visitors: ${Math.floor(Math.random() * 50000) + 10000}
- Unique Visitors: ${Math.floor(Math.random() * 40000) + 8000}
- Bounce Rate: ${(Math.random() * 60 + 20).toFixed(1)}%
- Average Session Duration: ${Math.floor(Math.random() * 3) + 1}m ${Math.floor(Math.random() * 50) + 10}s

Top Sources:
1. Facebook Ads - ${Math.floor(Math.random() * 40) + 10}%
2. Google Organic - ${Math.floor(Math.random() * 30) + 10}%
3. Direct Traffic - ${Math.floor(Math.random() * 20) + 5}%
4. Email Campaigns - ${Math.floor(Math.random() * 15) + 5}%
5. Affiliate Partners - ${Math.floor(Math.random() * 10) + 5}%`;
      } else if (input.includes('conversion') || input.includes('rate')) {
        response = `CONVERSION RATE ANALYSIS:
- Overall Site Conversion: ${(Math.random() * 5 + 1).toFixed(2)}%
- Landing Page Conversion: ${(Math.random() * 10 + 5).toFixed(2)}%
- Cart Abandonment Rate: ${(Math.random() * 70 + 20).toFixed(1)}%

By Product:
- Boss Method Pro: ${(Math.random() * 8 + 2).toFixed(2)}%
- Elite System: ${(Math.random() * 6 + 1).toFixed(2)}%
- Quick Start Guide: ${(Math.random() * 12 + 3).toFixed(2)}%
- Command Center Access: ${(Math.random() * 4 + 1).toFixed(2)}%

Recommendation: Focus optimization efforts on Command Center Access pages to improve conversion rates.`;
      } else if (input.includes('forecast') || input.includes('predict')) {
        response = `REVENUE FORECAST:
- Next 30 Days: $${Math.floor(Math.random() * 100000) + 50000}
- Growth Projection: ${(Math.random() * 30 - 5).toFixed(1)}% compared to previous period
- Confidence Score: ${Math.floor(Math.random() * 30) + 70}%

Product Breakdown:
- Boss Method Pro: $${Math.floor(Math.random() * 50000) + 20000}
- Elite System: $${Math.floor(Math.random() * 30000) + 15000}
- Other Products: $${Math.floor(Math.random() * 20000) + 10000}

Market Factors:
- Seasonal trends indicate ${Math.random() > 0.5 ? 'positive' : 'negative'} impact
- Competitor activity level: ${Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low'}
- Advertising effectiveness trending ${Math.random() > 0.6 ? 'upward' : 'downward'}`;
      } else {
        response = `Command processed: "${input}"

Analysis complete. The requested information has been processed according to the Boss Life Command Center protocols.

Would you like to:
1. Generate a detailed report
2. Compare with historical data
3. Set up automated monitoring
4. Share results with team members

Type your next command to proceed.`;
      }
      
      // Add to history
      setCommandHistory(prev => [
        ...prev, 
        { 
          command: input, 
          response, 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      
      setInput('');
      setIsProcessing(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle suggestion navigation with arrow keys
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestion(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Tab' || e.key === 'Enter') {
        if (selectedSuggestion >= 0) {
          e.preventDefault();
          setInput(suggestions[selectedSuggestion]);
          setSuggestions([]);
        }
      }
    }
  };
  
  const selectSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setSuggestions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const selectHistoryCommand = (command: string) => {
    setInput(command);
    setShowHistory(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Terminal className="w-5 h-5 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-white">Command Terminal</h1>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className={`p-2 rounded-md ${showHistory ? 'bg-primary text-white' : 'bg-muted hover:bg-muted-foreground/20 text-white'}`}
          >
            <History className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-md bg-muted hover:bg-muted-foreground/20 text-white">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex">
        {/* Main Terminal */}
        <div className="flex-1 bg-card rounded-lg overflow-hidden gradient-border flex flex-col">
          {/* Terminal Output */}
          <div 
            ref={terminalRef}
            className="flex-1 p-4 overflow-y-auto terminal-font text-sm"
          >
            <div className="text-muted-foreground mb-4">
              <p>Boss Life Command Terminal v1.0</p>
              <p>Type a command and press Enter to execute.</p>
              <p>Type 'help' for available commands.</p>
            </div>
            
            {commandHistory.map((item, index) => (
              <div key={index} className="mb-6">
                <div className="flex items-center mb-1">
                  <span className="text-primary font-medium">{'>'}</span>
                  <span className="ml-2 text-white">{item.command}</span>
                  <span className="ml-auto text-xs text-muted-foreground flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.timestamp}
                  </span>
                </div>
                <div className="pl-4 text-muted-foreground whitespace-pre-line">
                  {item.response}
                </div>
              </div>
            ))}
            
            {isProcessing && (
              <div className="mb-6">
                <div className="flex items-center mb-1">
                  <span className="text-primary font-medium">{'>'}</span>
                  <span className="ml-2 text-white">{input}</span>
                </div>
                <div className="pl-4 text-muted-foreground">
                  Processing request...
                </div>
              </div>
            )}
          </div>
          
          {/* Command Input */}
          <div className="border-t border-border p-3">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center bg-muted rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-primary">
                <span className="text-primary mr-2">{'>'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isProcessing}
                  placeholder="Enter command..."
                  className="flex-1 bg-transparent border-none outline-none text-white terminal-font"
                />
                {input && (
                  <button
                    type="button"
                    onClick={() => setInput('')}
                    className="text-muted-foreground hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isProcessing || !input.trim()}
                  className={`ml-2 text-white p-1 rounded-md ${
                    isProcessing || !input.trim()
                      ? 'text-muted-foreground cursor-not-allowed'
                      : 'text-primary hover:bg-primary/20'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {/* Command Suggestions */}
              {suggestions.length > 0 && (
                <div className="absolute bottom-full left-0 right-0 mb-1 bg-card border border-border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => selectSuggestion(suggestion)}
                      className={`px-3 py-2 cursor-pointer text-sm terminal-font ${
                        index === selectedSuggestion
                          ? 'bg-primary/20 text-primary'
                          : 'text-white hover:bg-muted'
                      }`}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
        
        {/* Command History Sidebar */}
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '300px' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-4 w-[300px] bg-card rounded-lg overflow-hidden gradient-border flex flex-col"
          >
            <div className="p-3 border-b border-border flex items-center justify-between">
              <h3 className="font-medium text-white">Command History</h3>
              <button
                onClick={() => setShowHistory(false)}
                className="text-muted-foreground hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {commandHistory.map((item, index) => (
                <div
                  key={index}
                  onClick={() => selectHistoryCommand(item.command)}
                  className="p-3 border-b border-border hover:bg-muted/50 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-primary text-xs">{item.timestamp}</span>
                    <div className="flex space-x-1">
                      <button className="text-muted-foreground hover:text-white p-1">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-white truncate">{item.command}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CommandTerminal;
