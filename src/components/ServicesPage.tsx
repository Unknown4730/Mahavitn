import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useLanguage } from './LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Sun, 
  Phone, 
  FileText,
  Plus,
  AlertTriangle,
  Search,
  Calculator,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ServicesPageProps {
  onPageChange: (page: string) => void;
}

export function ServicesPage({ onPageChange }: ServicesPageProps) {
  const { t } = useLanguage();

  const services = [
    {
      title: t.newConnection,
      description: "Apply for new electricity connection for residential or commercial use",
      icon: Plus,
      color: "from-green-500 to-emerald-600",
      image: "https://images.unsplash.com/photo-1758429291507-5b5d14000f86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2l0eSUyMHBvd2VyJTIwZ3JpZCUyMGVuZXJneSUyMGluZnJhc3RydWN0dXJlfGVufDF8fHx8MTc1OTg4OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Online application", "Document upload", "Status tracking", "Fast approval"]
    },
    {
      title: t.reportOutage,
      description: "Report power outages and track restoration status in your area",
      icon: AlertTriangle,
      color: "from-orange-500 to-red-500",
      image: "https://images.unsplash.com/photo-1593354902760-619ac1323a25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2l0eSUyMG1ldGVyJTIwZGlnaXRhbHxlbnwxfHx8fDE3NTk4ODk2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Quick reporting", "Real-time updates", "SMS notifications", "Area-wise status"]
    },
    {
      title: t.solarInitiatives,
      description: "Learn about solar energy programs and net metering policies",
      icon: Sun,
      color: "from-yellow-500 to-orange-500",
      image: "https://images.unsplash.com/photo-1655300256486-4ec7251bf84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHJlbmV3YWJsZSUyMGVuZXJneXxlbnwxfHx8fDE3NTk4NjE3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Net metering", "Subsidies info", "Installation guide", "ROI calculator"]
    },
    {
      title: t.tariffPlans,
      description: "View current electricity tariff rates and billing information",
      icon: Calculator,
      color: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1758429291507-5b5d14000f86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2l0eSUyMHBvd2VyJTIwZ3JpZCUyMGVuZXJneSUyMGluZnJhc3RydWN0dXJlfGVufDF8fHx8MTc1OTg4OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Current rates", "Slab structure", "Bill calculator", "Tariff history"]
    }
  ];

  const quickLinks = [
    {
      title: "Customer Care",
      description: "24/7 support helpline",
      icon: Phone,
      contact: "1912 / 1800-121-1912"
    },
    {
      title: "Emergency Services",
      description: "Power outage emergency",
      icon: AlertTriangle,
      contact: "Emergency: 100"
    },
    {
      title: "Service Centers",
      description: "Find nearest center",
      icon: MapPin,
      contact: "15+ locations"
    },
    {
      title: "Working Hours",
      description: "Office timings",
      icon: Clock,
      contact: "9:00 AM - 6:00 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t.consumerServices}</h1>
            <p className="text-muted-foreground">Comprehensive electricity services for Maharashtra</p>
          </div>
          <Button variant="outline" onClick={() => onPageChange('landing')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Button>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden glass-card">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {service.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full group"
                    onClick={() => {
                      if (service.title === t.solarInitiatives) {
                        onPageChange('solar-initiatives');
                      }
                    }}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Links Section */}
        <Card className="mb-8 glass-card">
          <CardHeader>
            <CardTitle>Quick Contact & Information</CardTitle>
            <CardDescription>
              Important contact numbers and service information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-br from-secondary/50 to-background border border-border/50 hover:shadow-md transition-all">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-[var(--color-energy-blue)]" />
                    <h4 className="font-semibold mb-1">{link.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{link.description}</p>
                    <p className="text-sm font-medium text-[var(--color-energy-blue)]">{link.contact}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Track Application Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                {t.trackApplication}
              </CardTitle>
              <CardDescription>
                Check the status of your applications and requests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  New Connection Status
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Complaint Status
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Service Request Status
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Name Change Request
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Downloads & Forms
              </CardTitle>
              <CardDescription>
                Important documents and application forms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  New Connection Form
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Name Transfer Form
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Load Change Application
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Tariff Schedule PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}