import React from 'react';
import { useLanguage } from './LanguageContext';
import { EnergyInsights } from './EnergyInsights';

export function EnergyInsightsPage() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t.energyInsights}</h1>
          <p className="text-muted-foreground">
            {language === 'mr' 
              ? "कृत्रिम बुद्धिमत्ता-संचालित विश्लेषण आणि शिफारसी" 
              : "Artificial intelligence-powered analytics and recommendations"
            }
          </p>
        </div>
        <EnergyInsights />
      </div>
    </div>
  );
}