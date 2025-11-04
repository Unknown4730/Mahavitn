import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useLanguage } from './LanguageContext';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown,
  Lightbulb,
  Target,
  Award,
  Zap,
  Leaf,
  Clock,
  DollarSign,
  BarChart3,
  Activity,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Calendar,
  Users,
  Home
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface EnergyInsight {
  id: string;
  type: 'saving' | 'efficiency' | 'prediction' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  savings?: number;
  confidence?: number;
  actionable: boolean;
}

interface PredictionData {
  period: string;
  usage: number;
  cost: number;
  confidence: number;
}

export function EnergyInsights() {
  const [insights, setInsights] = useState<EnergyInsight[]>([
    {
      id: '1',
      type: 'saving',
      title: 'Peak Hour Optimization',
      description: 'Shift heavy appliance usage to off-peak hours (11 PM - 6 AM) to save on electricity costs.',
      impact: 'high',
      savings: 400,
      confidence: 92,
      actionable: true
    },
    {
      id: '2',
      type: 'efficiency',
      title: 'AC Temperature Setting',
      description: 'Increasing AC temperature by 2°C could reduce energy consumption by 15%.',
      impact: 'medium',
      savings: 250,
      confidence: 87,
      actionable: true
    },
    {
      id: '3',
      type: 'prediction',
      title: 'Summer Peak Alert',
      description: 'Your electricity bill is predicted to increase by 25% in the next 2 months due to seasonal changes.',
      impact: 'high',
      confidence: 95,
      actionable: false
    },
    {
      id: '4',
      type: 'recommendation',
      title: 'Solar Installation Opportunity',
      description: 'Based on your usage pattern and roof area, solar panels could reduce your bill by 60%.',
      impact: 'high',
      savings: 1200,
      confidence: 85,
      actionable: true
    }
  ]);

  const [aiScore, setAiScore] = useState({
    efficiency: 87,
    sustainability: 72,
    costOptimization: 64,
    predictability: 91
  });

  const [predictions] = useState<PredictionData[]>([
    { period: 'Next Month', usage: 245, cost: 2450, confidence: 92 },
    { period: 'Month +2', usage: 280, cost: 2950, confidence: 87 },
    { period: 'Month +3', usage: 310, cost: 3200, confidence: 82 },
    { period: 'Month +4', usage: 295, cost: 3050, confidence: 78 },
    { period: 'Month +5', usage: 265, cost: 2750, confidence: 74 },
    { period: 'Month +6', usage: 240, cost: 2400, confidence: 70 }
  ]);

  const applianceData = [
    { name: 'Air Conditioner', usage: 45, efficiency: 75, potential: 20 },
    { name: 'Water Heater', usage: 25, efficiency: 85, potential: 15 },
    { name: 'Refrigerator', usage: 15, efficiency: 90, potential: 8 },
    { name: 'Lighting', usage: 10, efficiency: 70, potential: 25 },
    { name: 'Others', usage: 5, efficiency: 80, potential: 12 }
  ];

  const hourlyPattern = [
    { hour: '00', usage: 1.2, cost: 0.5 },
    { hour: '02', usage: 1.0, cost: 0.4 },
    { hour: '04', usage: 0.8, cost: 0.3 },
    { hour: '06', usage: 2.5, cost: 1.2 },
    { hour: '08', usage: 3.2, cost: 1.8 },
    { hour: '10', usage: 2.8, cost: 1.6 },
    { hour: '12', usage: 4.1, cost: 2.3 },
    { hour: '14', usage: 4.8, cost: 2.7 },
    { hour: '16', usage: 5.2, cost: 2.9 },
    { hour: '18', usage: 6.5, cost: 3.6 },
    { hour: '20', usage: 7.2, cost: 4.0 },
    { hour: '22', usage: 4.5, cost: 2.5 }
  ];

  const radarData = [
    { subject: 'Efficiency', A: aiScore.efficiency, fullMark: 100 },
    { subject: 'Sustainability', A: aiScore.sustainability, fullMark: 100 },
    { subject: 'Cost Optimization', A: aiScore.costOptimization, fullMark: 100 },
    { subject: 'Predictability', A: aiScore.predictability, fullMark: 100 },
    { subject: 'Smart Usage', A: 76, fullMark: 100 },
    { subject: 'Grid Contribution', A: 83, fullMark: 100 }
  ];

  // Real-time AI score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAiScore(prev => ({
        efficiency: Math.max(75, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 2)),
        sustainability: Math.max(65, Math.min(85, prev.sustainability + (Math.random() - 0.5) * 1.5)),
        costOptimization: Math.max(55, Math.min(80, prev.costOptimization + (Math.random() - 0.5) * 2)),
        predictability: Math.max(85, Math.min(98, prev.predictability + (Math.random() - 0.5) * 1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'saving':
        return <DollarSign className="w-5 h-5" />;
      case 'efficiency':
        return <Target className="w-5 h-5" />;
      case 'prediction':
        return <TrendingUp className="w-5 h-5" />;
      case 'recommendation':
        return <Lightbulb className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-100';
      case 'medium':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-100';
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-100';
      default:
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Performance Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Efficiency</p>
                <p className="text-2xl font-bold text-purple-600">{aiScore.efficiency}%</p>
              </div>
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sustainability</p>
                <p className="text-2xl font-bold text-green-600">{aiScore.sustainability}%</p>
              </div>
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cost Optimization</p>
                <p className="text-2xl font-bold text-blue-600">{aiScore.costOptimization}%</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Predictability</p>
                <p className="text-2xl font-bold text-orange-600">{aiScore.predictability}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Smart Insights */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                  Smart Energy Insights
                </CardTitle>
                <CardDescription>
                  AI-powered recommendations for your energy usage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    className="p-4 rounded-lg border bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        {getInsightIcon(insight.type)}
                        <h4 className="font-medium ml-2">{insight.title}</h4>
                      </div>
                      <Badge className={getImpactColor(insight.impact)}>
                        {insight.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs">
                        {insight.savings && (
                          <span className="text-green-600 font-medium">₹{insight.savings}/month</span>
                        )}
                        {insight.confidence && (
                          <span className="text-blue-600">{insight.confidence}% confidence</span>
                        )}
                      </div>
                      {insight.actionable && (
                        <Button variant="outline" size="sm">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Radar */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Energy Performance Radar
                </CardTitle>
                <CardDescription>
                  Multi-dimensional analysis of your energy profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Score"
                        dataKey="A"
                        stroke="var(--color-energy-blue)"
                        fill="var(--color-energy-blue)"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Prediction Chart */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  6-Month Usage Prediction
                </CardTitle>
                <CardDescription>
                  AI-powered forecast based on historical patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={predictions}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="period" stroke="var(--color-muted-foreground)" />
                      <YAxis stroke="var(--color-muted-foreground)" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--color-card)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '12px'
                        }}
                      />
                      <defs>
                        <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-energy-blue)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="var(--color-energy-blue)" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="usage" 
                        stroke="var(--color-energy-blue)"
                        fillOpacity={1}
                        fill="url(#usageGradient)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Prediction Details */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Detailed Predictions
                </CardTitle>
                <CardDescription>
                  Month-by-month breakdown with confidence levels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {predictions.slice(0, 4).map((prediction, index) => (
                  <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{prediction.period}</h4>
                      <Badge variant="secondary">
                        {prediction.confidence}% confidence
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Usage</span>
                        <div className="font-medium">{prediction.usage} units</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost</span>
                        <div className="font-medium">₹{prediction.cost}</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={prediction.confidence} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Appliance Optimization */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  Appliance Optimization
                </CardTitle>
                <CardDescription>
                  Smart recommendations for each appliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applianceData.map((appliance, index) => (
                    <div key={index} className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{appliance.name}</h4>
                        <span className="text-sm text-muted-foreground">{appliance.usage}% of total</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Efficiency</span>
                            <span>{appliance.efficiency}%</span>
                          </div>
                          <Progress value={appliance.efficiency} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-600">Savings potential: {appliance.potential}%</span>
                          <Button variant="outline" size="sm">
                            Optimize
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time-of-Use Optimization */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Time-of-Use Optimization
                </CardTitle>
                <CardDescription>
                  Hourly usage pattern and cost optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyPattern}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="hour" stroke="var(--color-muted-foreground)" />
                      <YAxis stroke="var(--color-muted-foreground)" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--color-card)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="usage" 
                        fill="var(--color-energy-blue)"
                        radius={[2, 2, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/30 rounded">
                    <span>Off-peak hours (11 PM - 6 AM)</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      30% cheaper
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-950/30 rounded">
                    <span>Peak hours (6 PM - 10 PM)</span>
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                      20% premium
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Usage Distribution */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Usage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={applianceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="usage"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {applianceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 72}, 70%, 50%)`} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Efficiency Trends */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Efficiency Score</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[var(--color-energy-blue)]">
                    {aiScore.efficiency}
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Efficiency</div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Energy Usage</span>
                      <span>Good</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Cost Management</span>
                      <span>Excellent</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Environmental Impact</span>
                      <span>Very Good</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Badges */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Energy Saver', description: 'Reduced usage by 15%', earned: true },
                  { name: 'Green Warrior', description: 'Low carbon footprint', earned: true },
                  { name: 'Smart User', description: 'Optimized time-of-use', earned: false },
                  { name: 'Efficiency Expert', description: '90%+ efficiency score', earned: false },
                ].map((achievement, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${achievement.earned ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800 opacity-60'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium flex items-center">
                          {achievement.earned ? (
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                          ) : (
                            <div className="w-4 h-4 mr-2 rounded-full border-2 border-gray-300" />
                          )}
                          {achievement.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <Award className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}