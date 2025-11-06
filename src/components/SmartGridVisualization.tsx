import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { useLanguage } from './LanguageContext';
import { 
  Zap, 
  Sun, 
  Wind, 
  Battery, 
  Home, 
  Building, 
  Factory,
  TrendingUp,
  TrendingDown,
  Activity,
  Wifi,
  Shield,
  Cpu,
  MapPin,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface GridNode {
  id: string;
  type: 'powerplant' | 'substation' | 'residential' | 'commercial' | 'industrial' | 'renewable';
  x: number;
  y: number;
  load: number;
  status: 'online' | 'offline' | 'maintenance' | 'critical';
  capacity: number;
  source?: 'coal' | 'solar' | 'wind' | 'hydro' | 'nuclear';
}

interface PowerFlow {
  from: string;
  to: string;
  power: number;
  direction: 'forward' | 'reverse';
}

export function SmartGridVisualization() {
  const { language, t } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<GridNode | null>(null);
  const [realTimeData, setRealTimeData] = useState({
    totalLoad: 2847,
    renewablePercentage: 23,
    efficiency: 94,
    carbonEmission: 1.2
  });

  const [gridNodes] = useState<GridNode[]>([
    { id: 'pp1', type: 'powerplant', x: 10, y: 20, load: 85, status: 'online', capacity: 2000, source: 'coal' },
    { id: 'pp2', type: 'powerplant', x: 80, y: 15, load: 92, status: 'online', capacity: 1500, source: 'nuclear' },
    { id: 'solar1', type: 'renewable', x: 20, y: 80, load: 67, status: 'online', capacity: 500, source: 'solar' },
    { id: 'wind1', type: 'renewable', x: 70, y: 85, load: 54, status: 'online', capacity: 300, source: 'wind' },
    { id: 'sub1', type: 'substation', x: 40, y: 35, load: 78, status: 'online', capacity: 800 },
    { id: 'sub2', type: 'substation', x: 60, y: 55, load: 82, status: 'online', capacity: 600 },
    { id: 'res1', type: 'residential', x: 25, y: 60, load: 45, status: 'online', capacity: 100 },
    { id: 'com1', type: 'commercial', x: 55, y: 40, load: 73, status: 'online', capacity: 200 },
    { id: 'ind1', type: 'industrial', x: 75, y: 65, load: 89, status: 'critical', capacity: 400 }
  ]);

  const [powerFlows] = useState<PowerFlow[]>([
    { from: 'pp1', to: 'sub1', power: 450, direction: 'forward' },
    { from: 'pp2', to: 'sub2', power: 380, direction: 'forward' },
    { from: 'solar1', to: 'sub1', power: 120, direction: 'forward' },
    { from: 'wind1', to: 'sub2', power: 85, direction: 'forward' },
    { from: 'sub1', to: 'res1', power: 45, direction: 'forward' },
    { from: 'sub1', to: 'com1', power: 150, direction: 'forward' },
    { from: 'sub2', to: 'ind1', power: 280, direction: 'forward' }
  ]);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        totalLoad: Math.max(2500, Math.min(3200, prev.totalLoad + (Math.random() - 0.5) * 50)),
        renewablePercentage: Math.max(18, Math.min(30, prev.renewablePercentage + (Math.random() - 0.5) * 2)),
        efficiency: Math.max(90, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 1)),
        carbonEmission: Math.max(0.8, Math.min(1.8, prev.carbonEmission + (Math.random() - 0.5) * 0.1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getNodeIcon = (node: GridNode) => {
    switch (node.type) {
      case 'powerplant':
        return node.source === 'nuclear' ? <Cpu className="w-4 h-4" /> : <Factory className="w-4 h-4" />;
      case 'renewable':
        return node.source === 'solar' ? <Sun className="w-4 h-4" /> : <Wind className="w-4 h-4" />;
      case 'substation':
        return <Zap className="w-4 h-4" />;
      case 'residential':
        return <Home className="w-4 h-4" />;
      case 'commercial':
        return <Building className="w-4 h-4" />;
      case 'industrial':
        return <Factory className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getNodeColor = (node: GridNode) => {
    switch (node.status) {
      case 'online':
        return node.type === 'renewable' ? 'rgb(132, 204, 22)' : 'rgb(34, 197, 94)';
      case 'critical':
        return 'rgb(239, 68, 68)';
      case 'maintenance':
        return 'rgb(245, 158, 11)';
      case 'offline':
        return 'rgb(107, 114, 128)';
      default:
        return 'rgb(59, 130, 246)';
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Grid Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Load</p>
                <p className="text-2xl font-bold text-blue-600">{realTimeData.totalLoad.toFixed(0)} MW</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Renewable</p>
                <p className="text-2xl font-bold text-green-600">{realTimeData.renewablePercentage.toFixed(1)}%</p>
              </div>
              <Sun className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Efficiency</p>
                <p className="text-2xl font-bold text-purple-600">{realTimeData.efficiency.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Carbon</p>
                <p className="text-2xl font-bold text-orange-600">{realTimeData.carbonEmission.toFixed(2)} kg/MWh</p>
              </div>
              <TrendingDown className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Interactive Grid Map */}
        <Card className="xl:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Live Grid Network
            </CardTitle>
            <CardDescription>
              Real-time visualization of Maharashtra's power grid
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl overflow-hidden border">
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Power Flow Lines */}
              <svg className="absolute inset-0 w-full h-full">
                {powerFlows.map((flow, index) => {
                  const fromNode = gridNodes.find(n => n.id === flow.from);
                  const toNode = gridNodes.find(n => n.id === flow.to);
                  if (!fromNode || !toNode) return null;

                  return (
                    <motion.line
                      key={index}
                      x1={`${fromNode.x}%`}
                      y1={`${fromNode.y}%`}
                      x2={`${toNode.x}%`}
                      y2={`${toNode.y}%`}
                      stroke="var(--color-energy-blue)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      opacity={0.6}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  );
                })}
              </svg>

              {/* Grid Nodes */}
              {gridNodes.map((node) => (
                <motion.div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ 
                    left: `${node.x}%`, 
                    top: `${node.y}%`,
                    color: getNodeColor(node)
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedNode(node)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * gridNodes.indexOf(node) }}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: getNodeColor(node) }}
                  >
                    {getNodeIcon(node)}
                  </div>
                  
                  {/* Status indicator */}
                  <div className="absolute -top-1 -right-1">
                    {node.status === 'online' ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : node.status === 'critical' ? (
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    )}
                  </div>

                  {/* Load indicator */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="text-xs bg-black/70 text-white px-1 rounded text-center">
                      {node.load}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                <span>Online</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                <span>Critical</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                <span>Maintenance</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[var(--color-energy-lime)] mr-2" />
                <span>Renewable</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Node Details & Controls */}
        <div className="space-y-4">
          {selectedNode ? (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {getNodeIcon(selectedNode)}
                  <span className="ml-2 capitalize">{selectedNode.type}</span>
                  <Badge 
                    variant={selectedNode.status === 'online' ? 'default' : 'destructive'}
                    className="ml-2"
                  >
                    {selectedNode.status}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Node ID: {selectedNode.id.toUpperCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Current Load</span>
                    <span className="text-sm font-medium">{selectedNode.load}%</span>
                  </div>
                  <Progress value={selectedNode.load} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Capacity</span>
                    <div className="font-medium">{selectedNode.capacity} MW</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Output</span>
                    <div className="font-medium">{Math.round(selectedNode.capacity * selectedNode.load / 100)} MW</div>
                  </div>
                  {selectedNode.source && (
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Source</span>
                      <div className="font-medium capitalize">{selectedNode.source}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Activity className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card">
              <CardContent className="p-6 text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">Select a Grid Node</h3>
                <p className="text-sm text-muted-foreground">
                  Click on any node in the grid map to view detailed information
                </p>
              </CardContent>
            </Card>
          )}

          {/* Grid Health Status */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wifi className="w-5 h-5 mr-2" />
                Grid Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Network Stability</span>
                <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  Stable
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Frequency</span>
                <span className="text-sm font-medium">50.02 Hz</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Voltage</span>
                <span className="text-sm font-medium">400.5 kV</span>
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">System Load</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}